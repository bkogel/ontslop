<!-- ontslop-negeer-bestand: dit bestand staat vol met voorbeelden van de patronen zelf. -->

# Nederlands dat Nederlands is

Modellen schrijven correct Nederlands met een Engels skelet. Dit bestand gaat
over dat skelet: woordvolgorde, spelling, notatie en interfacetaal. Bij twijfel
over spelling is de [Woordenlijst](https://woordenlijst.org) leidend, voor
stijl en notatie [Onze Taal](https://onzetaal.nl/taalloket).

## Je of u

Kies er één en houd die vast, ook in knoppen, foutmeldingen en e-mails.

- **Je** voor de meeste websites, apps, mkb en jongere doelgroepen.
- **U** voor overheid, zorg, notaris, verzekeraar, oudere doelgroepen, of als
  de klant dat zelf al zo doet.

Modellen mengen ze, vooral als de prompt "professioneel" zei: lopende tekst in
je, het contactformulier in u. Gebruik "jij" en "jouw" alleen voor nadruk;
normaal is het "je".

## Samenstellingen: aaneen

De Engelse ziekte. Nederlandse samenstellingen schrijf je als één woord.

| Fout | Goed |
| --- | --- |
| klanten service | klantenservice |
| project manager | projectmanager |
| data analyse | data-analyse |
| e-mail adres | e-mailadres |
| AI oplossing | AI-oplossing |
| CRM systeem | CRM-systeem |
| B2B klanten | B2B-klanten |
| 24 uurs service | 24-uursservice |

**Koppelteken** na een afkorting (AI-model, ERP-koppeling, btw-nummer), tussen
klinkers die anders samensmelten (data-analyse, auto-ongeluk), en bij een
cijfer (3-delig, 2-jarig). Een woord dat al één woord is, blijft dat:
webshop, website, voicemail.

## Woordvolgorde

De persoonsvorm staat in een hoofdzin op de tweede plek, ook als de zin met
iets anders dan het onderwerp begint.

| Engels skelet | Nederlands |
| --- | --- |
| Daarom, we hebben gekozen voor... | Daarom hebben we gekozen voor... |
| Vandaag, we lanceren... | Vandaag lanceren we... |
| Echter, dat werkt niet. | Maar dat werkt niet. / Dat werkt echter niet. |
| Als resultaat, je bespaart tijd. | Zo bespaar je tijd. |

In een bijzin gaan de werkwoorden naar achteren: "omdat we de koppeling
volgende week opleveren", niet "omdat we leveren de koppeling op".

## Hoofdletters

- Koppen, knoppen, menu's en tabbladen: alleen het eerste woord en
  eigennamen. "Onze diensten", niet "Onze Diensten".
- Dagen en maanden: klein. "maandag 3 november". Talen wel met hoofdletter:
  "in het Nederlands".
- Na een dubbele punt: klein, tenzij er een volledige zin of citaat volgt.
- Afkortingen: btw, cao, mkb, zzp'er en tv zijn klein. AVG, KvK, ERP, CRM
  en API groot.

## Leestekens

- Geen komma voor "en" in een opsomming: "Priva, Hoogendoorn en Ridder".
- Wel een komma tussen twee hoofdzinnen met elk een eigen onderwerp, als dat
  de leesbaarheid helpt: "De koppeling draait, en de voorraad klopt weer."
- Aanhalingstekens: "zo" of 'zo'. Beide mag; wees consequent.
- Geen gedachtestreepje waar een komma, dubbele punt of punt volstaat.
- Geen spatie voor een dubbele punt of een vraagteken. Bij het procentteken
  zijn 12% en 12 % allebei gangbaar; kies er één.

## Getallen, geld, datum en tijd

| Wat | Engels | Nederlands |
| --- | --- | --- |
| Duizendtal | 48,210 | 48.210 |
| Decimaal | 12.5% | 12,5% |
| Bedrag | €1,250.50 of $1250 | € 1.250,50 |
| Rond bedrag | €49.00 | € 49 of € 49,- |
| Datum in tekst | Nov 3, 2026 | 3 november 2026 |
| Datum in tabel | 11/03/2026 | 03-11-2026 |
| Tijd | 2:30 PM | 14:30 |
| Telefoon | +31 (0)6-12345678 | 06-12345678 of +31 6 12345678 |
| Postcode | 2671CN | 2671 CN |

Het euroteken mag vast aan het bedrag of met een spatie. Kies één vorm per
site. Gebruik voor geld in code `Intl.NumberFormat("nl-NL", { style:
"currency", currency: "EUR" })` en voor datums `toLocaleDateString("nl-NL")`.

## Anglicismen

Niet elk Engels woord is fout. Veel zijn gewoon Nederlands geworden. De vraag
is of een Nederlander het zo zegt.

| Laat staan | Liever Nederlands | Echt Engels in een Nederlandse zin |
| --- | --- | --- |
| software, e-mail, website | inzichten (insights) | "dit maakt sense" |
| dashboard, deadline, team | aan de slag (get started) | "op dezelfde pagina zitten" |
| webshop, app, update | meer weten (learn more) | "impact maken" |
| marketing, feedback | instellingen (settings) | "een deep dive doen" |
| download, link, login (als zelfstandig naamwoord) | gebruiksvoorbeelden (use cases) | "next level" |

Het verschil tussen de eerste en de derde kolom: de eerste woorden zijn in de
Woordenlijst opgenomen, de derde zijn Engelse constructies met Nederlandse
woorden.

## Lange samenstellingen

Nederlands maakt lange woorden: "arbeidsongeschiktheidsverzekering",
"klanttevredenheidsonderzoek". In smalle interfaces lopen die uit hun kader.

- Zet `lang="nl"` op de pagina en `hyphens: auto` op lopende tekst, zodat de
  browser Nederlands afbreekt.
- Plaats in knoppen en kaarttitels een `&shy;` op een logische plek, of kies
  een korter woord.
- Test de interface met de langste echte waarde, niet met "Product".

## Knoppen en interfacetaal

| Engels of vertaald | Nederlands |
| --- | --- |
| Get started / Aan de slag gaan | Aan de slag, Begin, Probeer het |
| Learn more / Leer meer | Meer over [onderwerp] |
| Submit / Indienen | Versturen, Opslaan, Aanvragen |
| Sign up / Aanmelden | Account maken, Aanmelden |
| Book a demo | Plan een gesprek, Vraag een demo aan |
| Settings | Instellingen |
| Pricing | Prijzen, Tarieven |
| Contact us | Neem contact op, Bel of mail ons |
| Something went wrong! | Dat lukte niet. [Wat je nu kunt doen.] |
| Success! 🎉 | Opgeslagen. / Factuur verstuurd. |

Een knop zegt wat er gebeurt als je erop drukt, met een werkwoord. "Versturen"
is beter dan "Verder" als er iets verstuurd wordt.

Foutmeldingen: zeg wat er misging en wat de gebruiker nu kan doen. Geen
excuses, geen grapjes, geen uitroepteken.

## Voorbeelddata

Modellen vullen interfaces met John Doe, Acme Inc. en 123 Main Street. Of, in
het Nederlands, met Jan Jansen en Piet Puk: herkenbaar als nep.

Gebruik geloofwaardige, gevarieerde data die niet van een echte klant is:

- Namen: Sanne de Wit, Mehmet Yıldız, Lotte van der Berg, Kees Verhoef,
  Priya Ramdin, Daan Bakker.
- Bedrijven: Kwekerij Den Hoorn, Fruithandel Van Rijn, Groentehal Noord,
  Bloemsierkunst Lisse.
- Adressen: Dorpsstraat 14, 2671 CN Naaldwijk. Kies bestaande straatnamen
  in een echte plaats, met een huisnummer dat er niet toe doet.
- Bedragen en datums in Nederlandse notatie, en niet allemaal rond.

## De pagina zelf

- `<html lang="nl">` (of `nl-NL`). Anders leest een schermlezer met een
  Engelse stem en breekt de browser verkeerd af.
- `<meta property="og:locale" content="nl_NL">`.
- Formulieren: `autocomplete="postal-code"`, `inputmode="numeric"` voor
  postcode en telefoon, en accepteer "2671CN" én "2671 CN".
- Valuta en datum via `Intl` met `nl-NL`, niet zelf geformatteerd.
