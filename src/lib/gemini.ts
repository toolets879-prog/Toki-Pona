import { GoogleGenAI } from '@google/genai';

export const DEFAULT_AI_KEY_STORAGE = 'tokipona_gemini_api_key';

export function getStoredGeminiKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(DEFAULT_AI_KEY_STORAGE) || '';
}

export function saveStoredGeminiKey(key: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DEFAULT_AI_KEY_STORAGE, key.trim());
}

function cleanJsonString(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return cleaned.trim();
}

export const GEMINI_MODEL = 'gemini-2.5-flash';
export const FALLBACK_MODELS = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.5-flash-preview'];

export async function askGeminiTokiPonaTutor({
  apiKey,
  userMessage,
  conversationHistory = [],
  mode = 'beginner'
}: {
  apiKey: string;
  userMessage: string;
  conversationHistory?: { sender: 'ai' | 'user'; text: string }[];
  mode?: 'beginner' | 'intermediate' | 'roleplay';
}): Promise<{ tokiPona: string; czechTranslation: string }> {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Chybí Google Gemini API klíč. Zadejte prosím svůj klíč v nastavení.');
  }

  const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

  const systemInstructions = `Jsi přátelský a laskavý mluvčí a učitel jazyka Toki Pona jménem "jan Soweli" (či "jan pona").
Mluvíš se studentem, který se učí Toki Pona a jehož rodný jazyk je čeština.

Pravidla pro tvou odpověď:
1. Odpověz PŘESNOU a JEDNODUCHOU větou v Toki Pona (1 až 3 věty). Používej správnou gramatiku Toki Pona (li, e, la, pi, o).
2. Vždy přilož český překlad své odpovědi.
3. Pokud uživatel udělá v Toki Pona gramatickou chybu, jemně a povzbudivě ho oprav v českém vysvětlení.
4. Styl konverzace: ${mode === 'beginner' ? 'Pro začátečníky: velmi jednoduchá slova, pomalé tempo, podpora.' : mode === 'roleplay' ? 'Hraní rolí: situace v přírodě nebo na tržišti.' : 'Pokročilý: plynulá a přirozená Toki Pona.'}

DŮLEŽITÉ: Vrať VÝHRADNĚ platný JSON formát v následujícím tvaru:
{
  "tokiPona": "zde tvá věta v Toki Pona",
  "czechTranslation": "zde tvůj český překlad a případná krátká rada"
}`;

  const historyPrompt = conversationHistory
    .slice(-6)
    .map(m => `${m.sender === 'ai' ? 'jan Soweli' : 'Student'}: ${m.text}`)
    .join('\n');

  const fullPrompt = `${historyPrompt ? `Předchozí konverzace:\n${historyPrompt}\n\n` : ''}Student říká: "${userMessage}"\nOdpověz v JSON:`;

  let lastError: unknown = null;
  for (const modelName of FALLBACK_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: fullPrompt,
        config: {
          systemInstruction: systemInstructions,
          responseMimeType: 'application/json',
          temperature: 0.7,
        }
      });

      const text = cleanJsonString(response.text || '{}');
      const parsed = JSON.parse(text);
      return {
        tokiPona: parsed.tokiPona || 'toki! mi kute e sina.',
        czechTranslation: parsed.czechTranslation || 'Ahoj! Slyším tě.',
      };
    } catch (err: unknown) {
      lastError = err;
      const errStr = String(err);
      // If 404 entity not found, try the next model
      if (errStr.includes('404') || errStr.includes('NOT_FOUND')) {
        console.warn(`Model ${modelName} not found, trying fallback...`);
        continue;
      }
      break;
    }
  }

  console.error('Gemini API Error:', lastError);
  const errMessage = lastError instanceof Error ? lastError.message : String(lastError);
  if (errMessage.includes('API key') || errMessage.includes('403') || errMessage.includes('401')) {
    throw new Error('Neplatný Google Gemini API klíč. Zkontrolujte prosím svůj klíč v nastavení.');
  }
  throw new Error(`Chyba při komunikaci s Gemini AI: ${errMessage}`);
}

