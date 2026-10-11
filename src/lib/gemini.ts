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

