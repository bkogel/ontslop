# Ontslop

Haal de sporen van AI uit Nederlandse teksten en interfaces.

Ontslop is een skill voor Claude, Codex en andere AI-assistenten, plus een
scanner die je zonder installatie draait. Het vindt de patronen waaraan
Nederlandse lezers zien dat een model heeft meegeschreven of meegebouwd, en
herstelt ze zonder feiten of stem te veranderen.

Gemaakt door [HandelAI](https://handelai.nl/tools/ontslop). Gratis, onder
CC BY 4.0. Broncode: [github.com/bkogel/ontslop](https://github.com/bkogel/ontslop). Probeer de checker online op
[handelai.nl/tools/ontslop](https://handelai.nl/tools/ontslop).

## Wat erin zit

| Bestand | Wat |
| --- | --- |
| `SKILL.md` | De skill: werkwijze, harde regels, checklist |
| `references/tekst.md` | 34 schrijfpatronen met voor en na |
| `references/nederlands.md` | Nederlands in tekst en interface: je of u, samenstellingen, notatie, knoppen |
| `references/interface.md` | Ontwerppatronen in drie lagen, en de volgorde om ze te herstellen |
| `references/stem.md` | Een natuurlijke zakelijke stem om naartoe te schrijven, voor elke branche |
| `scripts/ontslop.mjs` | De scanner |
| `scripts/regels.mjs` | De regels, ook bruikbaar als module |
| `voorbeelden/` | Een tekst en een component vol patronen, en de tekst hersteld |

## Installeren

**Snelst, voor elke assistent.** Met de [skills-CLI](https://skills.sh)
installeer je Ontslop in Claude Code, Codex, Cursor en andere agents tegelijk:

```bash
npx skills add bkogel/ontslop
```

**Claude Code, met de hand.** Pak de zip uit in je skills-map:

```bash
unzip ontslop.zip -d ~/.claude/skills/
```

Of per project in `.claude/skills/`. Claude gebruikt de skill vanzelf als je
vraagt om een tekst of pagina te ontslopen, natuurlijker te laten klinken of
op AI-patronen te controleren. Je kunt hem ook direct aanroepen met
`/ontslop`.

**Claude.ai en de Claude-app.** Ga naar Instellingen, dan Mogelijkheden, en
upload `ontslop.zip` onder Skills. Code-uitvoering moet aan staan.

**Codex.** Pak de zip uit in `~/.codex/skills/`.

**Cursor, Windsurf en andere editors.** Zet de map in je project en verwijs
in je projectregels naar `ontslop/SKILL.md`, of plak de inhoud van
`SKILL.md` als instructie.

## De scanner los gebruiken

Node 18 of nieuwer, verder niets.

```bash
node ontslop/scripts/ontslop.mjs src/
node ontslop/scripts/ontslop.mjs artikel.md --min=midden
pbpaste | node ontslop/scripts/ontslop.mjs -
```

Opties: `--json`, `--min=hoog|midden|laag`, `--alleen=tekst,taal,ontwerp`,
`--stil`, `--alles`. Exitcode 2 bij een vondst met ernst hoog.

In CI, bijvoorbeeld als stap in GitHub Actions:

```yaml
- run: node ontslop/scripts/ontslop.mjs src content --min=hoog
```

Een regel overslaan: `ontslop-negeer` in een commentaar op die regel of de
regel erboven. Een bestand: `ontslop-negeer-bestand` in een commentaar.

Als module:

```js
import { analyseerTekst, analyseerBestand } from "./ontslop/scripts/regels.mjs";

const vondsten = analyseerTekst("Het resultaat? Een naadloze oplossing.");
```

## Wat het niet doet

Ontslop zegt niet of een tekst door AI is geschreven. Dat kan niemand
betrouwbaar, en het is ook niet de vraag. Het wijst patronen aan die een
tekst of interface generiek maken, door wie of wat ook geschreven. Eén
vondst is een aanwijzing; pas als patronen terugkomen, is er iets aan de
hand.

## Bronnen

Zie `VERMELDINGEN.md` voor de werken waar Ontslop op voortbouwt. De licentie (CC BY 4.0) staat in `LICENSE`.
