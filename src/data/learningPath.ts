import { UnitSection } from '../types/index.ts';

export const LEARNING_SECTIONS: UnitSection[] = [
  {
    id: 'section-1',
    title: 'Sekce 1: První kroky v Toki Pona',
    description: 'Nauč se nejdůležitější základy minimalistického jazyka: pozdravy, zájmena a pravidlo částice "li".',
    color: 'emerald',
    nodes: [
      {
        id: 'lesson-1-1',
        unitId: 'section-1',
        unitTitle: 'Sekce 1: První kroky',
        unitColor: 'emerald',
        title: 'Základní slova a pozdravy',
        subtitle: 'toki, pona, jan, mi, sina',
        iconName: 'MessageSquareHeart',
        grammarNote: 'V Toki Pona neexistují pády ani časování! Slova mají více příbuzných významů podle kontextu. "toki" znamená řeč, mluvit i pozdrav "ahoj". "pona" znamená dobrý, jednoduchý i děkuji!',
        newWords: ['toki', 'pona', 'jan', 'mi', 'sina'],
        xpReward: 15,
        questions: [
          {
            id: 'q-1-1-1',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Jak se v Toki Pona řekne "Ahoj!" nebo "Mluvit"?',
            options: ['toki', 'moku', 'telo', 'jan'],
            correctAnswer: 'toki',
            explanation: '"toki" znamená mluvit, jazyk, řeč a také "ahoj".'
          },
          {
            id: 'q-1-1-2',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Co znamená věta: "jan pona"?',
            subPrompt: 'jan (člověk) + pona (dobrý)',
            options: ['Dobrý člověk / přítel', 'Velký nepřítel', 'Starý dům', 'Rychlý pes'],
            correctAnswer: 'Dobrý člověk / přítel',
            explanation: 'Přídavné jméno se v Toki Pona klade VŽDY až za podstatné jméno. "jan pona" = člověk dobrý = přítel!'
          },
          {
            id: 'q-1-1-3',
            type: 'word_scramble',
            prompt: 'Sestav větu: "Já jsem dobrý" (nebo "Mně se daří")',
            czSentence: 'Já jsem dobrý / Mně se daří',
            wordsAvailable: ['mi', 'pona', 'sina', 'toki', 'jan', 'moku'],
            correctAnswer: ['mi', 'pona'],
            hint: 'Zájmeno "mi" na začátku, za ním vlastnost "pona".',
            explanation: 'Pokud je podmětem samotné "mi" (já) nebo "sina" (ty), nepoužívá se spojka "li". Píše se přímo "mi pona".'
          },
          {
            id: 'q-1-1-4',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Jak řekneš svému kamarádovi "Ty jsi dobrý / skvělý"?',
            options: ['sina pona', 'mi pona', 'jan toki', 'pona mi'],
            correctAnswer: 'sina pona',
            explanation: '"sina" znamená ty/vy, "pona" dobrý. Společně: "sina pona".'
          },
          {
            id: 'q-1-1-5',
            type: 'fill_in_blank',
            prompt: 'Doplň chybějící slovo pro "jazyk dobra / jednoduchosti":',
            tpSentence: 'toki ___',
            options: ['pona', 'jan', 'mi', 'sina'],
            correctAnswer: 'pona',
            explanation: '"toki pona" je samotný název tohoto jazyka – jazyk dobra a jednoduchosti.'
          }
        ]
      },
      {
        id: 'lesson-1-2',
        unitId: 'section-1',
        unitTitle: 'Sekce 1: První kroky',
        unitColor: 'emerald',
        title: 'Tvorba vět a částice "li"',
        subtitle: 'ona, moku, lape, suli, li',
        iconName: 'Sparkles',
        grammarNote: 'Klíčové pravidlo Toki Pona: Částice "li" odděluje podmět od přísudku (např. ona li moku = on jí). Výjimka: U samotného "mi" (já) a "sina" (ty) se "li" NEPÍŠE!',
        newWords: ['ona', 'moku', 'lape', 'suli', 'li'],
        xpReward: 20,
        questions: [
          {
            id: 'q-1-2-1',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Jak přeložíš: "On jí" (nebo "Ona jí")?',
            options: ['ona li moku', 'ona moku', 'mi li moku', 'moku li ona'],
            correctAnswer: 'ona li moku',
            explanation: 'Jelikož podmět je "ona" (on/ona/to), MUSÍ za ním následovat částice "li": "ona li moku".'
          },
          {
            id: 'q-1-2-2',
            type: 'true_or_false',
            prompt: 'Je pravda, že ve větě "mi lape" (já spím) se píše "li"?',
            subPrompt: 'Platí "mi li lape"?',
            options: ['Ne, u "mi" a "sina" se "li" nikdy nepíše!', 'Ano, "li" je vždy za každým slovem'],
            correctAnswer: 'Ne, u "mi" a "sina" se "li" nikdy nepíše!',
            explanation: 'Přesně tak! Pokud je podmětem pouze "mi" nebo "sina", částice "li" odpadá.'
          },
          {
            id: 'q-1-2-3',
            type: 'word_scramble',
            prompt: 'Sestav větu: "Člověk spí"',
            czSentence: 'Člověk spí',
            wordsAvailable: ['jan', 'li', 'lape', 'ona', 'moku', 'suli'],
            correctAnswer: ['jan', 'li', 'lape'],
            explanation: 'Podmět (jan) + částice (li) + sloveso (lape) = jan li lape.'
          },
          {
            id: 'q-1-2-4',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Co znamená: "jan suli li moku"?',
            subPrompt: 'jan (člověk) + suli (velký/dospělý) + li + moku (jíst)',
            options: ['Dospělý / velký člověk jí', 'Malé dítě spí', 'Jídlo je velké', 'Přítel vaří'],
            correctAnswer: 'Dospělý / velký člověk jí',
            explanation: '"jan suli" = velký nebo dospělý člověk, "moku" = jíst/jí.'
          },
          {
            id: 'q-1-2-5',
            type: 'fill_in_blank',
            prompt: 'Doplň správnou částici: "ona ___ lape" (On spí)',
            tpSentence: 'ona ___ lape',
            options: ['li', 'e', 'pi', 'la'],
            correctAnswer: 'li',
            explanation: 'K oddělení podmětu "ona" od slovesa "lape" slouží částice "li".'
          }
        ]
      },
      {
        id: 'lesson-1-3',
        unitId: 'section-1',
        unitTitle: 'Sekce 1: První kroky',
        unitColor: 'emerald',
        title: 'Trénink & Opakování 1. úrovně',
        subtitle: 'Upevni si základy a získej odznak',
        iconName: 'Trophy',
        grammarNote: 'Skvělá práce! Zopakujme si pravidla: 1) Přídavné jméno jde za podstatné jméno (jan pona). 2) "li" spojuje podmět se slovesem (ona li pona), kromě samotného "mi" a "sina".',
        newWords: ['lili', 'mute'],
        xpReward: 25,
        questions: [
          {
            id: 'q-1-3-1',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Přelož: "pona mute!"',
            options: ['Mnohokrát děkuji! / Velmi dobré!', 'Špatné jídlo', 'Dlouhá noc', 'Velký člověk'],
            correctAnswer: 'Mnohokrát děkuji! / Velmi dobré!',
            explanation: '"mute" znamená mnoho/velmi. "pona mute" je častý způsob jak říct "velmi dobré" nebo "děkuji mockrát".'
          },
          {
            id: 'q-1-3-2',
            type: 'word_scramble',
            prompt: 'Sestav větu: "Dítě spí"',
            czSentence: 'jan lili (malý člověk/dítě) + spí',
            wordsAvailable: ['jan', 'lili', 'li', 'lape', 'mi', 'moku', 'soweli'],
            correctAnswer: ['jan', 'lili', 'li', 'lape'],
            explanation: 'Podmět "jan lili" má dvě slova, takže následuje "li" a pak sloveso "lape".'
          },
          {
            id: 'q-1-3-3',
            type: 'fill_in_blank',
            prompt: 'Doplň: "Já mluvím" (pozor na pravidlo o "li"!)',
            tpSentence: 'mi ___',
            options: ['toki', 'li toki', 'e toki', 'pi toki'],
            correctAnswer: 'toki',
            explanation: 'U samostatného "mi" se nepíše "li", pouze "mi toki".'
          },
          {
            id: 'q-1-3-4',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Která věta je GRAMATICKY SPRÁVNĚ?',
            options: ['ona li pona', 'ona pona', 'mi li pona', 'sina li pona'],
            correctAnswer: 'ona li pona',
            explanation: 'U "ona" musí být "li" (ona li pona). U "mi" a "sina" by "li" naopak být nemělo.'
          }
        ]
      }
    ]
  },
  {
    id: 'section-2',
    title: 'Sekce 2: Svět kolem nás',
    description: 'Předměty sloves s částicí "e", zvířata, příroda a jak tvořit otázky a zápor se slovem "ala".',
    color: 'amber',
    nodes: [
      {
        id: 'lesson-2-1',
        unitId: 'section-2',
        unitTitle: 'Sekce 2: Svět kolem nás',
        unitColor: 'amber',
        title: 'Předměty a částice "e"',
        subtitle: 'telo, kili, lukin, e',
        iconName: 'Apple',
        grammarNote: 'Částice "e" uvádí přímý předmět (4. pád - koho/co). Vzorec: [Podmět] (li) [Sloveso] e [Předmět]. Např.: mi moku e kili = Jím ovoce.',
        newWords: ['telo', 'kili', 'lukin', 'e', 'jo'],
        xpReward: 20,
        questions: [
          {
            id: 'q-2-1-1',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Jak přeložíš: "Jím ovoce"?',
            options: ['mi moku e kili', 'mi moku kili', 'mi li moku kili', 'kili li moku mi'],
            correctAnswer: 'mi moku e kili',
            explanation: 'Přímý předmět "kili" (ovoce) musí být uvozen částicí "e": "mi moku e kili".'
          },
          {
            id: 'q-2-1-2',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Co znamená: "mi moku e telo"?',
            subPrompt: 'moku = konzumovat (jíst/pít), telo = voda/tekutina',
            options: ['Piji vodu', 'Jím jablko', 'Vidím jezero', 'Mám žízeň'],
            correctAnswer: 'Piji vodu',
            explanation: 'V Toki Pona znamená "moku e telo" doslova konzumovat tekutinu = pít vodu!'
          },
          {
            id: 'q-2-1-3',
            type: 'word_scramble',
            prompt: 'Sestav větu: "On vidí dům"',
            czSentence: 'On vidí dům',
            wordsAvailable: ['ona', 'li', 'lukin', 'e', 'tomo', 'mi', 'kili', 'moku'],
            correctAnswer: ['ona', 'li', 'lukin', 'e', 'tomo'],
            explanation: 'ona (on) + li + lukin (vidí) + e (předmět) + tomo (dům).'
          },
          {
            id: 'q-2-1-4',
            type: 'fill_in_blank',
            prompt: 'Doplň chybějící částici předmětu: "mi lukin ___ sina"',
            tpSentence: 'mi lukin ___ sina',
            options: ['e', 'li', 'pi', 'la'],
            correctAnswer: 'e',
            explanation: 'Částice "e" označuje, na koho nebo na co působí děj slovesa: "mi lukin e sina" (vidím tě).'
          }
        ]
      },
      {
        id: 'lesson-2-2',
        unitId: 'section-2',
        unitTitle: 'Sekce 2: Svět kolem nás',
        unitColor: 'amber',
        title: 'Zvířata a živá příroda',
        subtitle: 'soweli, waso, kala, kasi, suno',
        iconName: 'Rabbit',
        grammarNote: 'V Toki Pona dělíme živočichy do 4 hlavních kategorií: soweli (suchozemský savec / pes / kočka), waso (pták / létající tvor), kala (ryba / vodní tvor) a pipi (hmyz).',
        newWords: ['soweli', 'waso', 'kala', 'kasi', 'suno'],
        xpReward: 20,
        questions: [
          {
            id: 'q-2-2-1',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Co znamená: "soweli lili"?',
            options: ['Štěně / kotě / malé zvířátko', 'Velký orel', 'Zelená tráva', 'Rybka v řece'],
            correctAnswer: 'Štěně / kotě / malé zvířátko',
            explanation: '"soweli" = savec/zvíře, "lili" = malý. Dohromady mládě zvířete, štěně či kotě.'
          },
          {
            id: 'q-2-2-2',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Jak v Toki Pona pojmenuješ ptáka létajícího na obloze?',
            options: ['waso', 'kala', 'soweli', 'pipi'],
            correctAnswer: 'waso',
            explanation: '"waso" je označení pro ptáka nebo létajícího tvora.'
          },
          {
            id: 'q-2-2-3',
            type: 'word_scramble',
            prompt: 'Sestav větu: "Slunce je horké"',
            czSentence: 'suno (slunce) + li + seli (horké/oheň)',
            wordsAvailable: ['suno', 'li', 'seli', 'telo', 'e', 'kasi', 'waso'],
            correctAnswer: ['suno', 'li', 'seli'],
            explanation: 'suno li seli = Slunce je horké / svítí.'
          },
          {
            id: 'q-2-2-4',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Přelož: "kala li lon telo"',
            options: ['Ryba je ve vodě', 'Pes pije vodu', 'Pták letí k jezeru', 'Rostlina roste'],
            correctAnswer: 'Ryba je ve vodě',
            explanation: '"kala" (ryba) + "li lon" (je v/na) + "telo" (voda).'
          }
        ]
      },
      {
        id: 'lesson-2-3',
        unitId: 'section-2',
        unitTitle: 'Sekce 2: Svět kolem nás',
        unitColor: 'amber',
        title: 'Zápor a otázky se slovem "ala"',
        subtitle: 'Záporná slova a otázky "sloveso ala sloveso"',
        iconName: 'HelpCircle',
        grammarNote: 'Zápor se tvoří jednoduše přidáním "ala" za sloveso: mi sona ala = nevím. Otázka typu "ano/ne" se tvoří zdvojením: sina sona ala sona? = Víš, nebo nevíš? (Víš to?).',
        newWords: ['ala', 'seme'],
        xpReward: 25,
        questions: [
          {
            id: 'q-2-3-1',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Jak řekneš: "Já nevím / Nerozumím"?',
            options: ['mi sona ala', 'mi ala sona', 'sona ala mi', 'mi li sona ala'],
            correctAnswer: 'mi sona ala',
            explanation: '"ala" se dává přímo za slovo, které popírá: "mi sona ala" = já nevím.'
          },
          {
            id: 'q-2-3-2',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Co znamená tázací vazba: "sina moku ala moku?"',
            options: ['Jíš? / Máš jídlo?', 'Co je to za jídlo?', 'Kde je restaurace?', 'Kdo to snědl?'],
            correctAnswer: 'Jíš? / Máš jídlo?',
            explanation: 'Vzor [sloveso] ala [sloveso] je základní otázka ano/ne: "sina moku ala moku?" = Jíš, nebo nejíš?'
          },
          {
            id: 'q-2-3-3',
            type: 'fill_in_blank',
            prompt: 'Doplň tázací slovo: "nimi sina li ___?" (Jaké je tvé jméno?)',
            tpSentence: 'nimi sina li ___?',
            options: ['seme', 'ala', 'pona', 'jan'],
            correctAnswer: 'seme',
            explanation: '"seme" je tázací zájmeno pro "co/kdo/jaký". "nimi sina li seme?" = Jaké je tvé jméno?'
          },
          {
            id: 'q-2-3-4',
            type: 'word_scramble',
            prompt: 'Sestav větu: "Nikdo tu není"',
            czSentence: 'jan ala (žádný člověk) + li + lon (je přítomen)',
            wordsAvailable: ['jan', 'ala', 'li', 'lon', 'seme', 'pona', 'tomo'],
            correctAnswer: ['jan', 'ala', 'li', 'lon'],
            explanation: '"jan ala" = žádný člověk / nikdo. "jan ala li lon" = nikdo tu není.'
          }
        ]
      }
    ]
  },
  {
    id: 'section-3',
    title: 'Sekce 3: Akce, místa a kouzelné "pi"',
    description: 'Předložka lon/tawa, nástroje (ilo), a proč je částice "pi" jednou z nejdůležitějších v celém jazyce.',
    color: 'blue',
    nodes: [
      {
        id: 'lesson-3-1',
        unitId: 'section-3',
        unitTitle: 'Sekce 3: Akce a místa',
        unitColor: 'blue',
        title: 'Místo a pohyb: lon a tawa',
        subtitle: 'tomo, ma, lon, tawa',
        iconName: 'Compass',
        grammarNote: '"lon" znamená být v/na/u (lokace). "tawa" znamená jít/pohybovat se směrem k něčemu. Např. "mi lon tomo" = jsem v domě, "mi tawa tomo" = jdu domů.',
        newWords: ['lon', 'tawa', 'tomo', 'ma'],
        xpReward: 20,
        questions: [
          {
            id: 'q-3-1-1',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Jak přeložíš: "Jdu domů"?',
            options: ['mi tawa tomo', 'mi lon tomo', 'tomo li tawa mi', 'mi tomo tawa'],
            correctAnswer: 'mi tawa tomo',
            explanation: '"tawa" vyjadřuje směr/pohyb: "mi tawa tomo" = jdu k domu / domů.'
          },
          {
            id: 'q-3-1-2',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Co znamená tradiční rozloučení: "tawa pona!"?',
            options: ['Šťastnou cestu! / Měj se dobře!', 'Dobrý večer!', 'Krásný dům!', 'Kde jsi byl?'],
            correctAnswer: 'Šťastnou cestu! / Měj se dobře!',
            explanation: '"tawa pona" znamená "dobrý odchod/cestování", čili šťastnou cestu, měj se! Ten, kdo odchází, na to odpoví "awen pona" (zůstaň v dobrém).'
          },
          {
            id: 'q-3-1-3',
            type: 'word_scramble',
            prompt: 'Sestav větu: "Město" (krajina plná domů)',
            czSentence: 'ma (země/území) + tomo (domy)',
            wordsAvailable: ['ma', 'tomo', 'lon', 'li', 'suli', 'tawa'],
            correctAnswer: ['ma', 'tomo'],
            explanation: 'V Toki Pona se město skládá jako "ma tomo" – území domů!'
          },
          {
            id: 'q-3-1-4',
            type: 'fill_in_blank',
            prompt: 'Doplň: "Auto" (pohybující se dům/schránka): tomo ___',
            tpSentence: 'tomo ___',
            options: ['tawa', 'lon', 'pona', 'moku'],
            correctAnswer: 'tawa',
            explanation: '"tomo tawa" je dopravní prostředek, auto, autobus či vlak (pohybující se místnost).'
          }
        ]
      },
      {
        id: 'lesson-3-2',
        unitId: 'section-3',
        unitTitle: 'Sekce 3: Akce a místa',
        unitColor: 'blue',
        title: 'Kouzelná částice "pi"',
        subtitle: 'Seskupování přívlastků a složené významy',
        iconName: 'Layers',
        grammarNote: 'POZOR! "pi" neznamená prosté "z" nebo "of". "pi" mění způsob seskupování přívlastků! Bez "pi": [tomo telo] suli = velký záchod (velký vodní dům). S "pi": tomo pi [telo suli] = dům velkých vod (dům u moře). Za "pi" musí VŽDY následovat alespoň DVĚ slova!',
        newWords: ['pi', 'kulupu', 'nasin'],
        xpReward: 25,
        questions: [
          {
            id: 'q-3-2-1',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Jak přeložíš: "Dům dobrého člověka" (dům přítele)?',
            options: ['tomo pi jan pona', 'tomo jan pona', 'jan pona pi tomo', 'tomo e jan pona'],
            correctAnswer: 'tomo pi jan pona',
            explanation: '"pi" seskupuje "jan pona" dohromady: dům patřící (dobrému člověku).'
          },
          {
            id: 'q-3-2-2',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Co znamená: "jan pi toki pona"?',
            options: ['Mluvčí jazyka Toki Pona', 'Velmi hlasitý člověk', 'Přítel bez domova', 'Starý učitel'],
            correctAnswer: 'Mluvčí jazyka Toki Pona',
            explanation: '"jan" (člověk) + "pi toki pona" (jazyka Toki Pona) = mluvčí Toki Pona.'
          },
          {
            id: 'q-3-2-3',
            type: 'true_or_false',
            prompt: 'Může být za "pi" pouze jedno jediné slovo (např. "tomo pi mi")?',
            subPrompt: 'Lze psát "tomo pi mi"?',
            options: ['Ne! Za "pi" musí následovat alespoň dvě slova', 'Ano, "pi" může stát před čímkoliv'],
            correctAnswer: 'Ne! Za "pi" musí následovat alespoň dvě slova',
            explanation: 'Skvěle! "Můj dům" je prostě "tomo mi". Použít "pi" před jediným slovem je nejčastější gramatická chyba začátečníků.'
          },
          {
            id: 'q-3-2-4',
            type: 'word_scramble',
            prompt: 'Sestav větu: "Komunita lidí Toki Pona"',
            czSentence: 'kulupu pi toki pona',
            wordsAvailable: ['kulupu', 'pi', 'toki', 'pona', 'li', 'jan', 'suli'],
            correctAnswer: ['kulupu', 'pi', 'toki', 'pona'],
            explanation: 'kulupu (skupina/komunita) + pi (patřící k) + toki pona.'
          }
        ]
      },
      {
        id: 'lesson-3-3',
        unitId: 'section-3',
        unitTitle: 'Sekce 3: Akce a místa',
        unitColor: 'blue',
        title: 'Nástroje a tvoření',
        subtitle: 'ilo, pali, pana, kepeken',
        iconName: 'Wrench',
        grammarNote: '"ilo" je jakýkoli nástroj: ilo toki (telefon), ilo nanpa (počítač/kalkulačka), ilo moku (lžíce/vidlička). "kepeken" znamená používat nebo "pomocí něčeho".',
        newWords: ['ilo', 'pali', 'pana', 'kepeken'],
        xpReward: 20,
        questions: [
          {
            id: 'q-3-3-1',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Jak v Toki Pona pojmenuješ "telefon"?',
            options: ['ilo toki', 'ilo moku', 'tomo toki', 'lipu toki'],
            correctAnswer: 'ilo toki',
            explanation: 'ilo (nástroj) + toki (mluvení) = nástroj k mluvení čili telefon!'
          },
          {
            id: 'q-3-3-2',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Přelož: "mi pali e tomo"',
            options: ['Stavím / vytvářím dům', 'Bydlím v domě', 'Hledám dům', 'Dům je čistý'],
            correctAnswer: 'Stavím / vytvářím dům',
            explanation: '"pali" = pracovat/dělat/vyrábět. "mi pali e tomo" = dělám/stavím dům.'
          },
          {
            id: 'q-3-3-3',
            type: 'fill_in_blank',
            prompt: 'Doplň: "Dát jídlo příteli" -> "o ___ e moku tawa jan pona"',
            tpSentence: 'o ___ e moku tawa jan pona',
            options: ['pana', 'jo', 'lukin', 'lape'],
            correctAnswer: 'pana',
            explanation: '"pana" znamená dát, darovat nebo poslat.'
          }
        ]
      }
    ]
  },
  {
    id: 'section-4',
    title: 'Sekce 4: Podmínky, čas a moudrost',
    description: 'Kontextová částice "la", rozkazovací "o", vyjadřování citů a hluboká filosofie minimalismu.',
    color: 'purple',
    nodes: [
      {
        id: 'lesson-4-1',
        unitId: 'section-4',
        unitTitle: 'Sekce 4: Filosofie a mistrovství',
        unitColor: 'purple',
        title: 'Kontext a podmínky: částice "la"',
        subtitle: 'tenpo, la, ken',
        iconName: 'Clock',
        grammarNote: 'Částice "la" je zázračný nástroj Toki Pona. Vše před "la" tvoří kontext: čas, místo nebo podmínku "když/jestliže"! Vzorec: [Podmínka] la [Hlavní věta]. Např. "sina wile la mi pana" = Pokud chceš, dám ti to.',
        newWords: ['tenpo', 'la', 'ken'],
        xpReward: 25,
        questions: [
          {
            id: 'q-4-1-1',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Co znamená: "tenpo suno la mi pali"?',
            subPrompt: 'tenpo suno (ve dne / v čase slunce) + la + mi pali (pracuji)',
            options: ['Ve dne pracuji', 'Práce je na slunci', 'Zítra budu spát', 'Slunce dnes nevyšlo'],
            correctAnswer: 'Ve dne pracuji',
            explanation: '"tenpo suno la" určuje časový kontext (během dne), "mi pali" je hlavní věta (pracuji).'
          },
          {
            id: 'q-4-1-2',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Jak přeložíš podmínku: "Pokud bude pršet, zůstanu doma"?',
            options: ['telo li kama la mi awen lon tomo', 'telo lon tomo la mi tawa', 'mi awen la telo ala', 'tomo li telo la mi lape'],
            correctAnswer: 'telo li kama la mi awen lon tomo',
            explanation: '"telo li kama la" = když přijde voda (déšť), "mi awen lon tomo" = zůstanu v domě.'
          },
          {
            id: 'q-4-1-3',
            type: 'word_scramble',
            prompt: 'Sestav větu: "Možná přijde"',
            czSentence: 'ken la ona li kama',
            wordsAvailable: ['ken', 'la', 'ona', 'li', 'kama', 'tawa', 'awen'],
            correctAnswer: ['ken', 'la', 'ona', 'li', 'kama'],
            explanation: '"ken la" = možná / je-li to možné, "ona li kama" = on přijde.'
          }
        ]
      },
      {
        id: 'lesson-4-2',
        unitId: 'section-4',
        unitTitle: 'Sekce 4: Filosofie a mistrovství',
        unitColor: 'purple',
        title: 'Rozkazy a oslovení: částice "o"',
        subtitle: 'Rozkazy, přání a volání osob',
        iconName: 'Flame',
        grammarNote: 'Částice "o" nahrazuje "li" při rozkazu nebo přání! "o moku!" = Jez! / Dobrou chuť! "jan Jan o!" = Jane! (oslovení).',
        newWords: ['o', 'olin', 'pilin'],
        xpReward: 25,
        questions: [
          {
            id: 'q-4-2-1',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Jak v Toki Pona řekneš někomu: "Jez!" nebo "Dobrou chuť!"?',
            options: ['o moku!', 'mi moku!', 'moku li pona!', 'sina moku!'],
            correctAnswer: 'o moku!',
            explanation: 'Rozkaz nebo přání začíná částicí "o": "o moku!" = Jez!'
          },
          {
            id: 'q-4-2-2',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Co znamená vyznání: "mi olin e sina"?',
            options: ['Miluji tě / Mám tě rád', 'Vidím tě v dálce', 'Rozumím tvým slovům', 'Pojď se mnou'],
            correctAnswer: 'Miluji tě / Mám tě rád',
            explanation: '"olin" je hluboká láska a náklonnost. "mi olin e sina" = miluji tě.'
          },
          {
            id: 'q-4-2-3',
            type: 'word_scramble',
            prompt: 'Sestav přání na dobrou noc: "lape pona!"',
            czSentence: 'Krásný spánek / Dobrou noc!',
            wordsAvailable: ['lape', 'pona', 'o', 'mi', 'moku', 'toki'],
            correctAnswer: ['lape', 'pona'],
            explanation: '"lape pona" je běžné přání dobré noci a sladkého spánku.'
          }
        ]
      },
      {
        id: 'lesson-4-3',
        unitId: 'section-4',
        unitTitle: 'Sekce 4: Filosofie a mistrovství',
        unitColor: 'purple',
        title: 'Filosofie jednoduchosti a celé universum',
        subtitle: 'ale, sewi, nasin, pona',
        iconName: 'Sun',
        grammarNote: 'Toki Pona byla stvořena jako daoistické cvičení v pozitivním myšlení a jednoduchosti. Když redukujeme svět na ~120 základních pojmů, učíme se vnímat přítomný okamžik a to, co je skutečně podstatné: "ale li pona" (všechno je dobré).',
        newWords: ['ale', 'sewi', 'sona'],
        xpReward: 30,
        questions: [
          {
            id: 'q-4-3-1',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Co znamená filosofická fráze: "ale li pona"?',
            options: ['Všechno je dobré / Vše je v pořádku', 'Jídlo je hotové', 'Svět je veliký', 'Nikdo není dokonalý'],
            correctAnswer: 'Všechno je dobré / Vše je v pořádku',
            explanation: '"ale" = vše / vesmír, "li pona" = je dobré. Klíčová mantra Toki Pona.'
          },
          {
            id: 'q-4-3-2',
            type: 'multiple_choice_cz_to_tp',
            prompt: 'Jak nazveš moudrého člověka, učitele nebo filosofa?',
            options: ['jan sona', 'jan utala', 'jan musi', 'jan nasa'],
            correctAnswer: 'jan sona',
            explanation: '"jan sona" = člověk vědění/moudrosti = mudrc, vědec, učitel.'
          },
          {
            id: 'q-4-3-3',
            type: 'multiple_choice_tp_to_cz',
            prompt: 'Přelož: "nasin pona"',
            options: ['Dobrá cesta / Správný způsob života', 'Nový dům', 'Dlouhá řeka', 'Zlaté peníze'],
            correctAnswer: 'Dobrá cesta / Správný způsob života',
            explanation: '"nasin" = cesta, filosofie, způsob. "nasin pona" je dobrá životní cesta.'
          }
        ]
      }
    ]
  }
];
