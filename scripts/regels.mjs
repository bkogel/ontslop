// ontslop-negeer-bestand (dit bestand bevat de patronen zelf)
// Ontslop: de regels. Puur JavaScript zonder afhankelijkheden en zonder
// bestandstoegang, zodat dezelfde regels draaien in de scanner (ontslop.mjs)
// en in de online checker op handelai.nl/tools/ontslop.
//
// Elke regel vindt iets wat een model standaard kiest. Een vondst is een
// aanwijzing, geen bewijs: mensen maken elk van deze keuzes weleens bewust.
// Pas waar signalen samen optreden, wordt het een patroon.

export const VERSIE = "1.0.0";

// \b in JavaScript kent alleen ASCII, dus "één" of "efficiënter" breken het.
// rx() vervangt \b door een woordgrens die wel met accenten werkt.
const GRENS = String.raw`(?:(?<![\p{L}\p{N}_])(?=[\p{L}\p{N}_])|(?<=[\p{L}\p{N}_])(?![\p{L}\p{N}_]))`;
const rx = (bron, vlaggen = "giu") => new RegExp(bron.replaceAll(String.raw`\b`, GRENS), vlaggen);
const lijst = (woorden) => woorden.map((w) => w.replaceAll(" ", String.raw`\s+`)).join("|");

export const ERNST = { hoog: 3, midden: 2, laag: 1 };

// --- Taal ------------------------------------------------------------------

const NL = new Set(
  "de het een en van je jij jouw we wij ons onze is zijn niet voor op met dat die te ook maar als bij naar om uit dan nog wel er dit wat hoe waar wordt worden kun kunt kan heeft hebben je u uw geen meer zo al".split(
    " ",
  ),
);
const EN = new Set(
  "the and of to you your is are for with that this it on in at by from as be or not can will we our an have has get more all".split(
    " ",
  ),
);

/** true = Nederlands, false = iets anders, null = te kort om te zeggen. */
export function isNederlands(tekst) {
  const woorden = tekst.toLowerCase().match(/[\p{L}]+/gu) ?? [];
  if (woorden.length < 4) return null;
  let nl = 0;
  let en = 0;
  for (const w of woorden) {
    if (NL.has(w)) nl++;
    if (EN.has(w)) en++;
  }
  if (nl === 0 && en === 0) return null;
  return nl > en;
}

const woordtelling = (t) => (t.match(/[\p{L}\p{N}]+/gu) ?? []).length;

// --- Tekstregels -------------------------------------------------------------
//
// soort: waar de regel geldt. "proza" is lopende tekst, "kop" een kop, "label"
// een korte interfacetekst zoals een knop. Zonder soort geldt hij overal.

const AI_WOORDEN = [
  "cruciaal",
  "cruciale",
  "essentieel",
  "essentiële",
  "naadloos",
  "naadloze",
  "robuust",
  "robuuste",
  "holistisch",
  "holistische",
  "baanbrekend",
  "baanbrekende",
  "revolutionair",
  "revolutionaire",
  "transformatief",
  "transformatieve",
  "toekomstbestendig",
  "toekomstbestendige",
  "ongeëvenaard",
  "ongeëvenaarde",
  "moeiteloos",
  "moeiteloze",
  "naadloos",
  "ongekend",
  "ongekende",
  "synergie",
  "een breed scala",
  "een scala aan",
  "een schat aan",
  "een rijk palet",
  "van onschatbare waarde",
  "in het hart van",
  "de sleutel tot",
  "speelt een cruciale rol",
  "speelt een sleutelrol",
  "speelt een belangrijke rol",
  "navigeren",
  "navigeer",
  "het landschap",
  "dit landschap",
  "digitale landschap",
  "ecosysteem",
  "faciliteren",
  "faciliteert",
  "stroomlijnen",
  "stroomlijnt",
  "ontsluiten",
  "ontsluit",
  "ontgrendel",
  "ontgrendelen",
  "benutten",
  "potentieel",
  "resoneren",
  "resoneert",
  "symboliseert",
  "onderstreept",
  "getuigt van",
  "is een bewijs van",
  "tot leven",
  "duik in",
  "duiken we",
  "ontdek de kracht",
  "de kracht van",
  "transformeren",
  "transformeert",
  "optimaliseren",
  "naar een hoger niveau",
  "next level",
  "game-changer",
  "gamechanger",
  "dynamische",
  "innovatieve",
  "krachtige",
  "slimme oplossing",
  "slimme oplossingen",
];

