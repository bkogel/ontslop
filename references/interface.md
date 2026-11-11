<!-- ontslop-negeer-bestand: dit bestand staat vol met voorbeelden van de patronen zelf. -->

# Interfacepatronen

Wat een model kiest als niemand een ontwerpbeslissing nam. Tussen haakjes de
id waarmee de scanner het meldt.

## Eerste orde: het gemiddelde

Iedereen herkent deze inmiddels. Eén ervan is geen probleem; drie op één
pagina wel.

| Patroon | Scanner | In plaats daarvan |
| --- | --- | --- |
| Paars-blauw of blauw-paars verloop | `paars-verloop` | Effen vlak; accent alleen waar het iets betekent |
| Verlooptekst in de kop | `verlooptekst` | Effen tekst in de tekstkleur |
| Gekleurde gloed rond knoppen en kaarten | `gloed` | Diepte uit vlakstappen en dunne randen |
| Pulseren, pingen, stuiteren | `pulseren` | Statisch, of beweging die iets uitlegt |
| Kaart die groeit bij hover | `hover-scale` | Kleine kleurstap bij hover |
| `transition-all` | `transition-all` | Benoem wat beweegt |
| Glas en blur zonder iets erachter | `glas` | Effen verhoogd vlak |
| Sterretjesicoon bij alles met AI | `sterretje-icoon` | Icoon dat de functie uitlegt, of geen |
| Emoji in labels en koppen | `emoji` | Weg, of een lijnicoon uit de bestaande set |
| Effecten uit een bibliotheek (beams, meteoren, spotlight, glinsterknop) | `effectbibliotheek` | Weg, of iets uit het product zelf |
| Getallen die optellen bij scrollen | `optellen` | Het getal, met de bron erbij |
| Koppen in 800 of 900 | `zware-kop` | 400 tot 600; hiërarchie uit maat |
| Nepvenster met rood-geel-groene knopjes | `nepvenster` | Een echt scherm van het product |
| Inter of Geist omdat het de standaard was | `standaardletter` | Een letter die bij het karakter past |
| Afbeeldingen van robots, breinen, hologrammen | `stockbeeld` | Wat het product doet of maakt |
| "Edit with Lovable" en dergelijke | `generator` | Weg uit wat bezoekers zien |

Structureel, niet met een regel te vinden:

- Gecentreerde hero, daaronder drie kaarten met een icoon in een afgerond
  vierkant, daaronder een rij logo's, daaronder drie testimonials,
  daaronder een FAQ, daaronder een footer met vier kolommen.
- `rounded-2xl shadow-lg` op elk vlak, zodat niets meer hoger of lager ligt.
- Untouched shadcn: de standaardknoppen, -kaarten en -tabbladen zonder één
  eigen beslissing.
- Een pijltje achter elke knop.
- Lege, hover- en focustoestanden die ontbreken of niets zeggen.

## Tweede orde: de smaakvolle uitweg

Toen paars verboden werd, kregen modellen nieuwe reflexen. Ze ogen verzorgd.
Daarom zijn ze lastiger te zien, maar een ontwerper ziet ze meteen.

| Cluster | Scanner | Waarom het een standaard is |
| --- | --- | --- |
| Crème met terracotta | `claude-terracotta` | Het palet van Claude zelf, en daarmee van alles wat Claude ontwerpt |
| Bijna-zwart met één zuurgroen accent | `zuurgroen` | De donkere tegenhanger |
| Smaragd als accent | `smaragd` | De volgende kleur na paars |
| Serif in de kop (Instrument Serif, Fraunces, Playfair) | `smaakvolle-letter` | "Redactioneel" als reflex |
| Hoofdletterlabel met brede spatiëring boven elke kop | `hoofdletterlabel` | Het eyebrow-label van elke landingspagina |
| 01, 02, 03 voor dingen zonder volgorde | `volgnummers` | Leent strengheid aan een gewone lijst |
| Eén woord van de kop in een andere kleur of cursief | | Nadruk op het woord dat het model het mooist vond |
| Kleine letters in monospace als bijschrift | | "Technisch" decor |
| Bento-raster van ongelijke kaarten | | Afwisseling zonder reden |

Geen van deze is verboden. Ze worden een probleem als je ze kiest omdat ze
"niet AI" ogen in plaats van om het onderwerp.