export async function explainTokiPonaSentenceWithGemini(sentence: string, apiKey?: string): Promise<{
  translation: string;
  grammaticalBreakdown: string[];
  tips: string;
}> {
  const effectiveKey = apiKey || getStoredGeminiKey();
  if (!effectiveKey) {
    return {
      translation: 'Pro plný AI rozbor vložte Google Gemini API klíč v horním menu.',
      grammaticalBreakdown: ['Základní pravidlový rozbor je zobrazen níže.'],
      tips: 'Můžete si zdarma vygenerovat API klíč na aistudio.google.com'
    };
  }

  const ai = new GoogleGenAI({ apiKey: effectiveKey });
  const prompt = `Jako lingvista a expert na Toki Pona analyzuj následující větu pro českého studenta:
Věta: "${sentence}"

Vrať JSON:
{
  "translation": "přirozený český překlad",
  "grammaticalBreakdown": ["bod 1: podmět a částice", "bod 2: sloveso a předmět", "bod 3: modifikátory"],
  "tips": "krátký tip nebo zajímavost o slovech či filosofii v této větě"
}`;

  for (const modelName of FALLBACK_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        }
      });
      const text = cleanJsonString(response.text || '{}');
      return JSON.parse(text);
    } catch (err) {
      if (String(err).includes('404') || String(err).includes('NOT_FOUND')) {
        continue;
      }
      console.warn('AI breakdown error:', err);
      break;
    }
  }

  return {
    translation: 'Chyba při volání AI překladu.',
    grammaticalBreakdown: ['Zkontrolujte platnost API klíče.'],
    tips: 'Zkuste zjednodušit větu.'
  };
}

/**
 * Analyzuje český výraz, přeloží ho do Toki Pona a vytvoří podrobný lingvistický a filosofický rozbor.
 */
export async function analyzeCzechToTokiPonaWithGemini(
  czechText: string,
  apiKey?: string
): Promise<import('../types/index.ts').CzechToTokiPonaAnalysis> {
  const effectiveKey = apiKey || getStoredGeminiKey();
  if (!effectiveKey) {
    throw new Error('Pro AI překlad a rozbor je potřeba připojit Gemini API klíč v horním menu.');
  }

  const ai = new GoogleGenAI({ apiKey: effectiveKey });

  const prompt = `Jsi přední lingvistický expert na minimalistický umělý jazyk Toki Pona (podle Sonji Lang) a mluvíš česky.
Tvým úkolem je:
1. Vzít zadaný český výraz nebo větu: "${czechText}"
2. Analyzovat jeho význam a filosoficky ho zjednodušit na základní koncepty Toki Pona (~120 slov pu).
3. Vytvořit gramaticky perfektní překlad do Toki Pona (se správným užitím částic 'li', 'e', 'la', 'pi', 'o').
4. Udělat podrobný malý rozbor:
   - doslovný překlad (literalBreakdown)
   - rozbor slovo po slovu (wordByWord: česká část -> použité slovo v toki pona -> proč bylo zvoleno)
   - aplikovaná gramatická pravidla (grammarRulesApplied)
   - filosofická poznámka (philosophicalNote - jak Toki Pona nahlíží na tento koncept)
   - alternativní způsoby vyjádření (alternativeExpressions - 1 až 2 jiné pohledy)

Vrať VÝHRADNĚ platný JSON ve tvaru:
{
  "tokiPonaSentence": "přeložená věta v toki pona",
  "literalBreakdown": "doslovný význam v češtině (např. 'člověk dobrý jí plod sladký')",
  "wordByWord": [
    {
      "czPart": "část české věty",
      "tpWord": "slovo v toki pona",
      "reason": "proč je toto slovo v kontextu použito"
    }
  ],
  "grammarRulesApplied": [
    "pravidlo 1 (např. částice 'li' vynechána, protože podmětem je samostatné 'mi')",
    "pravidlo 2"
  ],
  "philosophicalNote": "krátké vysvětlení, jak Toki Pona zjednodušuje tento pojem",
  "alternativeExpressions": [
    "jiná možnost v toki pona (s českým významem)"
  ]
}`;

  for (const modelName of FALLBACK_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });
      const text = cleanJsonString(response.text || '{}');
      const parsed = JSON.parse(text);
      return {
        tokiPonaSentence: parsed.tokiPonaSentence || '',
        literalBreakdown: parsed.literalBreakdown || '',
        wordByWord: Array.isArray(parsed.wordByWord) ? parsed.wordByWord : [],
        grammarRulesApplied: Array.isArray(parsed.grammarRulesApplied) ? parsed.grammarRulesApplied : [],
        philosophicalNote: parsed.philosophicalNote || '',
        alternativeExpressions: Array.isArray(parsed.alternativeExpressions) ? parsed.alternativeExpressions : [],
      };
    } catch (err) {
      if (String(err).includes('404') || String(err).includes('NOT_FOUND')) {
        continue;
      }
      console.warn('Czech to TP AI error:', err);
      break;
    }
  }

  throw new Error('Nepodařilo se vygenerovat AI rozbor pro zadaný český text.');
}

/**
 * Vygeneruje kompletní interaktivní kurz na libovolné zadané téma do mapy lekcí.
 */