export const TEKSTREGELS = [
  // A. Ensceneren in plaats van zeggen
  {
    id: "niet-maar",
    groep: "tekst",
    ernst: "hoog",
    naam: "Niet X, maar Y",
    uitleg: "Een tegenstelling die alleen gewicht toevoegt. Niemand dacht X.",
    fix: "Zeg Y. Houd de tegenstelling alleen als lezers X echt geloven.",
    soort: "proza",
    patronen: [
      rx(String.raw`(?:^|[.!?]\s+)Niet\s+[^.?!\n]{1,50}[.!?]\s+Maar\s`, "gu"),
      rx(
        String.raw`\b(?:gaat|draait|is|zijn|ligt)\s+niet\s+(?:om|in|bij|aan)?\s*[^.?!\n]{1,60}[.!?]\s+(?:Het|Dit|Dat|Ze)\s+(?:gaat|draait|is|zijn|ligt)\b`,
      ),
      rx(
        String.raw`\b(?:is|zijn)\s+geen\s+[^.?!\n]{1,50}[.!?]\s+(?:Het|Dit|Dat|Ze)\s+(?:is|zijn)\b`,
      ),
    ],
  },
  {
    id: "niet-maar-zin",
    groep: "tekst",
    ernst: "laag",
    naam: "Niet X, maar Y in één zin",
    uitleg: "Gewoon Nederlands, zolang het één keer per stuk is. Modellen doen het elke alinea.",
    fix: "Tel ze. Meer dan één per tekst: zeg bij de rest gewoon Y.",
    soort: "proza",
    patronen: [
      rx(String.raw`\bniet\s+(?!alleen\b|enkel\b|zomaar\b)[^.?!;:\n,]{1,50},?\s+maar\s+(?!ook\b)`),
    ],
  },
  {
    id: "niet-alleen-maar-ook",
    groep: "tekst",
    ernst: "laag",
    naam: "Niet alleen X, maar ook Y",
    uitleg: "Op zich gewoon Nederlands, maar modellen gebruiken het per alinea.",
    fix: "Noem beide gewoon, of alleen de belangrijkste.",
    soort: "proza",
    patronen: [rx(String.raw`\bniet\s+(?:alleen|enkel)\s+[^.?!\n]{1,60}?\s+maar\s+ook\b`)],
  },
  {
    id: "vraag-antwoord",
    groep: "tekst",
    ernst: "hoog",
    naam: "Vraagje met antwoord",
    uitleg: 'Een retorische vraag als spanningsboog: "Het resultaat? ...", "En eerlijk?".',
    fix: 'Schrijf het als gewone zin: "Het resultaat is ..." of begin direct met het antwoord.',
    patronen: [
      rx(
        String.raw`(?:^|[.!?:]\s+)(?:Het\s+resultaat|Het\s+goede\s+nieuws|Het\s+slechte\s+nieuws|Het\s+geheim|Het\s+antwoord|Het\s+verschil|De\s+reden|De\s+truc|De\s+uitkomst|Het\s+mooiste|Het\s+mooie|De\s+oplossing|Het\s+probleem|De\s+winst|Het\s+effect|De\s+les|De\s+clou|Het\s+addertje)\?`,
        "gu",
      ),
      rx(
        String.raw`\b(?:En\s+eerlijk|Eerlijk\s+is\s+eerlijk|Klinkt\s+bekend|Herkenbaar|Hoe\s+dan|Waarom\s+dat\s+ertoe\s+doet|Waarom\s+dit\s+belangrijk\s+is)\?`,
      ),
      rx(String.raw`(?:^|[.!?]\s+)Spoiler(?:\s+alert)?:`, "gu"),
    ],
  },
  {
    id: "aanloop",
    groep: "tekst",
    ernst: "hoog",
    naam: "Aanloop voor de zaak",
    uitleg: "Een opening die over de tijd of de wereld gaat in plaats van over het onderwerp.",
    fix: "Begin bij het onderwerp: wat er gebeurt, bij wie, en waarom het nu speelt.",
    patronen: [
      rx(String.raw`\bIn\s+een\s+(?:wereld|tijd|tijdperk|maatschappij)\s+(?:waarin|waar)\b`),
      rx(String.raw`(?:^|[.!?]\s+)In\s+(?:tijden|een\s+tijd|dit\s+tijdperk)\s+van\b`, "gu"),
      rx(
        String.raw`\bIn\s+het\s+(?:huidige|hedendaagse|snel\s+veranderende|steeds\s+veranderende|digitale)\s+(?:digitale\s+)?(?:landschap|tijdperk|klimaat)\b`,
      ),
      rx(
        String.raw`\bIn\s+de\s+(?:snel\s+veranderende|steeds\s+veranderende|hedendaagse|huidige)\s+(?:wereld|markt|samenleving)\b`,
      ),
      rx(String.raw`\bLaten\s+we\s+eerlijk\s+zijn\b`),
      rx(String.raw`(?:^|[.!?]\s+)Stel\s+je\s+(?:eens\s+)?voor[:,]`, "gu"),
      rx(String.raw`\bWe\s+kennen\s+het\s+(?:allemaal|vast\s+allemaal)\b`),
      rx(
        String.raw`\bSteeds\s+meer\s+(?:bedrijven|organisaties|ondernemers|mensen|teams)\s+(?:ontdekken|kiezen|zien|omarmen)\b`,
      ),
      rx(String.raw`\bAI\s+is\s+niet\s+meer\s+weg\s+te\s+denken\b`),
    ],
  },
  {
    id: "pseudo-wijsheid",
    groep: "tekst",
    ernst: "midden",
    naam: "Zin die diep klinkt",
    uitleg: "Een algemene wijsheid als slot of overgang. Ze klinkt waar en zegt niets.",
    fix: "Schrappen, of vervangen door het concrete punt dat de alinea al maakte.",
    soort: "proza",
    patronen: [
      rx(String.raw`(?:^|[.!?]\s+)Misschien\s+is\s+dat\s+(?:wel\s+)?(?:de|het)\b`, "gu"),
      rx(
        String.raw`\b(?:echte|ware)\s+[\p{L}]+\s+(?:zit|ligt|begint)\s+(?:zelden\s+|vaak\s+|altijd\s+)?(?:in|bij)\b`,
      ),
      rx(String.raw`\bis\s+het\s+nieuwe\s+(?:goud|olie|normaal)\b`),
      rx(
        String.raw`\b(?:draait|gaat)\s+(?:het|alles)\s+(?:uiteindelijk|allemaal|uiteindelijk\s+allemaal)\s+om\b`,
      ),
      rx(String.raw`(?:^|[.!?,]\s+)(?:Het|het)\s+draait\s+(?:allemaal\s+)?om\b`, "gu"),
      rx(String.raw`\bUiteindelijk\s+(?:draait|gaat)\s+het\s+om\b`),
      rx(String.raw`\bEn\s+dat\s+maakt\s+(?:het|alle|precies\s+het)\s+verschil\b`),
      rx(String.raw`\bDat\s+is\s+de\s+kracht\s+van\b`),
    ],
  },
  {
    id: "alsof-reeks",
    groep: "tekst",
    ernst: "hoog",
    naam: 'Reeks met "Alsof"',
    uitleg:
      'Twee of meer zinnen die beginnen met "Alsof" om een aanname neer te zetten en meteen af te breken.',
    fix: "Zeg één keer wat er niet klopt, en waarom.",
    soort: "proza",
    patronen: [rx(String.raw`(?:^|[.!?]\s+)Alsof\b[^.!?\n]*[.!?]\s+Alsof\b`, "gu")],
  },
  {
    id: "afsluiter",
    groep: "tekst",
    ernst: "midden",
    naam: "Samenvattende afsluiter",
    uitleg: '"Kortom", "Al met al": de tekst vat zichzelf samen terwijl de lezer net klaar is.',
    fix: "Laat de laatste alinea eindigen op het laatste feit of de volgende stap.",
    soort: "proza",
    patronen: [
      rx(
        String.raw`(?:^|[.!?]\s+)(?:Kortom|Al\s+met\s+al|Concluderend|Samengevat|Samenvattend|In\s+het\s+kort|Kort\s+gezegd|Kort\s+samengevat|Om\s+af\s+te\s+sluiten)[,:]`,
        "gu",
      ),
    ],
  },

  // B. Ritme volgens regel
  {
    id: "gedachtestreepje",
    groep: "tekst",
    ernst: "midden",
    naam: "Gedachtestreepje als verbinder",
    uitleg: "Modellen gebruiken — en – voor elke pauze. In Nederlandse tekst is het zeldzaam.",
    fix: "Komma, dubbele punt, punt of haakjes. Houd een streepje alleen als de schrijver het zelf zo doet.",
    patronen: [
      rx(String.raw`[^\s—]\s?—\s?[^\s—]`, "gu"),
      rx(String.raw`[\p{L})]\s–\s[\p{L}(]`, "gu"),
      rx(String.raw`[\p{L})]\s-\s[\p{L}(]`, "gu"),
    ],
  },
  {
    id: "engelse-komma",
    groep: "taal",
    ernst: "laag",
    naam: 'Komma voor "en" of "of" in een opsomming',
    uitleg: 'De Engelse Oxford-komma. In het Nederlands staat er geen komma voor het laatste "en".',
    fix: '"Priva, Hoogendoorn en Ridder", niet "Priva, Hoogendoorn, en Ridder".',
    patronen: [
      rx(
        String.raw`[\p{L}\p{N}-]+(?:\s[\p{L}\p{N}-]+)?,\s[\p{L}\p{N}-]+(?:\s[\p{L}\p{N}-]+)?,\s(?:en|of)\s[\p{L}\p{N}-]+(?:\s[\p{L}\p{N}-]+)?(?=[.;:!?)]|$)`,
        "gu",
      ),
    ],
  },
  {
    id: "staccato-geen",
    groep: "tekst",
    ernst: "midden",
    naam: "Geen dit. Geen dat.",
    uitleg: "Reeks korte ontkenningen als slogan.",
    fix: "Eén zin die zegt wat er wel gebeurt.",
    patronen: [
      rx(String.raw`(?:^|[.!?]\s+)Geen\s+[^.!?\n]{1,30}[.!]\s+Geen\s+[^.!?\n]{1,30}[.!]`, "gu"),
    ],
  },
  {
    id: "drieslag",
    groep: "tekst",
    ernst: "midden",
    naam: "Drieslag van trappen",
    uitleg:
      '"Sneller, slimmer en efficiënter": drie vergrotende trappen als ritme, niet als inhoud.',
    fix: "Kies het ene voordeel dat je kunt onderbouwen en zeg hoeveel of hoe.",
    patronen: [
      rx(
        String.raw`\b[\p{L}]{3,}(?:er|der),\s+[\p{L}]{3,}(?:er|der)\s+en\s+[\p{L}]{3,}(?:er|der)\b`,
      ),
    ],
  },

  // C. Opblazen en geleende autoriteit
  {
    id: "verkooptaal",
    groep: "tekst",
    ernst: "midden",
    naam: "Verkooptaal",
    uitleg: "Beloftes die bij elk product passen.",
    fix: "Wat doet het, voor wie, en wat kost het of levert het op?",
    patronen: [
      rx(
        String.raw`\b(?:${lijst([
          "in een handomdraai",
          "zonder gedoe",
          "met een paar klikken",
          "met één klik",
          "binnen enkele klikken",
          "alles-in-één",
          "all-in-one",
          "dé oplossing",
          "op maat gemaakt voor jouw unieke",
          "jouw unieke behoeften",
          "naar een hoger niveau",
          "next level",
          "game-changer",
          "gamechanger",
          "no-brainer",
          "ontdek de kracht",
          "ontgrendel",
          "boost je",
          "supercharge",
          "het beste van twee werelden",
          "het beste van beide werelden",
          "zorgeloos",
          "geen zorgen meer",
          "nooit meer",
        ])})\b`,
      ),
    ],
  },
  {
    id: "autoriteit",
    groep: "tekst",
    ernst: "midden",
    naam: "Geleende autoriteit zonder bron",
    uitleg: '"Onderzoek toont aan" zonder te zeggen welk onderzoek.',
    fix: "Noem de bron met jaar, of haal de bewering weg.",
    soort: "proza",
    patronen: [
      rx(
        String.raw`\b(?:Experts\s+zijn\s+het\s+(?:erover\s+)?eens|Onderzoek\s+(?:toont|laat\s+zien)\s+aan|Uit\s+onderzoek\s+blijkt|Studies\s+(?:tonen|laten\s+zien)|Volgens\s+experts|Volgens\s+onderzoek|Het\s+is\s+bewezen)\b`,
      ),
    ],
  },
  {
    id: "oppervlakkige-bijzin",
    groep: "tekst",
    ernst: "midden",
    naam: "Gevolg dat achteraan hangt",
    uitleg:
      '", wat zorgt voor ...", ", waardoor je tijd bespaart": een vaag gevolg achter een zin.',
    fix: "Noem het gevolg concreet in een eigen zin, of laat het weg.",
    soort: "proza",
    patronen: [
      rx(
        String.raw`,\s+(?:wat|waardoor|waarmee|en\s+daarmee)\s+(?:je\s+)?(?:zorgt\s+voor|tijd\s+bespaart|bijdraagt\s+aan|resulteert\s+in|leidt\s+tot\s+een|efficiënter|soepeler|beter)\b`,
      ),
    ],
  },
  {
    id: "koppelwerkwoord",
    groep: "tekst",
    ernst: "laag",
    naam: 'Om "is" en "heeft" heen',
    uitleg: '"Fungeert als", "dient als", "beschikt over" waar "is" of "heeft" volstaat.',
    fix: 'Schrijf "is" of "heeft".',
    soort: "proza",
    patronen: [rx(String.raw`\b(?:fungeert|fungeren|dient|dienen)\s+als\b|\bbeschikt\s+over\b`)],
  },

  // D. Restanten van chat en concept
  {
    id: "chatbot",
    groep: "tekst",
    ernst: "hoog",
    naam: "Chatbotrest",
    uitleg: "Zinnen uit het gesprek met het model die in de tekst zijn blijven staan.",
    fix: "Weghalen.",
    patronen: [
      rx(
        String.raw`\b(?:Goede\s+vraag|Uitstekende\s+vraag|Zeker\s+weten|Natuurlijk\s+help\s+ik)\b`,
      ),
      rx(
        String.raw`\bHier\s+is\s+(?:een|de|je)\s+(?:herschreven|aangepaste|verbeterde|nieuwe|korte)\b`,
      ),
      rx(String.raw`\bIk\s+hoop\s+dat\s+(?:dit|dat)\s+(?:helpt|duidelijk)\b`),
      rx(String.raw`\bLaat\s+(?:het\s+)?(?:me|mij)\s+(?:gerust\s+)?weten\s+als\b`),
      rx(String.raw`\bWil\s+je\s+dat\s+ik\b`),
      rx(String.raw`\b(?:Als|Als\s+een)\s+(?:AI-)?taalmodel\b`),
      rx(String.raw`\bIk\s+heb\s+geen\s+toegang\s+tot\b`),
      rx(String.raw`\b(?:tot\s+mijn|volgens\s+mijn)\s+kennisdatum\b`),
    ],
  },
  {
    id: "tekst-over-tekst",
    groep: "tekst",
    ernst: "midden",
    naam: "Tekst over de tekst",
    uitleg: '"In dit artikel bespreken we": de tekst kondigt zichzelf aan.',
    fix: "Begin met wat je zou aankondigen.",
    patronen: [
      rx(
        String.raw`\bIn\s+(?:dit|deze)\s+(?:artikel|blog|blogpost|stuk|bericht|gids|handleiding)\s+(?:bespreken|lees\s+je|ontdek\s+je|gaan\s+we|duiken\s+we|nemen\s+we|leggen\s+we|vertellen\s+we|laten\s+we)\b`,
      ),
      rx(String.raw`\bLaten\s+we\s+(?:eens\s+)?(?:kijken|duiken|beginnen|een\s+kijkje)\b`),
      rx(String.raw`\bHieronder\s+(?:lees|vind|zie|bespreken)\b`),
    ],
  },

  // E. Nederlands met Engelse bouw
  {
    id: "v2-fout",
    groep: "taal",
    ernst: "hoog",
    naam: "Engelse woordvolgorde",
    uitleg:
      '"Daarom, we hebben" is Engels. In het Nederlands komt het werkwoord op de tweede plek.',
    fix: '"Daarom hebben we", "Vandaag lanceren we".',
    patronen: [
      rx(
        String.raw`(?:^|[.!?]\s+)(?:Daarom|Vandaag|Daarnaast|Bovendien|Uiteindelijk|Soms|Nu|Hier|Morgen|Gisteren|Vervolgens|Daarna|Toen|Eerst|Zo|Echter|Tegenwoordig|Inmiddels|Straks|Dit\s+jaar|Vorig\s+jaar|Volgend\s+jaar),\s+(?:ik|je|jij|we|wij|u|hij|zij|ze|het|dit|dat|mensen|bedrijven|klanten|telers)\s+(?!die\b|dat\b)[\p{L}]+`,
        "gu",
      ),
    ],
  },
  {
    id: "echter-vooraan",
    groep: "taal",
    ernst: "midden",
    naam: '"Echter" vooraan',
    uitleg:
      '"Echter, ..." is vertaald "However, ...". In het Nederlands staat echter midden in de zin.',
    fix: '"Maar ...", of "Dat is echter ...".',
    patronen: [rx(String.raw`(?:^|[.!?]\s+)Echter[,\s]`, "gu")],
  },
  {
    id: "vertaald",
    groep: "taal",
    ernst: "midden",
    naam: "Vertaalde uitdrukking",
    uitleg: "Een Engelse uitdrukking woord voor woord omgezet.",
    fix: "Zeg het zoals een Nederlander het zou zeggen, of laat het weg.",
    patronen: [
      rx(
        String.raw`\b(?:${lijst([
          "aan het einde van de dag",
          "aan het eind van de dag",
          "het is belangrijk om op te merken",
          "het is belangrijk om te vermelden",
          "dat gezegd hebbende",
          "dat gezegd zijnde",
          "in termen van",
          "neem een kijkje",
          "één ding is zeker",
          "een ding is zeker",
          "laaghangend fruit",
          "out of the box",
          "op dezelfde pagina",
          "dit is waarom",
          "dat is waarom",
          "om de hoek komt kijken",
          "zonder verder oponthoud",
          "het spel veranderen",
          "verandert het spel",
          "maakt sense",
          "maakt het verschil",
          "impact maken",
          "een deep dive",
          "deep dive",
          "til je",
          "tillen je",
          "breng je .{1,20} naar",
          "ga aan de slag met",
          "het kloppend hart",
          "de kers op de taart",
          "een win-win",
          "win-winsituatie",
          "in lijn met",
        ])})\b`,
      ),
    ],
  },
  {
    id: "of-je-nu",
    groep: "taal",
    ernst: "laag",
    naam: '"Of je nu ... of ..."',
    uitleg: 'Vertaald "Whether you\'re ... or ...": een zin die iedereen wil aanspreken.',
    fix: "Spreek één lezer aan.",
    patronen: [rx(String.raw`\bOf\s+je\s+nu\b[^.!?\n]{1,80}\bof\b`)],
  },
  {
    id: "spatiefout",
    groep: "taal",
    ernst: "midden",
    naam: "Engelse spatie in een samenstelling",
    uitleg: "Nederlandse samenstellingen schrijf je aaneen, met een koppelteken na een afkorting.",
    fix: '"AI-oplossing", "klantenservice", "e-mailadres", "projectmanager".',
    patronen: [
      rx(
        String.raw`\b(?:AI|CRM|ERP|B2B|B2C|SEO|API|KPI|ICT|HR|IT|SaaS|e-mail|klant|klanten|web|project|team|sales|support|data|software)\s+(?:oplossing|oplossingen|systeem|systemen|assistent|assistenten|tool|tools|koppeling|koppelingen|adres|adressen|pagina|platform|strategie|service|beheer|manager|bureau|campagne|leider|analyse|gedreven|gestuurd|gestuurde|gebaseerd|gebaseerde|agent|agents|model|modellen|specialist|traject|integratie|omgeving|lid|leden)\b`,
        "gu",
      ),
    ],
  },

  {
    id: "ambtelijk",
    groep: "taal",
    ernst: "laag",
    naam: "Ambtelijk",
    uitleg: "Naamwoordstijl en kanselarijtaal om zakelijk te klinken.",
    fix: '"middels" wordt "met", "teneinde" wordt "om", "zorgdragen voor" wordt "zorgen dat".',
    soort: "proza",
    patronen: [
      rx(
        String.raw`\b(?:middels|teneinde|zorgdragen|zorg\s+dragen\s+voor|draagt\s+zorg\s+voor|inzake|alsmede|derhalve|dient\s+te\s+worden|dienen\s+te\s+worden|een\s+verbeterslag|het\s+realiseren\s+van|het\s+optimaliseren\s+van|ten\s+behoeve\s+van|met\s+betrekking\s+tot)\b`,
      ),
    ],
  },

  // G. Overcorrectie: wat een humanizer achterlaat
  {
    id: "overcorrectie",
    groep: "tekst",
    ernst: "midden",
    naam: "Geforceerde nonchalance",
    uitleg: 'Spreektaal als toneel. Het patroon van tekst die "menselijk" moest klinken.',
    fix: "Gewone zinnen. Informeel mag, nadoen niet.",
    patronen: [
      rx(String.raw`(?:^|[.!?]\s+)(?:Eerlijk|Serieus|Echt\s+waar|Kijk)\?`, "gu"),
      rx(
        String.raw`\b(?:Lang\s+verhaal\s+kort|Plot\s*twist|Hot\s+take|Unpopular\s+opinion|Fun\s+fact|Pro\s*tip|TL;?DR)\s*[:.!]`,
      ),
      rx(
        String.raw`\b(?:Ik\s+ga\s+je\s+iets\s+vertellen|Laat\s+dat\s+even\s+bezinken|Lees\s+dat\s+nog\s+maar\s+eens)\b`,
      ),
      rx(String.raw`\bgeen\s+(?:bullshit|poespas|fratsen|franje|blabla)\b`),
    ],
  },

  // F. Opmaak en notatie
  {
    id: "uitroep",
    groep: "tekst",
    ernst: "hoog",
    naam: "Dubbel uitroepteken",
    uitleg: '"!!" leest als een chatbot die enthousiast moet klinken.',
    fix: 'Een gewone mededeling: "Opgeslagen", "Factuur verstuurd".',
    patronen: [/!{2,}/gu],
  },
  {
    id: "uitroep-kop",
    groep: "tekst",
    ernst: "midden",
    naam: "Uitroepteken in kop of knop",
    uitleg: "Koppen en knoppen hoeven niet te roepen.",
    fix: "Zonder uitroepteken, en zonder punt.",
    soort: ["kop", "label"],
    patronen: [/!\s*$/gu],
  },
  {
    id: "emoji",
    groep: "tekst",
    ernst: "midden",
    naam: "Emoji als versiering",
    uitleg: "Emoji als opsommingsteken, voor koppen of in labels: 🚀 ✅ 💡 👉.",
    fix: "Weghalen, of één lijnicoon uit de set die de site al heeft.",
    patronen: [/(?![©®™])\p{Extended_Pictographic}/gu],
  },
  {
    id: "sterretje",
    groep: "tekst",
    ernst: "hoog",
    naam: "Sterretje voor alles met AI",
    uitleg: '✨ is het teken geworden voor "hier zit AI in".',
    fix: "Weghalen. Zeg wat de functie doet.",
    patronen: [/✨|🪄/gu],
  },
  {
    id: "title-case",
    groep: "taal",
    ernst: "midden",
    naam: "Hoofdletter Op Elk Woord",
    uitleg: "Engelse title case. In het Nederlands krijgt alleen het eerste woord een hoofdletter.",
    fix: '"Onze diensten", niet "Onze Diensten".',
    soort: ["kop", "label"],
    test(t) {
      const woorden = t.trim().split(/\s+/);
      if (woorden.length < 2 || woorden.length > 9) return [];
      const rest = woorden.slice(1).filter((w) => /^\p{L}/u.test(w) && !/^\p{Lu}{2,}\b/u.test(w));
      if (rest.length < 3) return [];
      const kapitaal = rest.filter((w) => /^\p{Lu}\p{Ll}/u.test(w));
      const functie = rest.some((w) =>
        /^(?:De|Het|Een|Van|Voor|En|Met|Op|In|Je|Jouw|Onze|Uw|Naar|Bij|Om|Te|Over|Zonder)$/u.test(
          w,
        ),
      );
      return kapitaal.length === rest.length && functie ? [t.trim()] : [];
    },
  },
  {
    id: "notatie-bedrag",
    groep: "taal",
    ernst: "midden",
    naam: "Engelse notatie van een bedrag",
    uitleg: "Duizendtallen met een komma of een dollarteken in Nederlandse tekst.",
    fix: '"€ 48.210" en "€ 1.250,50": punt voor duizendtallen, komma voor decimalen.',
    patronen: [
      rx(String.raw`€\s?\d{1,3}(?:,\d{3})+(?:\.\d{1,2})?(?!\d)`, "gu"),
      rx(String.raw`\$\s?\d[\d,.]*`, "gu"),
      rx(String.raw`€\s?\d+\.\d{2}(?!\d)`, "gu"),
    ],
  },
  {
    id: "notatie-procent",
    groep: "taal",
    ernst: "midden",
    naam: "Decimale punt",
    uitleg: '"12.5%" is Engels.',
    fix: '"12,5%".',
    patronen: [rx(String.raw`(?<![\d.])\d+\.\d+\s?%`, "gu")],
  },
  {
    id: "notatie-datum",
    groep: "taal",
    ernst: "midden",
    naam: "Engelse datum of tijd",
    uitleg: '"11/03/2026", "Nov 3, 2026" of "2:30 PM" in een Nederlandse tekst.',
    fix: '"3 november 2026", in tabellen "03-11-2026", en "14:30".',
    patronen: [
      rx(String.raw`\b\d{1,2}/\d{1,2}/\d{2,4}\b`, "gu"),
      rx(
        String.raw`\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\.?\s+\d{1,2},\s+\d{4}\b`,
        "gu",
      ),
      rx(String.raw`\b\d{1,2}(?::\d{2})?\s?(?:AM|PM|am|pm)\b`, "gu"),
    ],
  },
  {
    id: "notatie-maand",
    groep: "taal",
    ernst: "laag",
    naam: "Hoofdletter op maand of dag",
    uitleg: "Maanden en dagen zijn in het Nederlands kleine letters.",
    fix: '"maandag 3 november".',
    soort: "proza",
    patronen: [
      rx(
        String.raw`(?<=[\p{Ll},]\s+)(?:Maandag|Dinsdag|Woensdag|Donderdag|Vrijdag|Zaterdag|Zondag|Januari|Februari|Maart|April|Mei|Juni|Juli|Augustus|September|Oktober|November|December)\b`,
        "gu",
      ),
    ],
  },
  {
    id: "placeholder",
    groep: "tekst",
    ernst: "midden",
    naam: "Opvuldata",
    uitleg: "Namen en gegevens die iedereen als nep herkent.",
    fix: "Geloofwaardige Nederlandse voorbeelddata die niet van een echte klant is.",
    patronen: [
      rx(
        String.raw`\b(?:John\s+Doe|Jane\s+Doe|Acme(?:\s+(?:Inc|Corp|B\.V\.))?|Lorem\s+ipsum|123\s+Main\s+St(?:reet)?|Max\s+Mustermann|Jan\s+Jansen|Piet\s+Puk|Voorbeeldstraat\s+1|\[X\]|\[naam\]|\[bedrijf\]|example\.com)\b`,
        "gu",
      ),
    ],
  },
];

