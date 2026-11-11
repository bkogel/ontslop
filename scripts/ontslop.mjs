#!/usr/bin/env node
// ontslop-negeer-bestand
// Ontslop-scanner. Zoekt in bestanden of mappen naar patronen die verraden dat
// een model tekst of interface heeft gemaakt, met de nadruk op Nederlands.
//
//   node ontslop.mjs <pad> [<pad> ...]     scan bestanden of mappen
//   node ontslop.mjs -                     lees tekst van stdin
//
// Opties:
//   --json             uitvoer als JSON
//   --min=<ernst>      alleen hoog, midden of laag en zwaarder (standaard: laag)
//   --alleen=<groep>   alleen tekst, taal of ontwerp (komma's mogen)
//   --stil             geen samenvatting, alleen de vondsten
//   --alles            ook gegenereerde componenten (components/ui) scannen
//
// Exitcode 0 bij niets zwaars, 2 als er minstens één vondst met ernst hoog is.
// Een regel overslaan: zet "ontslop-negeer" in een commentaar op die regel of
// de regel erboven. Een heel bestand: "ontslop-negeer-bestand".

import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { analyseerBestand, analyseerTekst, ERNST, VERSIE } from "./regels.mjs";

const EXTENSIES = new Set([
  ".md",
  ".mdx",
  ".txt",
  ".html",
  ".htm",
  ".jsx",
  ".tsx",
  ".js",
  ".ts",
  ".vue",
  ".svelte",
  ".astro",
  ".css",
  ".scss",
  ".json",
]);
const OVERSLAAN = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  ".output",
  ".vercel",
  ".turbo",
  "coverage",
  ".cache",
  "vendor",
]);

const args = process.argv.slice(2);
const opties = { json: false, min: "laag", alleen: null, stil: false, alles: false };
const paden = [];
for (const a of args) {
  if (a === "--json") opties.json = true;
  else if (a === "--stil") opties.stil = true;
  else if (a === "--alles") opties.alles = true;
  else if (a.startsWith("--min=")) opties.min = a.slice(6);
  else if (a.startsWith("--alleen=")) opties.alleen = new Set(a.slice(9).split(","));
  else if (a === "-h" || a === "--help") {
    console.log(
      readFileSync(new URL(import.meta.url))
        .toString()
        .split("\n")
        .slice(2, 20)
        .map((r) => r.replace(/^\/\/ ?/, ""))
        .join("\n"),
    );
    process.exit(0);
  } else if (a === "--versie" || a === "-v") {
    console.log(VERSIE);
    process.exit(0);
  } else paden.push(a);
}
if (!ERNST[opties.min]) {
  console.error(`Onbekende ernst "${opties.min}". Kies hoog, midden of laag.`);
  process.exit(1);
}
if (paden.length === 0) paden.push(".");

function* bestanden(pad) {
  const st = statSync(pad);
  if (st.isFile()) {
    yield pad;
    return;
  }
  for (const naam of readdirSync(pad)) {
    if (OVERSLAAN.has(naam) || naam.startsWith(".")) continue;
    const vol = join(pad, naam);
    // shadcn/ui en verwanten: code die niemand zelf schreef.
    if (!opties.alles && naam === "ui" && /components$/.test(pad)) continue;
    const s = statSync(vol);
    if (s.isDirectory()) yield* bestanden(vol);
    else if (
      EXTENSIES.has(extname(naam).toLowerCase()) &&
      !/\.(?:min|lock)\./.test(naam) &&
      s.size < 1_000_000
    )
      yield vol;
  }
}

const filter = (v) =>
  ERNST[v.ernst] >= ERNST[opties.min] && (!opties.alleen || opties.alleen.has(v.groep));

const resultaat = [];
if (paden.length === 1 && paden[0] === "-") {
  const tekst = readFileSync(0, "utf8");
  resultaat.push({ bestand: "stdin", vondsten: analyseerTekst(tekst).filter(filter) });
} else {
  for (const p of paden) {
    let lijst;
    try {
      lijst = [...bestanden(p)];
    } catch {
      console.error(`Kan ${p} niet lezen.`);
      process.exitCode = 1;
      continue;
    }
    for (const f of lijst) {
      const bron = readFileSync(f, "utf8");
      const ext = extname(f);
      // JSON alleen als het op vertaalbestanden lijkt.
      if (
        ext === ".json" &&
        !/(?:^|[/\\])(?:locales?|i18n|lang|messages|translations?)[/\\]|(?:^|[/\\])nl(?:-NL)?\.json$/i.test(
          f,
        )
      )
        continue;
      const vondsten = analyseerBestand(bron, ext).filter(filter);
      if (vondsten.length) resultaat.push({ bestand: relative(process.cwd(), f) || f, vondsten });
    }
  }
}

const alle = resultaat.flatMap((r) => r.vondsten);
const hoog = alle.some((v) => v.ernst === "hoog");

if (opties.json) {
  console.log(JSON.stringify({ versie: VERSIE, bestanden: resultaat }, null, 2));
} else {
  const kleur = process.stdout.isTTY && !process.env.NO_COLOR;
  const k = (code, t) => (kleur ? `\x1b[${code}m${t}\x1b[0m` : t);
  const ernstKleur = { hoog: "31", midden: "33", laag: "2" };
  for (const { bestand, vondsten } of resultaat) {
    console.log(`\n${k("1", bestand)}`);
    for (const v of vondsten) {
      const frag = v.fragment ? `  ${k("2", `“${v.fragment}”`)}` : "";
      console.log(
        `  ${String(v.regel).padStart(4)}  ${k(ernstKleur[v.ernst], v.ernst.padEnd(6))} ${v.naam}${frag}`,
      );
      if (!opties.stil) console.log(`        ${k("2", `→ ${v.fix}`)}`);
    }
  }
  if (!opties.stil) {
    const telling = (e) => alle.filter((v) => v.ernst === e).length;
    console.log(
      alle.length === 0
        ? "\nNiets gevonden. Dat bewijst niet dat het goed is: lees het ook hardop."
        : `\n${alle.length} vondsten in ${resultaat.length} bestanden: ${telling("hoog")} hoog, ${telling("midden")} midden, ${telling("laag")} laag.\nEen vondst is een aanwijzing, geen bewijs. Kijk of het patroon vaker terugkomt.`,
    );
  }
}

process.exitCode = hoog ? 2 : (process.exitCode ?? 0);