export async function generateTokiPonaCourseWithGemini({
  topic,
  level = 'střední',
  apiKey,
}: {
  topic: string;
  level?: 'začátečník' | 'střední' | 'pokročilý';
  apiKey?: string;
}): Promise<import('../types/index.ts').UnitSection> {
  const effectiveKey = apiKey || getStoredGeminiKey();
  if (!effectiveKey) {
    throw new Error('Pro vygenerování kurzu s AI je potřeba připojit Gemini API klíč.');
  }

  const ai = new GoogleGenAI({ apiKey: effectiveKey });
  const uniqueId = `custom-${Date.now()}`;

  const prompt = `Jsi autor vzdělávacích kurzů pro Toki Pona ve stylu Duolingo.
Uživatel si přeje vygenerovat nový ucelený kurz (UnitSection) na téma: "${topic}".
Úroveň náročnosti: ${level}. Celá komunikace a instrukce musí být v češtině, jazyk cvičení je Toki Pona.

Vytvoř sekci, která obsahuje 2 až 3 lekce (nodes). Každá lekce musí obsahovat 3 až 4 různorodé interaktivní otázky:
- 'multiple_choice_cz_to_tp' (výběr z možností: překlad z češtiny do toki pona)
- 'multiple_choice_tp_to_cz' (výběr z možností: překlad z toki pona do češtiny)
- 'word_scramble' (sestavení věty z dostupných slov - wordsAvailable musí obsahovat VŠECHNA slova ze správné odpovědi PLUS 2 až 3 matoucí slova navíc!)
- 'fill_in_blank' (doplňovačka - tpSentence obsahuje '___', options obsahuje možnosti včetně správné)

DŮLEŽITÁ PRAVIDLA PRO OTÁZKY:
1. U 'word_scramble':
   - 'correctAnswer' MUSÍ být pole stringů ve správném pořadí, např. ["mi", "moku", "e", "kili"].
   - 'wordsAvailable' MUSÍ být pole stringů, které obsahuje všechna slova z correctAnswer plus 2-3 slova navíc jako návnadu!
2. U 'multiple_choice_*' a 'fill_in_blank':
   - 'correctAnswer' je string (přesně shodný s jednou z položek v 'options').
   - 'options' má 3 až 4 možnosti.
3. Všechna použitá slova v Toki Pona musí být autentická z oficiálního seznamu (nimi pu)!
4. 'unitColor' zvol ze: 'emerald', 'amber', 'purple', 'sky', 'rose', 'indigo'.

Vrať VÝHRADNĚ platný JSON ve tvaru odpovídajícím rozhraní UnitSection:
{
  "id": "${uniqueId}",
  "title": "Sekce: Název tématu v češtině",
  "description": "Stručný popis toho, co se student v kurzu naučí",
  "color": "sky",
  "nodes": [
    {
      "id": "${uniqueId}-l1",
      "unitId": "${uniqueId}",
      "unitTitle": "Sekce: Název tématu",
      "unitColor": "sky",
      "title": "Název 1. lekce",
      "subtitle": "Klíčová slova oddělená čárkou",
      "iconName": "Sparkles",
      "grammarNote": "Vysvětlení gramatiky a jak se téma v Toki Pona vyjadřuje.",
      "newWords": ["slovo1", "slovo2", "slovo3"],
      "xpReward": 25,
      "questions": [
        {
          "id": "${uniqueId}-q1",
          "type": "multiple_choice_cz_to_tp",
          "prompt": "Česká otázka",
          "options": ["možnost A", "možnost B", "možnost C"],
          "correctAnswer": "možnost A",
          "explanation": "České vysvětlení správné odpovědi."
        },
        {
          "id": "${uniqueId}-q2",
          "type": "word_scramble",
          "prompt": "Sestav větu: '...'",
          "czSentence": "český překlad",
          "wordsAvailable": ["slovoA", "slovoB", "slovoC", "slovoD", "slovoE"],
          "correctAnswer": ["slovoA", "slovoB", "slovoC"],
          "explanation": "Vysvětlení větné stavby."
        }
      ]
    }
  ]
}`;

  for (const modelName of FALLBACK_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.4,
        },
      });
      const text = cleanJsonString(response.text || '{}');
      const parsed: import('../types/index.ts').UnitSection = JSON.parse(text);
      if (parsed && parsed.title && Array.isArray(parsed.nodes) && parsed.nodes.length > 0) {
        // Ensure proper IDs
        parsed.id = parsed.id || uniqueId;
        parsed.color = parsed.color || 'sky';
        parsed.nodes.forEach((n, idx) => {
          n.id = n.id || `${parsed.id}-l${idx + 1}`;
          n.unitId = parsed.id;
          n.unitTitle = parsed.title;
          n.unitColor = parsed.color;
        });
        return parsed;
      }
    } catch (err) {
      if (String(err).includes('404') || String(err).includes('NOT_FOUND')) {
        continue;
      }
      console.warn('Course generation model error:', err);
      break;
    }
  }

  throw new Error('Generování kurzu selhalo. Zkontrolujte prosím připojení a platnost API klíče.');
}