// "u" en "uw" als los woord; niet in "u-vorm" of "'u".
const U_RX =
  /(?<![\p{L}'’-])(?<!\bje\s+(?:en|of)\s+)(?:uw|u)(?![\p{L}'’-])(?!\s+(?:en|of)\s+je\b)/u;

// Regels over de tekst als geheel, niet per zin.
export function geheleTekstRegels(segmenten) {
  const vondsten = [];
  const proza = segmenten.filter((s) => s.soort === "proza" && s.nederlands !== false);
  const alles = proza.map((s) => s.tekst).join("\n");
  const woorden = woordtelling(alles);

  // Je en u door elkaar.
  const jeSeg = segmenten.find((s) => /(?<![\p{L}])(?:jij|jouw|je)(?![\p{L}])/iu.test(s.tekst));
  const uSeg = segmenten.find((s) => U_RX.test(s.tekst) && s.nederlands !== false);
  if (jeSeg && uSeg) {
    const jeAantal = segmenten.reduce(
      (n, s) => n + (s.tekst.match(/(?<![\p{L}])(?:jij|jouw|je|jou)(?![\p{L}])/giu) ?? []).length,
      0,
    );
    const uAantal = segmenten.reduce(
      (n, s) => n + (s.tekst.match(new RegExp(U_RX.source, "gu")) ?? []).length,
      0,
    );
    if (jeAantal >= 2 && uAantal >= 1) {
      vondsten.push({
        id: "je-en-u",
        groep: "taal",
        ernst: "hoog",
        naam: "Je en u door elkaar",
        uitleg: `De tekst zegt ${jeAantal} keer je of jouw en ${uAantal} keer u of uw.`,
        fix: "Kies er één en houd die vast. Meestal je; u alleen als het publiek dat verwacht.",
        regel: uSeg.regel,
        fragment: (() => {
          const m = U_RX.exec(uSeg.tekst);
          return m ? context(uSeg.tekst, m) : uSeg.tekst.slice(0, 80);
        })(),
      });
    }
  }

  // AI-woorden: los zijn ze zwak, samen een patroon.
  const woordRx = rx(String.raw`\b(?:${lijst(AI_WOORDEN)})\b`);
  const gevonden = new Map();
  for (const s of proza) {
    for (const m of s.tekst.matchAll(woordRx)) {
      const w = m[0].toLowerCase().replace(/\s+/g, " ");
      if (!gevonden.has(w)) gevonden.set(w, s.regel);
    }
  }
  if (gevonden.size > 0) {
    const veel = gevonden.size >= 3 || (gevonden.size >= 2 && gevonden.size / woorden > 0.01);
    vondsten.push({
      id: "ai-woorden",
      groep: "tekst",
      ernst: veel ? "midden" : "laag",
      naam: veel ? "Veel AI-woorden" : "AI-woord",
      uitleg: `Gevonden: ${[...gevonden.keys()].slice(0, 12).join(", ")}. Los zijn ze gewoon Nederlands; samen vormen ze de toon van een model.`,
      fix: "Vervang ze door het concrete ding of de handeling die bedoeld is.",
      regel: [...gevonden.values()][0],
      fragment: [...gevonden.keys()].slice(0, 5).join(", "),
    });
  }

  // Overgangswoorden vooraan in de zin.
  const openers = rx(
    String.raw`(?:^|[.!?]\s+)(?:Bovendien|Daarnaast|Tevens|Verder|Echter|Uiteindelijk|Concluderend|Kortom|Al\s+met\s+al)[,\s]`,
    "gu",
  );
  const aantalOpeners = (alles.match(openers) ?? []).length;
  if (aantalOpeners >= 3 && aantalOpeners / Math.max(1, woorden / 100) >= 1) {
    vondsten.push({
      id: "overgangswoorden",
      groep: "tekst",
      ernst: "midden",
      naam: "Elke zin een overgangswoord",
      uitleg: `${aantalOpeners} zinnen beginnen met bovendien, daarnaast, verder of iets dergelijks.`,
      fix: "Haal de meeste weg. Zinnen die op elkaar volgen hebben meestal geen lijm nodig.",
      regel: proza[0]?.regel ?? 1,
      fragment: "",
    });
  }

  // Staccato: drie of meer heel korte zinnen achter elkaar.
  for (const s of proza) {
    const zinnen = (s.volledig ?? s.tekst)
      .split(/(?<=[.!?])\s+/u)
      .map((z) => z.trim())
      .filter(Boolean);
    let reeks = 0;
    for (const z of zinnen) {
      reeks = woordtelling(z) <= 3 && /[.!?]$/u.test(z) ? reeks + 1 : 0;
      if (reeks === 3) {
        vondsten.push({
          id: "staccato",
          groep: "tekst",
          ernst: "midden",
          naam: "Staccato",
          uitleg: "Drie of meer zinnetjes van een paar woorden achter elkaar, als slogan.",
          fix: "Maak er één zin van die iets zegt.",
          regel: s.regel,
          fragment: s.tekst.slice(0, 80),
        });
        break;
      }
    }
  }

  // Vetgedrukte labels voor elk opsommingspunt.
  const vetLabels = segmenten.filter((s) =>
    /^\s*[-*+]\s+\*\*[^*]{1,40}:?\*\*:?/u.test(s.ruw ?? ""),
  );
  if (vetLabels.length >= 3) {
    vondsten.push({
      id: "vet-label",
      groep: "tekst",
      ernst: "midden",
      naam: "Vetgedrukt label voor elk punt",
      uitleg: `${vetLabels.length} opsommingspunten beginnen met een vet label en een dubbele punt.`,
      fix: "Schrijf de punten als gewone zinnen, of maak er een alinea van.",
      regel: vetLabels[0].regel,
      fragment: vetLabels[0].ruw.trim().slice(0, 60),
    });
  }

  return vondsten;
}

