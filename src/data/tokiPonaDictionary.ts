import { TokiPonaWord } from '../types/index.ts';

export const TOKI_PONA_DICTIONARY: TokiPonaWord[] = [
  {
    word: 'a',
    category: 'citoslovce',
    topicCategory: 'emoce',
    translationCz: 'ach, haha, ó (vyjádření citu)',
    definition: 'Citoslovce pro vyjádření překvapení, radosti, údivu, souhlasu či potvrzení.',
    examples: [
      { tp: 'pona a!', cz: 'Opravdu skvělé!' },
      { tp: 'a, mi sona.', cz: 'Á, už rozumím.' }
    ],
    sitelenPonaSymbol: '󱤀'
  },
  {
    word: 'akesi',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'plaz, ještěrka, obojživelník, had',
    definition: 'Ne-chlupaté zvíře, ještěrka, had, žába, krokodýl nebo obluda.',
    examples: [
      { tp: 'akesi li moku e pipi.', cz: 'Ještěrka jí hmyz.' }
    ],
    sitelenPonaSymbol: '󱤁'
  },
  {
    word: 'ala',
    category: 'přídavné jméno',
    topicCategory: 'zaklad',
    translationCz: 'ne, žádný, nula, prázdnota',
    definition: 'Zápor, negace, nicota. Používá se také pro tvoření otázek (forma: sloveso ala sloveso).',
    examples: [
      { tp: 'mi moku ala.', cz: 'Nejím.' },
      { tp: 'sina sona ala sona?', cz: 'Víš to, nebo nevíš? (Rozumíš?)' },
      { tp: 'jan ala li lon.', cz: 'Nikdo tu není.' }
    ],
    sitelenPonaSymbol: '󱤂'
  },
  {
    word: 'alasa',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'lovit, hledat, sbírat, snažit se',
    definition: 'Lovit zvěř, shánět, vyhledávat nebo se pokoušet o něco.',
    examples: [
      { tp: 'mi alasa e moku.', cz: 'Hledám / lovím jídlo.' },
      { tp: 'mi alasa toki.', cz: 'Zkouším mluvit.' }
    ],
    sitelenPonaSymbol: '󱤃'
  },
  {
    word: 'ale',
    category: 'přídavné jméno',
    topicCategory: 'filosofie',
    translationCz: 'všechno, všichni, celý, 100, život',
    definition: 'Všechen, každý, vesmír, veškerenstvo, hojnost. (Alternativní pravopis: ali).',
    examples: [
      { tp: 'ale li pona.', cz: 'Všechno je v pořádku / dobré.' },
      { tp: 'jan ale li wile e pona.', cz: 'Všichni lidé chtějí dobro.' }
    ],
    sitelenPonaSymbol: '󱤄'
  },
  {
    word: 'anpa',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'dole, nízký, skloněný, pokorný',
    definition: 'Spodní část, podlaha, ležící na zemi, pokořený.',
    examples: [
      { tp: 'tomo li anpa sewi.', cz: 'Dům je pod nebem.' },
      { tp: 'o anpa e sina.', cz: 'Sklon se / buď pokorný.' }
    ],
    sitelenPonaSymbol: '󱤅'
  },
  {
    word: 'ante',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'jiný, odlišný, změna, změnit',
    definition: 'Jiný, rozdílný, modifikovat, cizí.',
    examples: [
      { tp: 'ni li ante.', cz: 'Tohle je jiné / odlišné.' },
      { tp: 'ante li kama.', cz: 'Přichází změna.' }
    ],
    sitelenPonaSymbol: '󱤆'
  },
  {
    word: 'anu',
    category: 'částice',
    topicCategory: 'zaklad',
    translationCz: 'nebo, anebo',
    definition: 'Spojka vyjadřující volbu či alternativu.',
    examples: [
      { tp: 'sina wile e telo anu kili?', cz: 'Chceš vodu, nebo ovoce?' }
    ],
    sitelenPonaSymbol: '󱤇'
  },
  {
    word: 'awen',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'zůstat, čekat, chránit, trvalý',
    definition: 'Zůstávat na místě, setrvat, čekat, pokračovat v činnosti.',
    examples: [
      { tp: 'o awen lon ni.', cz: 'Zůstaň tady.' },
      { tp: 'mi awen pali.', cz: 'Stále pracuji.' }
    ],
    sitelenPonaSymbol: '󱤈'
  },
  {
    word: 'e',
    category: 'částice',
    topicCategory: 'zaklad',
    translationCz: 'předmětová částice (uvádí přímý předmět)',
    definition: 'Základní gramatická částice, která uvádí přímý předmět slovesa (akuzativ).',
    examples: [
      { tp: 'mi moku e kili.', cz: 'Jím ovoce. (moku = jíst, e kili = ovoce)' },
      { tp: 'ona li lukin e tomo.', cz: 'On vidí dům.' }
    ],
    sitelenPonaSymbol: '󱤉'
  },
  {
    word: 'en',
    category: 'částice',
    topicCategory: 'zaklad',
    translationCz: 'a, i (POUZE mezi podměty)',
    definition: 'Spojka "a", používá se výhradně pro spojení více podmětů před částicí li.',
    examples: [
      { tp: 'mi en sina li jan.', cz: 'Já i ty jsme lidé.' },
      { tp: 'soweli en waso li musi.', cz: 'Zvíře a pták si hrají.' }
    ],
    sitelenPonaSymbol: '󱤊'
  },
  {
    word: 'esun',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'trh, obchod, nakupovat, platit',
    definition: 'Obchodní místo, trh, nákup, prodej, směna zboží.',
    examples: [
      { tp: 'mi tawa esun.', cz: 'Jdu na trh / do obchodu.' },
      { tp: 'esun kili', cz: 'trh s ovocem' }
    ],
    sitelenPonaSymbol: '󱤋'
  },
  {
    word: 'ijo',
    category: 'podstatné jméno',
    topicCategory: 'filosofie',
    translationCz: 'věc, předmět, entita, cokoli',
    definition: 'Fyzická věc, záležitost, objekt, téma.',
    examples: [
      { tp: 'ni li ijo seme?', cz: 'Co je tohle za věc?' },
      { tp: 'ijo suli li lon.', cz: 'Děje se velká věc.' }
    ],
    sitelenPonaSymbol: '󱤌'
  },
  {
    word: 'ike',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'špatný, zlý, těžký, negativní, chyba',
    definition: 'Opak pona. Špatný, nefunkční, nepříjemný, škodlivý, nemocný.',
    examples: [
      { tp: 'ni li ike.', cz: 'Tohle je špatné.' },
      { tp: 'pali ike', cz: 'těžká nebo zlá práce' }
    ],
    sitelenPonaSymbol: '󱤍'
  },
  {
    word: 'ilo',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'nástroj, přístroj, pomůcka, stroj',
    definition: 'Zařízení, nástroj, telefon, počítač, lžíce, zbraň (dle kontextu).',
    examples: [
      { tp: 'ilo toki', cz: 'telefon (nástroj mluvení)' },
      { tp: 'ilo nanpa', cz: 'kalkulačka / počítač' }
    ],
    sitelenPonaSymbol: '󱤎'
  },
  {
    word: 'insa',
    category: 'podstatné jméno',
    topicCategory: 'popis',
    translationCz: 'vnitřek, žaludek, střed, nitro',
    definition: 'Vnitřní prostor, střed, orgány, obsah.',
    examples: [
      { tp: 'insa tomo', cz: 'vnitřek domu / v domě' },
      { tp: 'insa mi li pilin ike.', cz: 'Můj žaludek se cítí špatně.' }
    ],
    sitelenPonaSymbol: '󱤏'
  },
  {
    word: 'jaki',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'špinavý, nechutný, hnus, znečistit',
    definition: 'Špína, nečistý, toxický, odporný.',
    examples: [
      { tp: 'telo jaki', cz: 'špinavá voda' },
      { tp: 'o jaki ala e ma.', cz: 'Neznečišťuj zemi / přírodu.' }
    ],
    sitelenPonaSymbol: '󱤐'
  },
  {
    word: 'jan',
    category: 'podstatné jméno',
    topicCategory: 'lide',
    translationCz: 'člověk, osoba, lidstvo, někdo',
    definition: 'Lidská bytost, kdokoliv, přítel, lidé.',
    examples: [
      { tp: 'jan pona', cz: 'přítel (dobrý člověk)' },
      { tp: 'jan pi toki pona', cz: 'mluvčí jazyka Toki Pona' },
      { tp: 'jan utala', cz: 'voják / bojovník' }
    ],
    sitelenPonaSymbol: '󱤑'
  },
  {
    word: 'jelo',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'žlutý, světle zelený',
    definition: 'Žlutá barva, sluneční barva.',
    examples: [
      { tp: 'suno jelo', cz: 'žluté slunce' },
      { tp: 'kili jelo', cz: 'banán / citrón (žluté ovoce)' }
    ],
    sitelenPonaSymbol: '󱤒'
  },
  {
    word: 'jo',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'mít, vlastnit, držet, obsahovat',
    definition: 'Mít u sebe, vlastnit, držet v ruce.',
    examples: [
      { tp: 'mi jo e lipu.', cz: 'Mám knihu / papír.' },
      { tp: 'sina jo e mani ala.', cz: 'Nemáš peníze.' }
    ],
    sitelenPonaSymbol: '󱤓'
  },
  {
    word: 'kala',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'ryba, mořský tvor',
    definition: 'Ryba, vodní zvíře, žralok, velryba.',
    examples: [
      { tp: 'kala li tawa lon telo.', cz: 'Ryba plave ve vodě.' }
    ],
    sitelenPonaSymbol: '󱤔'
  },
  {
    word: 'kalama',
    category: 'podstatné jméno',
    topicCategory: 'emoce',
    translationCz: 'zvuk, hlas, hluk, hudba, znít',
    definition: 'Hluk, zvukový signál, hudba, zpěv.',
    examples: [
      { tp: 'kalama musi', cz: 'hudba (zábavný zvuk)' },
      { tp: 'o kalama ala.', cz: 'Nebuď hlučný / mlč.' }
    ],
    sitelenPonaSymbol: '󱤕'
  },
  {
    word: 'kama',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'přijít, stát se, budoucí, příchod',
    definition: 'Přicházet, stávat se (pomocné sloveso pro budoucí čas či proměnu).',
    examples: [
      { tp: 'kama pona!', cz: 'Vítej! (příchod dobrý)' },
      { tp: 'mi kama sona.', cz: 'Začínám vědět / učím se.' },
      { tp: 'tenpo kama', cz: 'budoucnost (čas příchozí)' }
    ],
    sitelenPonaSymbol: '󱤖'
  },
  {
    word: 'kasi',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'rostlina, strom, tráva, list',
    definition: 'Jakákoli vegetace, bylina, lesní strom, květina.',
    examples: [
      { tp: 'kasi kule', cz: 'barevná květina' },
      { tp: 'kasi suli', cz: 'velký strom' }
    ],
    sitelenPonaSymbol: '󱤗'
  },
  {
    word: 'ken',
    category: 'sloveso',
    topicCategory: 'zaklad',
    translationCz: 'moci, smět, možnost, možná',
    definition: 'Mít schopnost nebo dovolení, schopnost, šance.',
    examples: [
      { tp: 'mi ken lape.', cz: 'Mohu spát.' },
      { tp: 'ken la ona li kama.', cz: 'Možná přijde.' }
    ],
    sitelenPonaSymbol: '󱤘'
  },
  {
    word: 'kepeken',
    category: 'předložka',
    topicCategory: 'akce',
    translationCz: 'používat, pomocí, s (nástrojem)',
    definition: 'Použití nástroje, instrumentál ("pomocí čeho").',
    examples: [
      { tp: 'mi moku kepeken ilo.', cz: 'Jím pomocí příboru.' },
      { tp: 'mi toki kepeken toki pona.', cz: 'Mluvím pomocí toki pona.' }
    ],
    sitelenPonaSymbol: '󱤙'
  },
  {
    word: 'kili',
    category: 'podstatné jméno',
    topicCategory: 'jidlo',
    translationCz: 'ovoce, zelenina, plod, houba',
    definition: 'Plod rostliny, jablko, mrkev, bobule, houba.',
    examples: [
      { tp: 'kili suwi', cz: 'sladké ovoce' },
      { tp: 'mi moku e kili.', cz: 'Jím zeleninu / ovoce.' }
    ],
    sitelenPonaSymbol: '󱤚'
  },
  {
    word: 'kiwen',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'kámen, skála, kov, tvrdý',
    definition: 'Tvrdý pevný materiál, minerál, led, ocel.',
    examples: [
      { tp: 'kiwen mani', cz: 'drahokam / mince' },
      { tp: 'kiwen li suli.', cz: 'Skála je obrovská.' }
    ],
    sitelenPonaSymbol: '󱤛'
  },
  {
    word: 'ko',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'hlína, pasta, písek, prášek',
    definition: 'Polotuhá hmota, krém, jíl, bahno, mouka.',
    examples: [
      { tp: 'ko jakeli', cz: 'bahno' },
      { tp: 'ko suwi', cz: 'cukr / medová pasta' }
    ],
    sitelenPonaSymbol: '󱤜'
  },
  {
    word: 'kon',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'vzduch, dech, duch, vítr, neviditelný',
    definition: 'Atmosféra, plyn, duše, esence, neviditelné.',
    examples: [
      { tp: 'kon sewi', cz: 'posvátný duch / nebeský vánek' },
      { tp: 'kon tawa', cz: 'vítr (pohybující se vzduch)' }
    ],
    sitelenPonaSymbol: '󱤝'
  },
  {
    word: 'kule',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'barva, barevný, malovat, pestrý',
    definition: 'Vizuální spektrum, odstín, malování.',
    examples: [
      { tp: 'kule loje', cz: 'červená barva' },
      { tp: 'sitelen kule', cz: 'barevný obraz' }
    ],
    sitelenPonaSymbol: '󱤞'
  },
  {
    word: 'kulupu',
    category: 'podstatné jméno',
    topicCategory: 'lide',
    translationCz: 'skupina, komunita, společnost, kmen',
    definition: 'Společenství, shromáždění, národ, klub.',
    examples: [
      { tp: 'kulupu jan', cz: 'lidská společnost / rodina / komunita' },
      { tp: 'kulupu pi toki pona', cz: 'komunita mluvících Toki Pona' }
    ],
    sitelenPonaSymbol: '󱤟'
  },
  {
    word: 'kute',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'slyšet, poslouchat, ucho, poslouchat (poslouchat radu)',
    definition: 'Sluchový vjem, naslouchat hudbě či lidem.',
    examples: [
      { tp: 'mi kute e kalama.', cz: 'Slyším zvuk.' },
      { tp: 'o kute e mi!', cz: 'Poslouchej mě!' }
    ],
    sitelenPonaSymbol: '󱤠'
  },
  {
    word: 'la',
    category: 'částice',
    topicCategory: 'zaklad',
    translationCz: 'kontextová částice (když, jestliže, v případě)',
    definition: 'Klíčová částice oddělující kontext, podmínku nebo čas od hlavní věty.',
    examples: [
      { tp: 'tenpo suno la mi pali.', cz: 'Ve dne pracuji.' },
      { tp: 'sina wile la mi pana.', cz: 'Pokud chceš, dám ti to.' }
    ],
    sitelenPonaSymbol: '󱤡'
  },
  {
    word: 'lape',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'spát, odpočívat, spánek',
    definition: 'Spánek, ležet v klidu, snění.',
    examples: [
      { tp: 'lape pona!', cz: 'Dobrou noc! / Sladké sny!' },
      { tp: 'jan li lape lon supa.', cz: 'Člověk spí na posteli.' }
    ],
    sitelenPonaSymbol: '󱤢'
  },
  {
    word: 'laso',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'modrý, zelený (barva oblohy a rostlin)',
    definition: 'Modrá nebo zelená barva (studené barvy přírody).',
    examples: [
      { tp: 'telo laso', cz: 'modrá voda' },
      { tp: 'kasi laso', cz: 'zelená rostlina' }
    ],
    sitelenPonaSymbol: '󱤣'
  },
  {
    word: 'lawa',
    category: 'podstatné jméno',
    topicCategory: 'lide',
    translationCz: 'hlava, mysl, vést, vůdce, pravidlo',
    definition: 'Mozek, řídit, vládce, zákon, hlavní myšlenka.',
    examples: [
      { tp: 'lawa mi li pakala.', cz: 'Bolí mě hlava.' },
      { tp: 'jan lawa', cz: 'vůdce / prezident / šéf' }
    ],
    sitelenPonaSymbol: '󱤤'
  },
  {
    word: 'len',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'oblečení, látka, zakrýt, soukromí',
    definition: 'Šaty, deka, textil, skrýš.',
    examples: [
      { tp: 'len pi kalama ala', cz: 'tichý oděv' },
      { tp: 'o len e sina.', cz: 'Obleč se / zakryj se.' }
    ],
    sitelenPonaSymbol: '󱤥'
  },
  {
    word: 'lete',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'studený, chladný, mrazivý, zima',
    definition: 'Nízká teplota, ledový, ochladit.',
    examples: [
      { tp: 'telo lete', cz: 'studená voda' },
      { tp: 'mi pilin lete.', cz: 'Je mi zima.' }
    ],
    sitelenPonaSymbol: '󱤦'
  },
  {
    word: 'li',
    category: 'částice',
    topicCategory: 'zaklad',
    translationCz: 'predikátová částice (odděluje podmět od přísudku)',
    definition: 'Základní gramatická částice. Používá se VŽDY, kromě případů, kdy je podmětem samotné "mi" nebo "sina".',
    examples: [
      { tp: 'soweli li lape.', cz: 'Zvíře spí.' },
      { tp: 'mi lape. (bez li!)', cz: 'Spím. (při mi / sina se li nepíše)' },
      { tp: 'jan mute li toki.', cz: 'Mnoho lidí mluví.' }
    ],
    sitelenPonaSymbol: '󱤧'
  },
  {
    word: 'lili',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'malý, krátký, mladý, málo, kousek',
    definition: 'Drobný, nepatrný, nedospělý dítě, chvilka.',
    examples: [
      { tp: 'jan lili', cz: 'dítě / malý člověk' },
      { tp: 'tenpo lili', cz: 'chvilka / krátký čas' }
    ],
    sitelenPonaSymbol: '󱤨'
  },
  {
    word: 'linja',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'čára, provázek, vlasy, kabel',
    definition: 'Dlouhý tenký ohebný objekt, provaz, řada, vlas.',
    examples: [
      { tp: 'linja lawa', cz: 'vlasy (na hlavě)' },
      { tp: 'linja ilo', cz: 'kabel / drát' }
    ],
    sitelenPonaSymbol: '󱤩'
  },
  {
    word: 'lipu',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'kniha, dokument, listina, web, stránka',
    definition: 'Plochý tenký předmět určený k záznamu, papír, lístek, článek.',
    examples: [
      { tp: 'lipu soni', cz: 'učebnice' },
      { tp: 'lipu ni', cz: 'tento dokument / tato webová stránka' }
    ],
    sitelenPonaSymbol: '󱤪'
  },
  {
    word: 'loje',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'červený, rudý',
    definition: 'Červená barva, barva krve a ohně.',
    examples: [
      { tp: 'telo loje', cz: 'krev (červená tekutina)' },
      { tp: 'kili loje', cz: 'rajče / jablko / jahoda' }
    ],
    sitelenPonaSymbol: '󱤫'
  },
  {
    word: 'lon',
    category: 'předložka',
    topicCategory: 'zaklad',
    translationCz: 'být v/na, existovat, skutečný, ano',
    definition: 'Přítomnost, lokace (v, na, u), existovat, pravdivý.',
    examples: [
      { tp: 'mi lon tomo.', cz: 'Jsem v domě.' },
      { tp: 'sewi li lon.', cz: 'Bůh / nebe existuje.' },
      { tp: 'lon a!', cz: 'Přesně tak! Skutečně!' }
    ],
    sitelenPonaSymbol: '󱤬'
  },
  {
    word: 'luka',
    category: 'podstatné jméno',
    topicCategory: 'lide',
    translationCz: 'ruka, paže, pět (5)',
    definition: 'Přední končetina, dlaň, také číslovka 5 v tradičním počítání.',
    examples: [
      { tp: 'luka mi', cz: 'moje ruka' },
      { tp: 'pali kepeken luka', cz: 'ruční práce' }
    ],
    sitelenPonaSymbol: '󱤭'
  },
  {
    word: 'lukin',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'vidět, dívat se, číst, oko, zkoušet',
    definition: 'Zrakové vnímání, hledět, prohlížet si. Jako pomocné sloveso: zkoušet něco dělat.',
    examples: [
      { tp: 'mi lukin e lipu.', cz: 'Čtu knihu / dívám se na dokument.' },
      { tp: 'o lukin!', cz: 'Podívej se!' }
    ],
    sitelenPonaSymbol: '󱤮'
  },
  {
    word: 'lupa',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'díra, dveře, okno, otvor, vchod',
    definition: 'Průchod, brána, otvor, jeskyně.',
    examples: [
      { tp: 'lupa tomo', cz: 'dveře nebo okno domu' },
      { tp: 'lupa meli', cz: 'jeskyně / otvor' }
    ],
    sitelenPonaSymbol: '󱤯'
  },
  {
    word: 'ma',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'země, krajina, půda, stát, svět',
    definition: 'Venkov, pevnina, území, příroda, planeta.',
    examples: [
      { tp: 'ma Cesko', cz: 'Česko (Česká republika)' },
      { tp: 'ma tomo', cz: 'město (krajina plná domů)' },
      { tp: 'ma kasi', cz: 'les / prales' }
    ],
    sitelenPonaSymbol: '󱤰'
  },
  {
    word: 'mama',
    category: 'podstatné jméno',
    topicCategory: 'lide',
    translationCz: 'rodič, matka, otec, stvořitel, péče',
    definition: 'Předek, pečovatel, zploditel.',
    examples: [
      { tp: 'mama mije', cz: 'otec' },
      { tp: 'mama meli', cz: 'matka' }
    ],
    sitelenPonaSymbol: '󱤱'
  },
  {
    word: 'mani',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'peníze, měna, bohatství, cennost',
    definition: 'Platidlo, mince, bankovky, zlato.',
    examples: [
      { tp: 'mani mute', cz: 'mnoho peněz / bohatství' },
      { tp: 'mi jo ala e mani.', cz: 'Nemám peníze.' }
    ],
    sitelenPonaSymbol: '󱤲'
  },
  {
    word: 'meli',
    category: 'podstatné jméno',
    topicCategory: 'lide',
    translationCz: 'žena, samice, ženský, manželka',
    definition: 'Ženská bytost, dívka, samička.',
    examples: [
      { tp: 'meli pona', cz: 'dobrá žena / přítelkyně' },
      { tp: 'soweli meli', cz: 'samice savce' }
    ],
    sitelenPonaSymbol: '󱤳'
  },
  {
    word: 'mi',
    category: 'zájmeno',
    topicCategory: 'zaklad',
    translationCz: 'já, mě, můj, my, náš',
    definition: 'První osoba jednotného i množného čísla. Pokud je samostatným podmětem, nenásleduje částice li!',
    examples: [
      { tp: 'mi toki.', cz: 'Mluvím. (nikoliv mi li toki)' },
      { tp: 'kili mi', cz: 'moje ovoce' }
    ],
    sitelenPonaSymbol: '󱤴'
  },
  {
    word: 'mije',
    category: 'podstatné jméno',
    topicCategory: 'lide',
    translationCz: 'muž, samec, mužský, manžel',
    definition: 'Mužská bytost, chlapec, pan.',
    examples: [
      { tp: 'mije lili', cz: 'chlapec' },
      { tp: 'jan mije', cz: 'muž' }
    ],
    sitelenPonaSymbol: '󱤵'
  },
  {
    word: 'moku',
    category: 'sloveso',
    topicCategory: 'jidlo',
    translationCz: 'jíst, pít, jídlo, pokrm, polykat',
    definition: 'Stravování, jakékoli jídlo či nápoj, konzumace.',
    examples: [
      { tp: 'moku li pona!', cz: 'Jídlo je vynikající!' },
      { tp: 'mi moku e telo.', cz: 'Piji vodu.' }
    ],
    sitelenPonaSymbol: '󱤶'
  },
  {
    word: 'moli',
    category: 'podstatné jméno',
    topicCategory: 'filosofie',
    translationCz: 'smrt, mrtvý, zemřít, zabít',
    definition: 'Konec života, zabíjení, zánik.',
    examples: [
      { tp: 'ona li moli.', cz: 'On/ona zemřel(a).' },
      { tp: 'jan moli', cz: 'mrtvý člověk' }
    ],
    sitelenPonaSymbol: '󱤷'
  },
  {
    word: 'monsi',
    category: 'podstatné jméno',
    topicCategory: 'popis',
    translationCz: 'záda, vzadu, za, zadní část',
    definition: 'Zadní strana, pozadí, reverz.',
    examples: [
      { tp: 'monsi tomo', cz: 'za domem' },
      { tp: 'lukin monsi', cz: 'ohlédnout se zpět' }
    ],
    sitelenPonaSymbol: '󱤸'
  },
  {
    word: 'mu',
    category: 'citoslovce',
    topicCategory: 'priroda',
    translationCz: 'zvuk zvířete (bú, mňau, haf, píp)',
    definition: 'Univerzální zvířecí zvuk.',
    examples: [
      { tp: 'soweli li mu.', cz: 'Zvíře dělá zvuky (štěká / mňouká).' }
    ],
    sitelenPonaSymbol: '󱤹'
  },
  {
    word: 'mun',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'měsíc, hvězda, noční těleso',
    definition: 'Měsíc na obloze, hvězdy, noční záře.',
    examples: [
      { tp: 'mun li suno lon pimeja.', cz: 'Měsíc svítí ve tmě.' }
    ],
    sitelenPonaSymbol: '󱤺'
  },
  {
    word: 'musi',
    category: 'přídavné jméno',
    topicCategory: 'emoce',
    translationCz: 'zábava, hra, umění, vtipný, hrát si',
    definition: 'Zábavný, relaxace, radostná činnost, komedie.',
    examples: [
      { tp: 'ni li musi mute!', cz: 'Tohle je velká legrace!' },
      { tp: 'jan musi', cz: 'umělec / klaun / bavič' }
    ],
    sitelenPonaSymbol: '󱤻'
  },
  {
    word: 'mute',
    category: 'přídavné jméno',
    topicCategory: 'zaklad',
    translationCz: 'mnoho, hodně, několik, dvacet (20)',
    definition: 'Velké množství, dav, kvantita.',
    examples: [
      { tp: 'pona mute!', cz: 'Děkuji mnohokrát! / Velmi dobré!' },
      { tp: 'jan mute li toki.', cz: 'Mnoho lidí diskutuje.' }
    ],
    sitelenPonaSymbol: '󱤼'
  },
  {
    word: 'nanpa',
    category: 'podstatné jméno',
    topicCategory: 'zaklad',
    translationCz: 'číslo, pořadí (první, druhý...)',
    definition: 'Číslovka, digitální hodnota, označení pořadí.',
    examples: [
      { tp: 'nanpa wan', cz: 'číslo jedna / první' },
      { tp: 'nanpa tu', cz: 'druhý' }
    ],
    sitelenPonaSymbol: '󱤽'
  },
  {
    word: 'nasa',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'bláznivý, divný, opilý, neobvyklý',
    definition: 'Zvláštní, šílený, nepředvídatelný, pod vlivem.',
    examples: [
      { tp: 'jan nasa', cz: 'podivín / blázen' },
      { tp: 'telo nasa', cz: 'alkohol (divná tekutina)' }
    ],
    sitelenPonaSymbol: '󱤾'
  },
  {
    word: 'nasin',
    category: 'podstatné jméno',
    topicCategory: 'filosofie',
    translationCz: 'cesta, směr, způsob, metoda, filosofie',
    definition: 'Ulička, stezka, systém, Tao, životní princip.',
    examples: [
      { tp: 'nasin sewi', cz: 'náboženství / duchovní cesta' },
      { tp: 'nasin pona', cz: 'správná cesta / dobrý způsob' }
    ],
    sitelenPonaSymbol: '󱤿'
  },
  {
    word: 'nena',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'kopec, hora, nos, knoflík, výčnělek',
    definition: 'Vyvýšenina, vrcholek, výstupek na těle či předmětu.',
    examples: [
      { tp: 'nena ma', cz: 'hora / kopec v krajině' },
      { tp: 'nena sinpin', cz: 'nos' }
    ],
    sitelenPonaSymbol: '󱥀'
  },
  {
    word: 'ni',
    category: 'zájmeno',
    topicCategory: 'zaklad',
    translationCz: 'tento, tato, toto, to, ten',
    definition: 'Ukazovací zájmeno, odkaz na to, co bylo nebo bude řečeno.',
    examples: [
      { tp: 'ni li pona.', cz: 'Tohle je fajn.' },
      { tp: 'jan ni li pona.', cz: 'Tento člověk je milý.' }
    ],
    sitelenPonaSymbol: '󱥁'
  },
  {
    word: 'nimi',
    category: 'podstatné jméno',
    topicCategory: 'zaklad',
    translationCz: 'slovo, jméno, název',
    definition: 'Jméno osoby či věci, lexikální výraz.',
    examples: [
      { tp: 'nimi sina li seme?', cz: 'Jak se jmenuješ? (Jaké je tvé jméno?)' },
      { tp: 'nimi mi li Jan.', cz: 'Mé jméno je Jan.' }
    ],
    sitelenPonaSymbol: '󱥂'
  },
  {
    word: 'noka',
    category: 'podstatné jméno',
    topicCategory: 'lide',
    translationCz: 'noha, chodidlo, spodní část, kořen',
    definition: 'Dolní končetina, chůze, základna.',
    examples: [
      { tp: 'tawa noka', cz: 'jít pěšky' },
      { tp: 'noka kasi', cz: 'kořen stromu' }
    ],
    sitelenPonaSymbol: '󱥃'
  },
  {
    word: 'o',
    category: 'částice',
    topicCategory: 'zaklad',
    translationCz: 'oslovení, rozkaz, přání (hej!, ať...)',
    definition: 'Vokativ a imperativ. Uvádí rozkazy, přání a oslovení osob.',
    examples: [
      { tp: 'jan Jan o!', cz: 'Jane! (oslovení)' },
      { tp: 'o moku!', cz: 'Jez! / Dobrou chuť!' },
      { tp: 'sina o awen.', cz: 'Měl bys zůstat.' }
    ],
    sitelenPonaSymbol: '󱥄'
  },
  {
    word: 'olin',
    category: 'sloveso',
    topicCategory: 'emoce',
    translationCz: 'milovat, mít rád, láska, sympatie',
    definition: 'Hluboká láska k člověku nebo bytosti, vřelý cit.',
    examples: [
      { tp: 'mi olin e sina.', cz: 'Miluji tě.' },
      { tp: 'olin li suli.', cz: 'Láska je mocná / velká.' }
    ],
    sitelenPonaSymbol: '󱥅'
  },
  {
    word: 'ona',
    category: 'zájmeno',
    topicCategory: 'zaklad',
    translationCz: 'on, ona, ono, oni, jeho, její',
    definition: 'Třetí osoba jednotného i množného čísla.',
    examples: [
      { tp: 'ona li pona.', cz: 'On/ona/to je dobré.' },
      { tp: 'mi lukin e ona.', cz: 'Vidím ho/ji/to.' }
    ],
    sitelenPonaSymbol: '󱥆'
  },
  {
    word: 'open',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'otevřít, začít, start, zapnout',
    definition: 'Zahájení činnosti, odemknout, začátek.',
    examples: [
      { tp: 'o open e lupa!', cz: 'Otevři dveře!' },
      { tp: 'tenpo open', cz: 'začátek' }
    ],
    sitelenPonaSymbol: '󱥇'
  },
  {
    word: 'pakala',
    category: 'sloveso',
    topicCategory: 'popis',
    translationCz: 'zničit, poškodit, rozbít, chyba, sakra!',
    definition: 'Úraz, porucha, zkáza, havárie. Používá se i jako kletba.',
    examples: [
      { tp: 'ilo li pakala.', cz: 'Nástroj je rozbitý.' },
      { tp: 'pakala a!', cz: 'Sakra! / Do háje!' }
    ],
    sitelenPonaSymbol: '󱥈'
  },
  {
    word: 'pali',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'pracovat, dělat, tvořit, stavět, práce',
    definition: 'Činnost, řemeslo, aktivita, výroba.',
    examples: [
      { tp: 'mi pali e tomo.', cz: 'Stavím dům.' },
      { tp: 'pali li pona.', cz: 'Práce je příjemná.' }
    ],
    sitelenPonaSymbol: '󱥉'
  },
  {
    word: 'palisa',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'tyč, hůl, větev, pero, podlouhlý předmět',
    definition: 'Dlouhý pevný předmět, kolík, tužka.',
    examples: [
      { tp: 'palisa sitelen', cz: 'tužka / pero' }
    ],
    sitelenPonaSymbol: '󱥊'
  },
  {
    word: 'pan',
    category: 'podstatné jméno',
    topicCategory: 'jidlo',
    translationCz: 'chléb, obilí, rýže, pečivo, těstoviny',
    definition: 'Obilný produkt, cereálie, moučné jídlo.',
    examples: [
      { tp: 'pan suwi', cz: 'koláč / sladké pečivo' },
      { tp: 'mi moku e pan.', cz: 'Jím chléb.' }
    ],
    sitelenPonaSymbol: '󱥋'
  },
  {
    word: 'pana',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'dát, poslat, vydat, vypustit, darovat',
    definition: 'Předat někomu něco, věnovat, vyzařovat.',
    examples: [
      { tp: 'o pana e moku tawa mi.', cz: 'Dej mi jídlo.' },
      { tp: 'suno li pana e seli.', cz: 'Slunce dává teplo.' }
    ],
    sitelenPonaSymbol: '󱥌'
  },
  {
    word: 'pi',
    category: 'částice',
    topicCategory: 'zaklad',
    translationCz: 'předložková částice modifikátorů (z, patřící k)',
    definition: 'Seskupuje přívlastky! Používá se POUZE tehdy, když za ním následují alespoň dvě slova (např. tomo pi jan pona = dům dobrého člověka).',
    examples: [
      { tp: 'tomo pi jan pona', cz: 'dům dobrého člověka (přítele)' },
      { tp: 'jan pi toki pona', cz: 'mluvčí Toki Pona' }
    ],
    sitelenPonaSymbol: '󱥍'
  },
  {
    word: 'pilin',
    category: 'podstatné jméno',
    topicCategory: 'emoce',
    translationCz: 'cítit, pocit, dotek, srdce, nálada',
    definition: 'Emoce, vnímání, myšlenka, hmat.',
    examples: [
      { tp: 'sina pilin seme?', cz: 'Jak se cítíš?' },
      { tp: 'pilin pona', cz: 'štěstí / spokojenost' }
    ],
    sitelenPonaSymbol: '󱥎'
  },
  {
    word: 'pimeja',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'tmavý, černý, stín, noc, temnota',
    definition: 'Nedostatek světla, černá barva.',
    examples: [
      { tp: 'tenpo pimeja', cz: 'noc / temný čas' },
      { tp: 'kasi pimeja', cz: 'tmavý strom' }
    ],
    sitelenPonaSymbol: '󱥏'
  },
  {
    word: 'pini',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'konec, hotový, minulý, ukončit, dokončit',
    definition: 'Závěr, minulost, finále, dokončeno.',
    examples: [
      { tp: 'mi pini e pali.', cz: 'Dokončil jsem práci.' },
      { tp: 'tenpo pini', cz: 'minulost (čas ukončený)' }
    ],
    sitelenPonaSymbol: '󱥐'
  },
  {
    word: 'pipi',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'hmyz, brouk, pavouk, mravenec',
    definition: 'Drobný bezobratlý živočich, moucha, včela.',
    examples: [
      { tp: 'pipi lili', cz: 'malý mravenec / muška' }
    ],
    sitelenPonaSymbol: '󱥑'
  },
  {
    word: 'poka',
    category: 'podstatné jméno',
    topicCategory: 'popis',
    translationCz: 'bok, strana, vedle, blízko, soused',
    definition: 'Blízkost, bok těla, po boku někoho.',
    examples: [
      { tp: 'ona li lon poka mi.', cz: 'On je vedle mě.' },
      { tp: 'poka tomo', cz: 'strana domu' }
    ],
    sitelenPonaSymbol: '󱥒'
  },
  {
    word: 'poki',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'nádoba, krabice, sklenice, miska, taška',
    definition: 'Jakákoli schránka, obal, hrnek, kapsa.',
    examples: [
      { tp: 'poki telo', cz: 'lahev / sklenice na vodu' },
      { tp: 'poki kiwen', cz: 'kovová schránka' }
    ],
    sitelenPonaSymbol: '󱥓'
  },
  {
    word: 'pona',
    category: 'přídavné jméno',
    topicCategory: 'filosofie',
    translationCz: 'dobrý, jednoduchý, skvělý, opravit, děkuji',
    definition: 'Základní slovo Toki Pona! Dobrota, jednoduchost, krása, zdraví, mír.',
    examples: [
      { tp: 'toki pona', cz: 'dobrý / jednoduchý jazyk' },
      { tp: 'pona tawa sina!', cz: 'Ať se ti daří! / Díky!' },
      { tp: 'mi pona e ilo.', cz: 'Opravuji přístroj.' }
    ],
    sitelenPonaSymbol: '󱥔'
  },
  {
    word: 'sama',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'stejný, podobný, rovný, sourozenec',
    definition: 'Rovnost, podobnost, bratr, sestra.',
    examples: [
      { tp: 'mi mute li sama.', cz: 'Jsme si podobní / jsme si rovni.' },
      { tp: 'jan sama', cz: 'bratr / sestra / bližní' }
    ],
    sitelenPonaSymbol: '󱥕'
  },
  {
    word: 'seli',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'oheň, horko, teplý, vařit, pálit',
    definition: 'Teplota, plamen, sluneční žár.',
    examples: [
      { tp: 'seli li suli.', cz: 'Oheň je veliký.' },
      { tp: 'telo seli', cz: 'horká voda / čaj / polévka' }
    ],
    sitelenPonaSymbol: '󱥖'
  },
  {
    word: 'selo',
    category: 'podstatné jméno',
    topicCategory: 'popis',
    translationCz: 'kůže, povrch, kůra, skořápka, vnějšek',
    definition: 'Vnější vrstva, slupka plodu, krunýř.',
    examples: [
      { tp: 'selo soweli', cz: 'zvířecí kožešina / kůže' }
    ],
    sitelenPonaSymbol: '󱥗'
  },
  {
    word: 'seme',
    category: 'zájmeno',
    topicCategory: 'zaklad',
    translationCz: 'co, který, kdo, jaký, otázka',
    definition: 'Tázací zájmeno.',
    examples: [
      { tp: 'sina pali e seme?', cz: 'Co děláš?' },
      { tp: 'jan seme li kama?', cz: 'Kdo to přichází?' },
      { tp: 'tan seme?', cz: 'Proč? (Z jakého důvodu?)' }
    ],
    sitelenPonaSymbol: '󱥘'
  },
  {
    word: 'sewi',
    category: 'podstatné jméno',
    topicCategory: 'filosofie',
    translationCz: 'nahoře, nebe, posvátný, božský, vysoký',
    definition: 'Vznešený, střecha, nadpřirozený, nebesa.',
    examples: [
      { tp: 'sewi ma', cz: 'nebe nad zemí' },
      { tp: 'jan sewi', cz: 'bůh / svatý člověk' }
    ],
    sitelenPonaSymbol: '󱥙'
  },
  {
    word: 'sijelo',
    category: 'podstatné jméno',
    topicCategory: 'lide',
    translationCz: 'tělo, organismus, postava',
    definition: 'Fyzická schránka člověka či zvířete.',
    examples: [
      { tp: 'sijelo mi li pona.', cz: 'Mé tělo je zdravé.' }
    ],
    sitelenPonaSymbol: '󱥚'
  },
  {
    word: 'sike',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'kruh, míč, kolo, rok, cyklus',
    definition: 'Kulatý tvar, rotace, oběh.',
    examples: [
      { tp: 'sike suno', cz: 'rok (oběh slunce)' },
      { tp: 'sike musi', cz: 'míč na hraní' }
    ],
    sitelenPonaSymbol: '󱥛'
  },
  {
    word: 'sin',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'nový, čerstvý, další, obnovit',
    definition: 'Novinka, přídavek, neokoukaný.',
    examples: [
      { tp: 'jan sin', cz: 'nováček / začátečník' },
      { tp: 'toki sin', cz: 'nové zprávy' }
    ],
    sitelenPonaSymbol: '󱥜'
  },
  {
    word: 'sina',
    category: 'zájmeno',
    topicCategory: 'zaklad',
    translationCz: 'ty, tebe, tvůj, vy, váš',
    definition: 'Druhá osoba. Samotné jako podmět nepotřebuje částici li!',
    examples: [
      { tp: 'sina pona.', cz: 'Jsi dobrý / milý. (bez li)' },
      { tp: 'tomo sina', cz: 'tvůj dům' }
    ],
    sitelenPonaSymbol: '󱥝'
  },
  {
    word: 'sinpin',
    category: 'podstatné jméno',
    topicCategory: 'popis',
    translationCz: 'předek, tvář, zeď, hruď, čelo',
    definition: 'Přední strana, fasáda, obličej.',
    examples: [
      { tp: 'sinpin tomo', cz: 'stěna domu / předek' },
      { tp: 'sinpin lukin', cz: 'obličej' }
    ],
    sitelenPonaSymbol: '󱥞'
  },
  {
    word: 'sitelen',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'obraz, písmo, kresba, psát, film',
    definition: 'Vizuální zobrazení, symbol, kreslit, znak.',
    examples: [
      { tp: 'sitelen pona', cz: 'hieroglyfické písmo Toki Pona' },
      { tp: 'mi sitelen e lipu.', cz: 'Píšu knihu / kreslím na papír.' }
    ],
    sitelenPonaSymbol: '󱥟'
  },
  {
    word: 'sona',
    category: 'sloveso',
    topicCategory: 'filosofie',
    translationCz: 'vědět, znát, rozumět, moudrost, věda',
    definition: 'Znalost, dovednost, inteligence. Jako pomocné sloveso: umět něco dělat.',
    examples: [
      { tp: 'mi sona e toki pona.', cz: 'Rozumím / znám Toki Pona.' },
      { tp: 'jan sona', cz: 'mudrc / vědec / učitel' }
    ],
    sitelenPonaSymbol: '󱥠'
  },
  {
    word: 'soweli',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'savec, zvíře, pes, kočka, zvířátko',
    definition: 'Suchozemský savec, domácí mazlíček, zvíře obecně.',
    examples: [
      { tp: 'soweli tomo', cz: 'pes nebo kočka (domácí zvíře)' },
      { tp: 'soweli lili', cz: 'štěně / kotě' }
    ],
    sitelenPonaSymbol: '󱥡'
  },
  {
    word: 'suli',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'velký, těžký, dlouhý, důležitý, dospělý',
    definition: 'Velikost, význam, dospělost, mohutnost.',
    examples: [
      { tp: 'jan suli', cz: 'dospělý / vůdce / velký člověk' },
      { tp: 'ni li suli.', cz: 'Tohle je důležité.' }
    ],
    sitelenPonaSymbol: '󱥢'
  },
  {
    word: 'suno',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'slunce, světlo, záře, den, svítit',
    definition: 'Sluneční těleso, lampa, zdroj záření, denní doba.',
    examples: [
      { tp: 'suno li seli.', cz: 'Slunce je horké.' },
      { tp: 'tenpo suno', cz: 'den / denní doba' }
    ],
    sitelenPonaSymbol: '󱥣'
  },
  {
    word: 'supa',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'stůl, postel, židle, vodorovná plocha',
    definition: 'Rovný povrch k sezení, spaní či odkládání.',
    examples: [
      { tp: 'supa lape', cz: 'postel (plocha ke spánku)' },
      { tp: 'supa moku', cz: 'jídelní stůl' }
    ],
    sitelenPonaSymbol: '󱥤'
  },
  {
    word: 'suwi',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'sladký, roztomilý, cukr, milý',
    definition: 'Příjemná chuť, cukroví, roztomilé zvířátko nebo dítě.',
    examples: [
      { tp: 'moku suwi', cz: 'dezert / sladkost' },
      { tp: 'soweli suwi', cz: 'roztomilé zvířátko' }
    ],
    sitelenPonaSymbol: '󱥥'
  },
  {
    word: 'tan',
    category: 'předložka',
    topicCategory: 'zaklad',
    translationCz: 'od, z, protože, příčina, původ',
    definition: 'Odkud, důvod, začátek cesty nebo příčina.',
    examples: [
      { tp: 'mi kama tan ma tomo.', cz: 'Přicházím z města.' },
      { tp: 'tan ni', cz: 'proto / z tohoto důvodu' }
    ],
    sitelenPonaSymbol: '󱥦'
  },
  {
    word: 'tawa',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'jít, jet, k, do, pro, líbit se',
    definition: 'Pohyb směrem k něčemu, chůze, také "podle mého názoru" / "líbí se mi" (pona tawa mi).',
    examples: [
      { tp: 'mi tawa tomo.', cz: 'Jdu domů.' },
      { tp: 'tawa pona!', cz: 'Šťastnou cestu! (Měj se)' },
      { tp: 'ni li pona tawa mi.', cz: 'Tohle se mi líbí / chutná mi to.' }
    ],
    sitelenPonaSymbol: '󱥧'
  },
  {
    word: 'telo',
    category: 'podstatné jméno',
    topicCategory: 'jidlo',
    translationCz: 'voda, kapalina, nápoj, déšť, mýt',
    definition: 'Jakákoli tekutina, jezero, řeka, nápoj.',
    examples: [
      { tp: 'telo suli', cz: 'moře / oceán' },
      { tp: 'mi moku e telo.', cz: 'Piji vodu.' }
    ],
    sitelenPonaSymbol: '󱥨'
  },
  {
    word: 'tenpo',
    category: 'podstatné jméno',
    topicCategory: 'zaklad',
    translationCz: 'čas, chvíle, okamžik, doba, období',
    definition: 'Časový úsek, chronologie, hodina.',
    examples: [
      { tp: 'tenpo ni', cz: 'teď / v této době' },
      { tp: 'tenpo kama', cz: 'budoucnost' },
      { tp: 'tenpo suli', cz: 'dlouhá doba' }
    ],
    sitelenPonaSymbol: '󱥩'
  },
  {
    word: 'toki',
    category: 'sloveso',
    topicCategory: 'zaklad',
    translationCz: 'mluvit, řeč, jazyk, ahoj, zpráva',
    definition: 'Komunikace, pozdrav, rozmluva, slovo.',
    examples: [
      { tp: 'toki!', cz: 'Ahoj! / Dobrý den!' },
      { tp: 'mi toki e toki pona.', cz: 'Mluvím jazykem Toki Pona.' }
    ],
    sitelenPonaSymbol: '󱥪'
  },
  {
    word: 'tomo',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'dům, budova, místnost, domov',
    definition: 'Jakékoli obydlí, stavba, přístřeší.',
    examples: [
      { tp: 'tomo sona', cz: 'škola (dům vědění)' },
      { tp: 'tomo moku', cz: 'restaurace / jídelna' },
      { tp: 'tomo tawa', cz: 'auto / vlak (pohybující se dům)' }
    ],
    sitelenPonaSymbol: '󱥫'
  },
  {
    word: 'tu',
    category: 'číslovka',
    topicCategory: 'zaklad',
    translationCz: 'dva (2), rozdělit, pár',
    definition: 'Číslo 2, rozdělení na části, duální.',
    examples: [
      { tp: 'jan tu', cz: 'dva lidé / pár' },
      { tp: 'mi tu e kili.', cz: 'Půlím ovoce.' }
    ],
    sitelenPonaSymbol: '󱥬'
  },
  {
    word: 'unpa',
    category: 'sloveso',
    topicCategory: 'lide',
    translationCz: 'sex, milovat se, erotika',
    definition: 'Sexuální styk, intimita.',
    examples: [
      { tp: 'unpa li pona tawa ona.', cz: 'Milování se mu líbí.' }
    ],
    sitelenPonaSymbol: '󱥭'
  },
  {
    word: 'uta',
    category: 'podstatné jméno',
    topicCategory: 'lide',
    translationCz: 'ústa, rty, pusa, čelist',
    definition: 'Otvor v obličeji k jídlu a mluvení.',
    examples: [
      { tp: 'uta mi', cz: 'má ústa' }
    ],
    sitelenPonaSymbol: '󱥮'
  },
  {
    word: 'utala',
    category: 'sloveso',
    topicCategory: 'akce',
    translationCz: 'bojovat, válka, útok, soutěžit, spor',
    definition: 'Konflikt, násilí, bitva, zápas.',
    examples: [
      { tp: 'utala ala!', cz: 'Žádnou válku! Mír!' },
      { tp: 'jan utala', cz: 'voják / bojovník' }
    ],
    sitelenPonaSymbol: '󱥯'
  },
  {
    word: 'walo',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'bílý, světlý, bledý',
    definition: 'Bílá barva, čisté světlo.',
    examples: [
      { tp: 'telo walo', cz: 'mléko (bílá tekutina)' },
      { tp: 'mun walo', cz: 'bílý měsíc' }
    ],
    sitelenPonaSymbol: '󱥰'
  },
  {
    word: 'wan',
    category: 'číslovka',
    topicCategory: 'zaklad',
    translationCz: 'jeden (1), sjednotit, jednotný, unikátní',
    definition: 'Číslo 1, celek, jediný.',
    examples: [
      { tp: 'jan wan', cz: 'jeden člověk / jednotlivec' },
      { tp: 'o wan e ona.', cz: 'Sjednoť je.' }
    ],
    sitelenPonaSymbol: '󱥱'
  },
  {
    word: 'waso',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'pták, létající tvor, okřídlenec',
    definition: 'Pták, orel, holub, netopýr.',
    examples: [
      { tp: 'waso li tawa lon sewi.', cz: 'Pták létá na obloze.' }
    ],
    sitelenPonaSymbol: '󱥲'
  },
  {
    word: 'wawa',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'silný, mocný, energie, elektřina, síla',
    definition: 'Fyzická i duševní energie, elektrický proud.',
    examples: [
      { tp: 'telo wawa', cz: 'káva / energetický nápoj' },
      { tp: 'wawa li lon.', cz: 'Síla je přítomná.' }
    ],
    sitelenPonaSymbol: '󱥳'
  },
  {
    word: 'weka',
    category: 'přídavné jméno',
    topicCategory: 'popis',
    translationCz: 'pryč, vzdálený, chybějící, odstranit',
    definition: 'Vzdálenost, absence, zmizení, vymazat.',
    examples: [
      { tp: 'ona li lon weka.', cz: 'Je daleko.' },
      { tp: 'o weka e ni!', cz: 'Odstraň to! / Dej to pryč!' }
    ],
    sitelenPonaSymbol: '󱥴'
  },
  {
    word: 'wile',
    category: 'sloveso',
    topicCategory: 'zaklad',
    translationCz: 'chtít, potřebovat, přát si, vůle, muset',
    definition: 'Touha, potřeba, nezbytnost. Jako pomocné sloveso: chtít něco dělat.',
    examples: [
      { tp: 'mi wile moku.', cz: 'Chci jíst / mám hlad.' },
      { tp: 'sina wile e seme?', cz: 'Co si přeješ?' }
    ],
    sitelenPonaSymbol: '󱥵'
  },
  {
    word: 'kijetesantakalu',
    category: 'podstatné jméno',
    topicCategory: 'priroda',
    translationCz: 'mýval, medvídkovitá šelma, lasička',
    definition: 'Kultovní nejdelší slovo Toki Pona vytvořené jako aprílový žert, které se stalo oficiálním.',
    examples: [
      { tp: 'kijetesantakalu li suwi.', cz: 'Mýval je roztomilý.' }
    ],
    sitelenPonaSymbol: '󱦖'
  },
  {
    word: 'tonsi',
    category: 'přídavné jméno',
    topicCategory: 'lide',
    translationCz: 'nebinární, transgender, genderově neutrální',
    definition: 'Člověk mimo binární dělení na muže a ženu (nimi ku suli).',
    examples: [
      { tp: 'jan tonsi', cz: 'nebinární člověk' }
    ],
    sitelenPonaSymbol: '󱦄'
  },
  {
    word: 'ku',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'oficiální Toki Pona slovník (Kniha Toki Pona Dictionary)',
    definition: 'Referenční kniha Toki Pona Dictionary od Sonji Lang (2021).',
    examples: [
      { tp: 'lipu ku', cz: 'Kniha slovníku Toki Pona' }
    ],
    sitelenPonaSymbol: '󱥿'
  },
  {
    word: 'pu',
    category: 'podstatné jméno',
    topicCategory: 'veci',
    translationCz: 'oficiální Toki Pona učebnice (Kniha Toki Pona: The Language of Good)',
    definition: 'Původní kniha Toki Pona z roku 2014, základní kánon.',
    examples: [
      { tp: 'lipu pu', cz: 'Oficiální kniha Toki Pona' },
      { tp: 'mi pu.', cz: 'Učím se z oficiální knihy.' }
    ],
    sitelenPonaSymbol: '󱦀'
  }
];