## Derde orde: de overcorrectie

Wat een anti-slop-skill aflevert, als hij niet oppast:

- Korrel of ruis over de hele pagina.
- Haarlijnen, sectienummers en paginakoppen als in een tijdschrift, op een
  site die geen tijdschrift is.
- Eén groot "rijk moment" per pagina (een enorm beeld, een animatie) omdat
  een skill zei dat er een moet zijn.
- Asymmetrie als stijl: alles net uit het midden.
- Bewust "lelijke" of brutalistische keuzes zonder aanleiding.
- Koppen in kleine letters.

Toets: zou deze keuze ook op de site van een concurrent passen? Dan komt hij
niet uit het onderwerp.

## Nederlandse interfaces

Het meeste staat in `nederlands.md`. Specifiek voor interfaces:

| Patroon | Scanner |
| --- | --- |
| Engelse knoppen op een Nederlandse site ("Get started", "Learn more") | `engels-label` |
| Hoofdletter Op Elk Woord in menu, knop en kop | `title-case` |
| `lang="en"` op een Nederlandse pagina | `taal-attribuut` |
| Bedragen, datums en tijden in Engelse notatie | `notatie-bedrag`, `notatie-datum`, `notatie-procent` |
| John Doe, Acme, Jan Jansen als voorbeelddata | `placeholder` |
| Je en u door elkaar | `je-en-u` |
| Lange samenstellingen die uit hun knop lopen | |
| Postcodeveld dat "2671CN" weigert | |

## Een richting kiezen

Voordat je iets verandert, kies je waar de interface naartoe gaat. Haal de
richting uit het onderwerp:

1. **Wie gebruikt het, waar, en hoe vaak?** Een planner die er elke ochtend
   om zes uur in werkt, heeft iets anders nodig dan een bezoeker die één keer
   een offerte aanvraagt.
2. **Welk materiaal hoort bij het onderwerp?** Kassen, kratten, papier,
   staal, aarde. Kleur en textuur mogen daaruit komen, niet uit een palet
   van een andere site.
3. **Wat moet in één oogopslag te zien zijn?** Dat krijgt de ruimte, de rest
   wijkt.
4. **Wat is het ene ding dat deze interface eigen maakt?** Een beeld, een
   manier van tonen, een toon in de tekst. Eén is genoeg.

Schrijf de richting op in twee of drie zinnen, met wat je bewust níét doet.
Laat de gebruiker bevestigen voordat je grote dingen verandert.

## Rondes

Herstel in deze volgorde. Elke ronde maakt de volgende makkelijker.

1. **Ruimte.** Eén schaal (4 of 8 px), consequent toegepast. Losse waarden
   als `mt-[13px]` eruit (`losse-px`).
2. **Kleur.** Een neutrale reeks met stappen voor achtergrond, vlak, rand en
   tekst. Eén accent met een taak. Verlopen en gloed eruit.
3. **Letter.** Maximaal twee families. Een maatschaal met duidelijke stappen.
   Gewicht 400 tot 600.
4. **Tekst.** Koppen, knoppen, labels, foutmeldingen, lege toestanden. Zie
   `tekst.md` en `nederlands.md`.
5. **Iconen.** Eén set, één lijndikte. Emoji eruit. Alleen iconen die iets
   uitleggen.
6. **Layout.** Breek het sjabloon (hero, drie kaarten, logo's) waar het
   onderwerp daar reden voor geeft. Niet elke sectie hoeft even breed of
   even hoog.
7. **Details.** Hover, focus, actief, uitgeschakeld, laden, leeg, fout. Dit
   is waar een ontworpen interface zich onderscheidt.
8. **Beeld.** Echte schermen en echte foto's boven illustraties en
   stockbeeld.
9. **Beweging.** Alleen wat iets uitlegt: een paneel dat opent, een lijst
   die bijwerkt. Respecteer `prefers-reduced-motion`.

## Wat blijft

- Functies, routes, data en de volgorde van secties.
- Alle tekst die de gebruiker zelf schreef, tenzij er gevraagd is om die ook
  te verbeteren.
- Merkkleuren en logo. Een merk dat paars is, blijft paars; je haalt alleen
  het verloop en de gloed eraf.
- Toegankelijkheid. Contrast, focusringen, labels en alt-teksten gaan alleen
  vooruit.