// --- Ontwerpregels -----------------------------------------------------------
//
// Deze draaien op code (CSS, HTML, JSX en verwanten), regel voor regel.

export const ONTWERPREGELS = [
  {
    id: "paars-verloop",
    ernst: "hoog",
    naam: "Paars-blauw verloop",
    uitleg: "Het verloop dat iedereen inmiddels als AI herkent.",
    fix: "Eén effen vlak uit de neutrale reeks, met een accent alleen waar het iets betekent.",
    patronen: [
      /\bfrom-(?:purple|violet|indigo|fuchsia)-\d{2,3}\b[^"'`\n]*\b(?:via|to)-(?:blue|indigo|purple|pink|violet|cyan|fuchsia|sky)-\d{2,3}\b/g,
      /\bfrom-(?:blue|cyan|sky)-\d{2,3}\b[^"'`\n]*\bto-(?:purple|violet|indigo|fuchsia|pink)-\d{2,3}\b/g,
      /(?:linear|radial|conic)-gradient\([^)]*#(?:7c3aed|8b5cf6|6366f1|a855f7|9333ea|4f46e5|6d28d9|c026d3|a78bfa|818cf8)/gi,
    ],
  },
  {
    id: "verlooptekst",
    ernst: "hoog",
    naam: "Verlooptekst",
    uitleg: "Tekst met een kleurverloop erin, meestal in de kop.",
    fix: "Effen tekst in de primaire tekstkleur.",
    patronen: [/\bbg-clip-text\b/g, /background-clip:\s*text/gi],
  },
  {
    id: "gloed",
    ernst: "midden",
    naam: "Gekleurde gloed",
    uitleg: "Een schaduw zonder verschuiving, in een kleur: elementen die gloeien.",
    fix: "Weghalen. Diepte komt uit stappen in het vlak en dunne randen.",
    patronen: [
      /\b(?:shadow|drop-shadow)-\[0_0_\d+px[^\]]*\]/g,
      /box-shadow:\s*0(?:px)?\s+0(?:px)?\s+\d+px\s+(?:\d+px\s+)?(?:rgba?\(\s*(?!0\s*,\s*0\s*,\s*0)|#(?!000))/gi,
      /\bshadow-(?:purple|violet|indigo|blue|cyan|fuchsia|pink|emerald)-\d{3}(?:\/\d+)?\b/g,
    ],
  },
  {
    id: "pulseren",
    ernst: "midden",
    naam: "Beweging zonder reden",
    uitleg: "Pulseren, pingen of stuiteren op iets dat niet live is.",
    fix: "Statisch. Beweging alleen als ze iets uitlegt.",
    patronen: [/\banimate-(?:pulse|ping|bounce)\b/g],
  },
  {
    id: "transition-all",
    ernst: "laag",
    naam: "transition-all",
    uitleg: "Alles animeren, ook wat niet moet bewegen.",
    fix: "Benoem wat beweegt: transition-colors, of transition-[transform,opacity].",
    patronen: [/\btransition-all\b/g, /transition:\s*all\b/gi],
  },
  {
    id: "hover-scale",
    ernst: "laag",
    naam: "Kaart die groeit bij hover",
    uitleg: "hover:scale op kaarten en knoppen.",
    fix: "Een kleine kleurstap in het vlak bij hover, een heel kleine verkleining bij indrukken.",
    patronen: [/\bhover:scale-1(?:0[5-9]|[1-9]\d)\b/g],
  },
  {
    id: "hoofdletterlabel",
    ernst: "midden",
    naam: "Hoofdletterlabel met brede spatiëring",
    uitleg:
      "Het label in kapitalen boven elke kop. Een van de bekendste tekens van een gegenereerde pagina.",
    fix: "Weg, tenzij het iets zegt wat de kop niet zegt. Dan in gewone letters, zonder extra spatiëring.",
    patronen: [
      /\buppercase\b[^"'`\n]*\btracking-(?:wide|wider|widest|\[0?\.\d+em\])/g,
      /\btracking-(?:wider|widest|\[0?\.\d+em\])\b[^"'`\n]*\buppercase\b/g,
    ],
  },
  {
    id: "standaardletter",
    ernst: "laag",
    naam: "Standaardletter",
    uitleg: "Inter of Geist zonder dat iemand ervoor koos.",
    fix: "Een letter die past bij het karakter van het product, of houd hem als het merk hem echt gebruikt.",
    patronen: [
      /font-family:[^;{}]*\b(?:Inter|Geist)\b/g,
      /\b(?:Inter|Geist)\(\s*\{/g,
      /["'](?:Inter|Geist)["']\s*,\s*["']?(?:sans-serif|ui-sans-serif|system-ui)/g,
    ],
  },
  {
    id: "smaakvolle-letter",
    ernst: "laag",
    naam: "De smaakvolle standaard",
    uitleg:
      "Instrument Serif, Fraunces en verwanten: de letters die modellen pakken als ze Inter vermijden.",
    fix: 'Geen probleem op zich. Wel: kies hem om het onderwerp, niet om "redactioneel" te ogen.',
    patronen: [
      /\b(?:Instrument Serif|Fraunces|Playfair Display|DM Serif Display|Cormorant Garamond|Newsreader)\b/g,
    ],
  },
  {
    id: "claude-terracotta",
    ernst: "midden",
    naam: "Terracotta-accent",
    uitleg: 'De accentkleur van Claude zelf. Op crème is het de "smaakvolle" standaard van 2026.',
    fix: "Haal grond en accent uit de wereld van het product: materiaal, plek, signalering.",
    patronen: [/#(?:d97757|cc785c|da7756|c96442|d4775c|bd5d3a)\b/gi],
  },
  {
    id: "zuurgroen",
    ernst: "laag",
    naam: "Zuurgroen op bijna-zwart",
    uitleg: "De donkere tegenhanger van crème met terracotta.",
    fix: "Donker alleen als het product het verdient, en dan als palet, niet als één neon.",
    patronen: [
      /#(?:a3e635|bef264|c6f432|d4ff00|ccff00|39ff14|b4ff39)\b/gi,
      /\b(?:text|bg)-lime-(?:300|400)\b/g,
    ],
  },
  {
    id: "smaragd",
    ernst: "laag",
    naam: "Smaragd als uitwijkaccent",
    uitleg: "Met paars verboden is smaragdgroen de volgende reflex.",
    fix: "Koppel het accent aan het merk of het onderwerp en geef het een taak.",
    patronen: [/\b(?:bg|text|border|from|to|ring)-emerald-(?:400|500|600)\b/g],
  },
  {
    id: "glas",
    ernst: "laag",
    naam: "Glas uit reflex",
    uitleg: "backdrop-blur overal. Werkt alleen als er echt iets achter ligt.",
    fix: "Een effen verhoogd vlak, tenzij er een beeld of beweging achter zit.",
    patronen: [/\bbackdrop-blur(?:-\w+)?\b/g, /backdrop-filter:\s*blur/gi],
  },
  {
    id: "volgnummers",
    ernst: "midden",
    naam: "01, 02, 03 voor dingen zonder volgorde",
    uitleg: "Twee cijfers met een nul lenen strengheid aan een lijst die geen volgorde heeft.",
    fix: "Nummer alleen stappen, tijdlijnen en ranglijsten.",
    patronen: [
      /padStart\(\s*2\s*,\s*["']0["']\s*\)/g,
      /`0\$\{[^}]+\}`/g,
      />\s*0[1-9]\s*</g,
      /["']0[1-9]["']\s*[,}]/g,
    ],
  },
  {
    id: "effectbibliotheek",
    ernst: "midden",
    naam: "Effect uit een bibliotheek",
    uitleg: "Spotlight, beams, meteoren, glinsterknoppen: herkenbaar van duizend sites.",
    fix: "Weghalen, of een effect dat uit het product zelf komt.",
    patronen: [
      /\b(?:BackgroundBeams|Meteors|SparklesCore|ShimmerButton|BorderBeam|AuroraBackground|TextGenerateEffect|TypewriterEffect|LampContainer|AnimatedGradientText|MagicCard|ShineBorder|BackgroundGradientAnimation|WavyBackground|GlowingStarsBackgroundCard|Spotlight)\b/g,
    ],
  },
  {
    id: "optellen",
    ernst: "laag",
    naam: "Getal dat optelt",
    uitleg: "Statistieken die bij het scrollen van 0 omhoog tellen.",
    fix: "Zet het getal er gewoon neer, met waar het vandaan komt.",
    patronen: [
      /\b(?:CountUp|useCountUp|react-countup|NumberTicker|AnimatedNumber|AnimatedCounter)\b/g,
    ],
  },
  {
    id: "sterretje-icoon",
    ernst: "midden",
    naam: "Sterretjesicoon",
    uitleg: "Het Sparkles-icoon bij alles met AI.",
    fix: "Weghalen, of een icoon dat de functie uitlegt.",
    patronen: [/<Sparkles\b/g, /\bSparklesIcon\b/g],
  },
  {
    id: "zware-kop",
    ernst: "laag",
    naam: "Kop in 800 of 900",
    uitleg: "Extra vet om hiërarchie te maken die maat en kleur al kunnen dragen.",
    fix: "400 tot 600, en hiërarchie uit maat.",
    patronen: [/\bfont-(?:extrabold|black)\b/g, /font-weight:\s*(?:800|900)\b/g],
  },
  {
    id: "losse-px",
    ernst: "laag",
    naam: "Losse pixelwaarde",
    uitleg: "mt-[13px] en dergelijke: maten buiten het ritme.",
    fix: "Een stap uit de schaal van 4px.",
    test(regel) {
      const uit = [];
      for (const m of regel.matchAll(
        /\b(?:m|p|[mp][tblrxy]|gap|gap-[xy]|h|w|top|left|right|bottom|inset)-\[(\d+)px\]/g,
      )) {
        if (Number(m[1]) % 2 !== 0 && Number(m[1]) > 2) uit.push(m[0]);
      }
      return uit;
    },
  },
  {
    id: "taal-attribuut",
    ernst: "hoog",
    naam: 'lang="en" op een Nederlandse pagina',
    uitleg: "Schermlezers lezen dan Nederlands met een Engelse stem, en afbreken klopt niet.",
    fix: '<html lang="nl">.',
    alleenNederlands: true,
    patronen: [/<html[^>]*\blang=["']en/gi],
  },
  {
    id: "generator",
    ernst: "laag",
    naam: "Handtekening van de generator",
    uitleg: "Een badge of tekst die zegt waarmee de site gemaakt is.",
    fix: "Weghalen uit wat bezoekers zien.",
    patronen: [
      /\b(?:Edit with Lovable|Made with (?:v0|Lovable|Bolt|Framer)|Built with (?:v0|Lovable|Bolt))\b/gi,
    ],
  },
  {
    id: "stockbeeld",
    ernst: "laag",
    naam: "Bestandsnaam van een AI-cliché",
    uitleg: "Robots, breinen, hologrammen en glanzende bollen zeggen niets over het product.",
    fix: "Laat zien wat het product doet of maakt.",
    patronen: [
      /["'(/][\w/-]*(?:robot|brain|hologram|neural|glowing-orb|abstract-3d|ai-head)[\w-]*\.(?:png|jpe?g|webp|svg|avif)/gi,
    ],
  },
];

// Engelse knoppen en labels in een Nederlandse interface.
const ENGELSE_LABELS = new Set(
  [
    "get started",
    "learn more",
    "sign up",
    "sign in",
    "log in",
    "login",
    "read more",
    "book a demo",
    "request a demo",
    "contact us",
    "pricing",
    "features",
    "settings",
    "insights",
    "submit",
    "subscribe",
    "download now",
    "try for free",
    "start free trial",
    "try it free",
    "see more",
    "view all",
    "show more",
    "next",
    "previous",
    "back",
    "continue",
    "save changes",
    "cancel",
    "search",
    "about us",
    "our services",
    "testimonials",
    "use cases",
    "how it works",
    "get in touch",
    "let's talk",
  ].map((s) => s.toLowerCase()),
);

export function engelsLabel(tekst) {
  if (!/^\p{Lu}/u.test(tekst.trim())) return false;
  const kaal = tekst
    .trim()
    .replace(/[\s→›»>.!…]+$/u, "")
    .toLowerCase();
  return ENGELSE_LABELS.has(kaal);
}

// --- Tekst uit bestanden halen ----------------------------------------------

const lijktOpKlassen = (s) => {
  const t = s.trim().split(/\s+/);
  if (t.length === 0) return false;
  const klasachtig = t.filter(
    (w) => /^[!-]?[a-z0-9@:[\]\/.\-_%#(),&>~*+=]+$/i.test(w) && /[-:[]/.test(w),
  );
  return klasachtig.length >= Math.ceil(t.length / 2);
};

const CITAAT = /"[^"\n]{1,240}"|“[^”\n]{1,240}”|„[^”"\n]{1,240}[”"]|«[^»\n]{1,240}»/gu;

// Waarden van technische attributen en sleutels zijn geen tekst voor mensen.
const TECHNISCH =
  /\b(?:type|name|id|key|role|variant|size|mode|method|autoComplete|inputMode|as|rel|target|htmlFor|event|status|lang|dir|href|src|className|class|data-[\w-]+|aria-(?:hidden|live|controls|current))\s*[=:]\s*\{?\s*$/;

const lijktOpCode = (s) =>
  /^(?:https?:|\/|\.\.?\/|#|@|[\w-]+\.(?:js|ts|tsx|css|png|svg|webp|jpg)$)/.test(s.trim()) ||
  /[{}<>=;]|=>|\$\{/.test(s);

/**
 * Haal leesbare tekst uit een bestand. Geeft segmenten met regelnummer terug.
 * Markdown en platte tekst worden als lopende tekst gelezen; code levert
 * stringwaarden en tekst tussen tags.
 */
export function segmenten(bron, extensie) {
  const uit = [];
  const regels = bron.split(/\r?\n/);
  const ext = extensie.toLowerCase().replace(/^\./, "");

  if (["md", "mdx", "txt", "markdown", ""].includes(ext)) {
    let inCode = false;
    regels.forEach((ruw, i) => {
      if (/^\s*(```|~~~)/.test(ruw)) {
        inCode = !inCode;
        return;
      }
      if (inCode || !ruw.trim() || /^\s*(?:---|\|[-: |]+\|)\s*$/.test(ruw)) return;
      if (ext === "mdx" && /^\s*(?:import|export)\s/.test(ruw)) return;
      const kop = /^\s*#{1,6}\s/.test(ruw);
      const tekst = ruw
        .replace(/^\s*#{1,6}\s+/, "")
        .replace(/^\s*(?:[-*+]|\d+[.)])\s+/, "")
        .replace(/^\s*>\s?/, "")
        .replace(/`[^`]*`/g, "")
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/\*\*|__/g, "");
      if (!/\p{L}/u.test(tekst)) return;
      uit.push({ tekst, ruw, regel: i + 1, soort: kop ? "kop" : "proza" });
    });
  } else if (!["css", "scss", "sass", "less"].includes(ext)) {
    const kopRegels = new Set();
    let inKop = false;
    regels.forEach((ruw, i) => {
      if (/<h[1-3][\s>]/.test(ruw)) inKop = true;
      if (inKop) kopRegels.add(i);
      if (/<\/h[1-3]>/.test(ruw)) inKop = false;
      if (/^\s*(?:import|export\s+\*|\/\/|\/?\*)/.test(ruw)) return;

      const gezien = new Set();
      // Stringwaarden: "…", '…' en `…`, binnen één regel.
      for (const m of ruw.matchAll(/(["'`])((?:\\.|(?!\1).){2,})\1/g)) {
        const s = m[2].replace(/\\(.)/g, "$1");
        if (TECHNISCH.test(ruw.slice(0, m.index))) continue;
        if (!/\p{L}{2}/u.test(s) || lijktOpKlassen(s) || lijktOpCode(s)) continue;
        if (!/\s/.test(s) && !engelsLabel(s) && s.length < 4) continue;
        if (!/\s/.test(s) && /^[a-z]+[A-Z]|^[a-z0-9_-]+$/.test(s) && !engelsLabel(s)) continue;
        gezien.add(s);
        const n = woordtelling(s);
        uit.push({
          tekst: s,
          ruw,
          regel: i + 1,
          soort: kopRegels.has(i) ? "kop" : n <= 6 ? "label" : "proza",
        });
      }
      // Tekst tussen tags, en regels die alleen tekst zijn (JSX over meerdere regels).
      const zonderStrings = ruw.replace(/(["'`])(?:\\.|(?!\1).)*\1/g, "");
      const stukken = [
        ...zonderStrings.matchAll(/>\s*([^<>{}]*\p{L}[^<>{}]*?)\s*(?=<|\{|$)/gu),
      ].map((m) => m[1]);
      // Een regel met alleen tekst: JSX-tekst over meerdere regels. Kort mag,
      // als de regel erboven een tag opent (zoals een knop met "Aan de slag").
      const vorige = (regels[i - 1] ?? "").trim();
      if (
        !/[<>{}()=;:,"'`]/.test(zonderStrings) &&
        (woordtelling(zonderStrings) >= 3 ||
          (woordtelling(zonderStrings) >= 1 && /^<[A-Za-z][^>]*>$/.test(vorige)))
      )
        stukken.push(zonderStrings.trim());
      for (const s of stukken) {
        if (gezien.has(s) || lijktOpKlassen(s) || woordtelling(s) === 0) continue;
        const n = woordtelling(s);
        uit.push({
          tekst: s.trim(),
          ruw,
          regel: i + 1,
          soort: kopRegels.has(i) ? "kop" : n <= 6 ? "label" : "proza",
        });
      }
    });
  }

  for (const s of uit) {
    s.nederlands = isNederlands(s.tekst);
    // Citaten en voorbeelden tussen aanhalingstekens laten we met rust: wat
    // iemand gezegd heeft, blijft zoals het gezegd is.
    s.volledig = s.tekst;
    s.tekst = s.tekst.replace(CITAAT, (m) => " ".repeat(m.length));
  }
  return uit;
}

// --- Analyse -----------------------------------------------------------------

const negeer = (regels, i) =>
  /ontslop-negeer(?!-bestand)/.test(regels[i] ?? "") ||
  /ontslop-negeer(?!-bestand)/.test(regels[i - 1] ?? "");

function pastSoort(regel, soort) {
  if (!regel.soort) return true;
  return Array.isArray(regel.soort) ? regel.soort.includes(soort) : regel.soort === soort;
}

// Korte treffers (een streepje, een emoji) krijgen een paar woorden eromheen.
function context(tekst, m) {
  const t = m[0].replace(/^[.!?:,]\s+/u, "");
  if (t.trim().length >= 12) return t;
  const begin = Math.max(0, tekst.lastIndexOf(" ", Math.max(0, m.index - 20)));
  const eind = tekst.indexOf(" ", Math.min(tekst.length, m.index + m[0].length + 20));
  return `${begin > 0 ? "…" : ""}${tekst.slice(begin, eind === -1 ? undefined : eind).trim()}${eind === -1 ? "" : "…"}`;
}

function tekstVondsten(segs, regels) {
  const vondsten = [];
  for (const s of segs) {
    if (regels && negeer(regels, s.regel - 1)) continue;
    // Engelse segmenten slaan we over; korte labels zonder taal tellen mee
    // voor de regels over vorm (emoji, uitroeptekens, hoofdletters).
    if (s.nederlands === false && s.soort === "proza") continue;
    for (const r of TEKSTREGELS) {
      if (!pastSoort(r, s.soort)) continue;
      if (
        s.nederlands === null &&
        r.groep === "taal" &&
        r.id !== "title-case" &&
        r.id !== "notatie-bedrag"
      )
        continue;
      const treffers = r.test
        ? r.test(s.tekst)
        : r.patronen.flatMap((p) => [...s.tekst.matchAll(p)].map((m) => context(s.tekst, m)));
      for (const t of treffers) {
        vondsten.push({
          id: r.id,
          groep: r.groep,
          ernst: r.ernst,
          naam: r.naam,
          uitleg: r.uitleg,
          fix: r.fix,
          regel: s.regel,
          fragment: t.trim().slice(0, 90),
        });
      }
    }
  }
  return vondsten;
}

/** Analyseer losse tekst, zoals een geplakte alinea in de online checker. */
export function analyseerTekst(tekst, { markdown = true } = {}) {
  const segs = segmenten(tekst, markdown ? "md" : "txt");
  const regels = tekst.split(/\r?\n/);
  return sorteer([...tekstVondsten(segs, regels), ...geheleTekstRegels(segs)]);
}

/** Analyseer een bestand: tekstregels op de tekst erin, ontwerpregels op de code. */
export function analyseerBestand(bron, extensie) {
  if (/(?:\/\/|\/\*|<!--|#|\{\/\*)\s*ontslop-negeer-bestand/.test(bron)) return [];
  const ext = extensie.toLowerCase().replace(/^\./, "");
  const regels = bron.split(/\r?\n/);
  const segs = segmenten(bron, ext);
  const nederlands =
    segs.some((s) => s.nederlands) &&
    segs.filter((s) => s.nederlands).length >= segs.filter((s) => s.nederlands === false).length;
  // Een Engels bestand (een README, een component zonder Nederlandse tekst) krijgt
  // geen taal- en tekstregels: die zijn voor Nederlands geschreven.
  const vondsten = nederlands ? [...tekstVondsten(segs, regels), ...geheleTekstRegels(segs)] : [];

  const isCode = !["md", "mdx", "txt", "markdown"].includes(ext);

  if (isCode) {
    if (nederlands) {
      for (const s of segs) {
        if (s.soort === "label" && engelsLabel(s.tekst) && !negeer(regels, s.regel - 1)) {
          vondsten.push({
            id: "engels-label",
            groep: "taal",
            ernst: "midden",
            naam: "Engels label in een Nederlandse interface",
            uitleg: "Een knop of kop in het Engels terwijl de rest Nederlands is.",
            fix: '"Aan de slag", "Meer over …", "Prijzen", "Instellingen", "Plan een gesprek".',
            regel: s.regel,
            fragment: s.tekst,
          });
        }
      }
    }
    regels.forEach((regel, i) => {
      if (negeer(regels, i)) return;
      for (const r of ONTWERPREGELS) {
        if (r.alleenNederlands && !nederlands) continue;
        const treffers = r.test
          ? r.test(regel)
          : r.patronen.flatMap((p) => [...regel.matchAll(p)].map((m) => m[0]));
        for (const t of treffers) {
          vondsten.push({
            id: r.id,
            groep: "ontwerp",
            ernst: r.ernst,
            naam: r.naam,
            uitleg: r.uitleg,
            fix: r.fix,
            regel: i + 1,
            fragment: t.slice(0, 90),
          });
        }
      }
    });

    // Het standaardsjabloon: een gecentreerde hero met daaronder drie kaarten.
    // Een vermoeden, geen zekerheid; daarom laag.
    const h1 = bron.search(/<h1[\s>]/);
    const drie = bron.search(/\b(?:(?:sm|md|lg):)?grid-cols-3\b/);
    if (
      h1 !== -1 &&
      drie > h1 &&
      /\btext-center\b|\bitems-center\b[^"'`]*\bflex-col\b/.test(bron)
    ) {
      const regel = bron.slice(0, drie).split("\n").length;
      if (!negeer(regels, regel - 1))
        vondsten.push({
          id: "standaardsjabloon",
          groep: "ontwerp",
          ernst: "laag",
          naam: "Gecentreerde hero met drie kaarten",
          uitleg:
            "Het sjabloon van bijna elke gegenereerde pagina: kop in het midden, daaronder drie kaarten met een icoon.",
          fix: "Laat de opbouw volgen uit wat het product moet laten zien. Twee of vier dingen, een echt scherm, een lijst: wat er echt is.",
          regel,
          fragment: "<h1> … grid-cols-3",
        });
    }

    // Nepvensterknopjes: rood, geel en groen rondje vlak na elkaar.
    const knopjes =
      /bg-(?:red|rose)-[34]00[\s\S]{0,240}?bg-(?:yellow|amber)-[34]00[\s\S]{0,240}?bg-(?:green|emerald)-[34]00/g;
    for (const m of bron.matchAll(knopjes)) {
      const regel = bron.slice(0, m.index).split("\n").length;
      if (negeer(regels, regel - 1)) continue;
      vondsten.push({
        id: "nepvenster",
        groep: "ontwerp",
        ernst: "laag",
        naam: "Nepvenster met drie knopjes",
        uitleg: "Rood, geel en groen rondje boven een paneel dat niets echts laat zien.",
        fix: "Een echt scherm of een echte toestand van het product.",
        regel,
        fragment: "bg-red … bg-yellow … bg-green",
      });
    }
  }
  return sorteer(dedupliceer(vondsten));
}

function dedupliceer(vondsten) {
  const gezien = new Set();
  return vondsten.filter((v) => {
    const k = `${v.id}|${v.regel}|${v.fragment}`;
    if (gezien.has(k)) return false;
    gezien.add(k);
    return true;
  });
}

function sorteer(vondsten) {
  return vondsten.sort((a, b) => ERNST[b.ernst] - ERNST[a.ernst] || a.regel - b.regel);
}

/** Een eenvoudig cijfer voor de online checker: hoeveel signalen per 100 woorden, gewogen. */
export function score(vondsten, tekst) {
  const woorden = Math.max(1, woordtelling(tekst));
  const gewicht = vondsten.reduce((n, v) => n + ERNST[v.ernst], 0);
  return Math.round((gewicht / woorden) * 1000) / 10;
}
