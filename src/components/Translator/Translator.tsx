import React, { useState, useMemo } from 'react';
import {
  Languages,
  ArrowRightLeft,
  Sparkles,
  Volume2,
  Copy,
  Check,
  BookOpen,
  Info,
  Lightbulb,
} from 'lucide-react';
import { TOKI_PONA_DICTIONARY } from '../../data/tokiPonaDictionary.ts';
import { sound } from '../../lib/audio.ts';
import { explainTokiPonaSentenceWithGemini, analyzeCzechToTokiPonaWithGemini } from '../../lib/gemini.ts';
import { CzechToTokiPonaAnalysis } from '../../types/index.ts';

interface TranslatorProps {
  apiKey?: string;
  onOpenApiKeyModal: () => void;
}

export const Translator: React.FC<TranslatorProps> = ({
  apiKey,
  onOpenApiKeyModal,
}) => {
  const [direction, setDirection] = useState<'tp_to_cz' | 'cz_to_tp'>('cz_to_tp');
  const [inputText, setInputText] = useState('Můj dobrý přítel vaří výborné jídlo pro celou rodinu.');
  const [aiAnalysis, setAiAnalysis] = useState<{
    translation: string;
    grammaticalBreakdown: string[];
    tips: string;
  } | null>(null);
  const [czAnalysis, setCzAnalysis] = useState<CzechToTokiPonaAnalysis | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [copied, setCopied] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const sampleSentencesCz = [
    'Můj dobrý přítel vaří výborné jídlo pro celou rodinu.',
    'Chci se naučit tento jednoduchý jazyk.',
    'Včera v noci jsem viděl krásné hvězdy na obloze.',
    'Pes běží rychle k velkému jezeru.',
    'Všechno na světě je dobré a jednoduché.',
  ];

  const sampleSentencesTp = [
    'toki pona li pona tawa mi',
    'mi moku e kili suwi',
    'ona li lukin e tomo suli',
    'tenpo suno la mi pali',
    'jan pona li awen lon tomo',
    'ale li pona a!',
  ];

  // Tokenize and find known Toki Pona words
  const tokens = useMemo(() => {
    const cleaned = inputText.toLowerCase().replace(/[.,!?;:]/g, '');
    const words = cleaned.split(/\s+/).filter(Boolean);
    return words.map((w) => {
      const match = TOKI_PONA_DICTIONARY.find((dict) => dict.word === w);
      return {
        word: w,
        match,
        isParticle: ['li', 'e', 'la', 'pi', 'o', 'en', 'anu'].includes(w),
      };
    });
  }, [inputText]);

  // Grammatical breakdown analysis
  const grammarBreakdown = useMemo(() => {
    if (direction !== 'tp_to_cz' || !inputText.trim()) return null;

    const lower = inputText.toLowerCase().trim();
    const hasLa = lower.includes(' la ');
    const hasLi = lower.includes(' li ');
    const hasE = lower.includes(' e ');
    const hasPi = lower.includes(' pi ');
    const hasO = lower.startsWith('o ') || lower.includes(' o ');

    const parts: { label: string; value: string; desc: string }[] = [];

    if (hasLa) {
      const splitLa = lower.split(' la ');
      parts.push({
        label: 'Kontext / Podmínka (la)',
        value: splitLa[0],
        desc: 'Určuje čas, místo nebo podmínku ("když / jestliže")',
      });
    }

    if (hasO) {
      parts.push({
        label: 'Rozkaz / Přání / Oslovení (o)',
        value: lower,
        desc: 'Částice o nahrazuje li u rozkazu nebo slouží k oslovení',
      });
    } else if (hasLi) {
      const splitLi = lower.split(' li ');
      parts.push({
        label: 'Podmět (Subject)',
        value: splitLi[0],
        desc: 'Kdo nebo co koná děj',
      });

      if (hasE) {
        const predicatePart = splitLi[1] || '';
        const splitE = predicatePart.split(' e ');
        parts.push({
          label: 'Sloveso / Přísudek',
          value: splitE[0],
          desc: 'Činnost nebo stav oddělený částicí li',
        });
        parts.push({
          label: 'Přímý předmět (e)',
          value: splitE[1] || '',
          desc: 'Koho/co děj zasahuje (akuzativ)',
        });
      } else {
        parts.push({
          label: 'Přísudek / Vlastnost',
          value: splitLi[1] || '',
          desc: 'Co podmět dělá nebo jaký je',
        });
      }
    } else if (lower.startsWith('mi ') || lower.startsWith('sina ')) {
      parts.push({
        label: 'Podmět (mi / sina)',
        value: lower.split(' ')[0],
        desc: 'U samostatného "mi" a "sina" se částice li nepoužívá',
      });
      parts.push({
        label: 'Přísudek',
        value: lower.split(' ').slice(1).join(' '),
        desc: 'Činnost nebo vlastnost',
      });
    }

    if (hasPi) {
      parts.push({
        label: 'Modifikátor (pi)',
        value: 'Obsahuje seskupení frází pomocí "pi"',
        desc: 'Sdružuje více přívlastků dohromady',
      });
    }

    return parts;
  }, [inputText, direction]);

  // Rule-based rough translation
  const ruleBasedTranslation = useMemo(() => {
    if (!inputText.trim()) return '';
    if (direction === 'tp_to_cz') {
      const czWords = tokens.map((t) => {
        if (t.word === 'li') return '→';
        if (t.word === 'e') return '▸';
        if (t.word === 'la') return '⟦když/v kontextu⟧';
        if (t.word === 'pi') return '⟨patřící k⟩';
        if (t.word === 'o') return '!';
        return t.match ? t.match.translationCz.split(',')[0] : t.word;
      });
      return czWords.join(' ');
    } else {
      // rough cz to tp reverse dictionary lookup
      const words = inputText.toLowerCase().replace(/[.,!?;:]/g, '').split(/\s+/).filter(Boolean);
      const tpWords = words.map((w) => {
        const found = TOKI_PONA_DICTIONARY.find(
          (dict) =>
            dict.translationCz.toLowerCase().includes(w) ||
            dict.definition.toLowerCase().includes(w)
        );
        return found ? found.word : `[${w}]`;
      });
      return tpWords.join(' ');
    }
  }, [tokens, direction, inputText]);

  const handleDeepAiAnalyze = async () => {
    if (!inputText.trim()) return;
    setLoadingAi(true);
    setAiError(null);
    sound.playClick();

    try {
      if (direction === 'cz_to_tp') {
        const res = await analyzeCzechToTokiPonaWithGemini(inputText, apiKey);
        setCzAnalysis(res);
        setAiAnalysis(null);
        sound.playCorrect();
      } else {
        const res = await explainTokiPonaSentenceWithGemini(inputText, apiKey);
        setAiAnalysis(res);
        setCzAnalysis(null);
        sound.playCorrect();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setAiError(msg || 'Chyba při komunikaci s AI.');
      sound.playIncorrect();
    } finally {
      setLoadingAi(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-1.5">
            <Languages className="w-3.5 h-3.5 text-blue-600" />
            <span>Gramatický analyzátor & překlad</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
            Překladač Toki Pona
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">
            Rozlož věty na základní částice li, e, la, pi a získej lingvistický rozbor.
          </p>
        </div>

        {/* Direction Switcher */}
        <button
          onClick={() => {
            sound.playClick();
            const newDir = direction === 'tp_to_cz' ? 'cz_to_tp' : 'tp_to_cz';
            setDirection(newDir);
            setInputText(
              newDir === 'cz_to_tp'
                ? 'Můj dobrý přítel vaří výborné jídlo pro celou rodinu.'
                : 'toki pona li pona tawa mi'
            );
            setAiAnalysis(null);
            setCzAnalysis(null);
            setAiError(null);
          }}
          className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xs transition-all flex items-center justify-center gap-2 text-xs font-black text-slate-800 dark:text-slate-200 cursor-pointer"
        >
          <span>{direction === 'cz_to_tp' ? 'Čeština' : 'Toki Pona'}</span>
          <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>{direction === 'cz_to_tp' ? 'Toki Pona' : 'Čeština'}</span>
        </button>
      </div>

      {/* Quick Sample Sentences */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0">Vyzkoušet větu:</span>
        {(direction === 'cz_to_tp' ? sampleSentencesCz : sampleSentencesTp).map((sample, idx) => (
          <button
            key={idx}
            onClick={() => {
              sound.playClick();
              setInputText(sample);
              setAiAnalysis(null);
              setCzAnalysis(null);
              setAiError(null);
            }}
            className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            {sample}
          </button>
        ))}
      </div>

      {/* Main Translation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              <span>{direction === 'tp_to_cz' ? 'Toki Pona' : 'Čeština (Vstup)'}</span>
              {direction === 'tp_to_cz' && (
                <button
                  onClick={() => sound.speakTokiPona(inputText)}
                  title="Přehrát výslovnost"
                  className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setAiAnalysis(null);
                setCzAnalysis(null);
                setAiError(null);
              }}
              placeholder={
                direction === 'tp_to_cz'
                  ? 'Zadej větu v Toki Pona (např. mi moku e kili)...'
                  : 'Zadej český výraz nebo větu k překladu a rozboru...'
              }
              className="w-full text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 bg-transparent focus:outline-hidden resize-none placeholder:text-slate-300 dark:placeholder:text-slate-600 font-heading"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
            <span>{inputText.trim() ? inputText.trim().split(/\s+/).length : 0} slov</span>
            {inputText && (
              <button
                onClick={() => {
                  setInputText('');
                  setAiAnalysis(null);
                  setCzAnalysis(null);
                  setAiError(null);
                }}
                className="hover:text-slate-600 dark:hover:text-slate-300 font-bold cursor-pointer"
              >
                Vymazat
              </button>
            )}
          </div>
        </div>

        {/* Output Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 to-white dark:from-slate-900 dark:to-slate-850 border border-amber-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
              <span className="flex items-center gap-1.5">
                <span>{direction === 'tp_to_cz' ? 'Český význam' : 'Toki Pona Překlad'}</span>
                {direction === 'cz_to_tp' && czAnalysis && (
                  <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
                    AI Analyzováno
                  </span>
                )}
              </span>
              <div className="flex items-center gap-1">
                {direction === 'cz_to_tp' && (czAnalysis?.tokiPonaSentence || ruleBasedTranslation) && (
                  <button
                    onClick={() => sound.speakTokiPona(czAnalysis?.tokiPonaSentence || ruleBasedTranslation)}
                    title="Přehrát Toki Pona výslovnost"
                    className="p-1 rounded-lg text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() =>
                    handleCopy(
                      direction === 'cz_to_tp'
                        ? czAnalysis?.tokiPonaSentence || ruleBasedTranslation
                        : aiAnalysis?.translation || ruleBasedTranslation
                    )
                  }
                  title="Kopírovat překlad"
                  className="p-1 rounded-lg text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-base sm:text-lg font-extrabold text-emerald-950 dark:text-emerald-300 font-heading min-h-[96px] leading-relaxed">
              {direction === 'cz_to_tp' ? (
                czAnalysis?.tokiPonaSentence ? (
                  <div className="space-y-1">
                    <span className="text-xl sm:text-2xl text-emerald-900 dark:text-emerald-300 block font-heading">
                      {czAnalysis.tokiPonaSentence}
                    </span>
                    {czAnalysis.literalBreakdown && (
                      <span className="text-xs text-amber-900 dark:text-amber-300 font-semibold block pt-1 border-t border-amber-200/60 dark:border-slate-800">
                        Doslovný význam: „{czAnalysis.literalBreakdown}“
                      </span>
                    )}
                  </div>
                ) : (
                  ruleBasedTranslation || (
                    <span className="text-slate-300 dark:text-slate-600 font-normal text-sm">
                      Zadej český text a klikni na AI překlad s rozborem...
                    </span>
                  )
                )
              ) : (
                aiAnalysis?.translation || ruleBasedTranslation || (
                  <span className="text-slate-300 dark:text-slate-600 font-normal text-sm">
                    Překlad se zobrazí zde...
                  </span>
                )
              )}
            </div>
          </div>

          {/* AI Call to Action */}
          <div className="border-t border-amber-200/50 dark:border-slate-800 pt-3 flex items-center justify-between">
            <span className="text-[11px] text-amber-800 dark:text-amber-400 font-medium">
              {direction === 'cz_to_tp' ? 'Lingvistický AI rozbor' : 'Linguistic parser'}
            </span>
            <button
              onClick={handleDeepAiAnalyze}
              disabled={loadingAi || !inputText.trim()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {loadingAi
                  ? 'AI analyzuje výraz...'
                  : direction === 'cz_to_tp'
                  ? 'AI Přeložit a rozebrat'
                  : 'Hloubkový AI rozbor'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Error Notification */}
      {aiError && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 text-xs font-medium flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
          <span>{aiError}</span>
        </div>
      )}

      {/* Enhanced Czech to Toki Pona AI Breakdown Section */}
      {direction === 'cz_to_tp' && czAnalysis && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200 transition-colors">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5 text-emerald-950 dark:text-emerald-200 font-black font-heading text-lg">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>AI Lingvistický a filosofický rozbor českého výrazu</span>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Přeloženo do Toki Pona
            </span>
          </div>

          {/* Word by word breakdown cards */}
          {czAnalysis.wordByWord && czAnalysis.wordByWord.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Rozbor slovo od slova (Proč byla zvolena tato slova):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {czAnalysis.wordByWord.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-slate-800/80 border border-amber-200/80 dark:border-slate-700 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-amber-200/40 dark:border-slate-700 pb-1">
                      <span>Český pojem:</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-bold">{item.czPart}</strong>
                    </div>
                    <div className="text-base font-black text-emerald-900 dark:text-emerald-400 font-heading">
                      → {item.tpWord}
                    </div>
                    <div className="text-xs text-amber-950 dark:text-slate-300 leading-relaxed font-medium">
                      {item.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applied Grammar Rules */}
          {czAnalysis.grammarRulesApplied && czAnalysis.grammarRulesApplied.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Použitá gramatická pravidla:
              </h4>
              <ul className="space-y-1.5">
                {czAnalysis.grammarRulesApplied.map((rule, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-start gap-2"
                  >
                    <span className="text-emerald-600 dark:text-emerald-400 font-black">✓</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Philosophical Note */}
          {czAnalysis.philosophicalNote && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 border border-purple-200 dark:border-purple-900/60 text-xs text-purple-950 dark:text-purple-200 font-medium space-y-1">
              <span className="font-extrabold uppercase tracking-wider text-[11px] text-purple-800 dark:text-purple-300 block">
                🧠 Filosofický pohled Toki Pona:
              </span>
              <p className="leading-relaxed">{czAnalysis.philosophicalNote}</p>
            </div>
          )}

          {/* Alternative Expressions */}
          {czAnalysis.alternativeExpressions && czAnalysis.alternativeExpressions.length > 0 && (
            <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Alternativní možnosti vyjádření:
              </h4>
              <div className="flex flex-wrap gap-2">
                {czAnalysis.alternativeExpressions.map((alt, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Deep Analysis Section for Toki Pona -> Czech */}
      {direction === 'tp_to_cz' && aiAnalysis && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 shadow-md space-y-4 animate-in fade-in duration-200 transition-colors">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-extrabold font-heading text-base">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>AI Lingvistický a filosofický rozbor (Google Gemini)</span>
          </div>

          {aiAnalysis.grammaticalBreakdown && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Struktura věty:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {aiAnalysis.grammaticalBreakdown.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {aiAnalysis.tips && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-xs text-amber-950 dark:text-amber-200 font-medium">
              💡 {aiAnalysis.tips}
            </div>
          )}
        </div>
      )}

      {/* Syntactic Structure Breakdown */}
      {grammarBreakdown && grammarBreakdown.length > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Gramatický rozpad věty</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {grammarBreakdown.map((part, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1"
              >
                <div className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {part.label}
                </div>
                <div className="font-black text-sm text-slate-900 dark:text-slate-100 font-heading">
                  {part.value}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{part.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Word-by-word token lookup chips */}
      {tokens.length > 0 && direction === 'tp_to_cz' && (
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Detekovaná slova ve větě:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {tokens.map((token, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border ${
                  token.isParticle
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                    : token.match
                    ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-black text-sm font-heading">{token.word}</span>
                  {token.match?.sitelenPonaSymbol && (
                    <span className="text-lg">{token.match.sitelenPonaSymbol}</span>
                  )}
                </div>
                <div className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold truncate mt-0.5">
                  {token.match ? token.match.translationCz : 'neznámé slovo'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
