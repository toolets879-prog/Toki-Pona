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
import { explainTokiPonaSentenceWithGemini } from '../../lib/gemini.ts';

interface TranslatorProps {
  apiKey?: string;
  onOpenApiKeyModal: () => void;
}

export const Translator: React.FC<TranslatorProps> = ({
  apiKey,
  onOpenApiKeyModal,
}) => {
  const [direction, setDirection] = useState<'tp_to_cz' | 'cz_to_tp'>('tp_to_cz');
  const [inputText, setInputText] = useState('toki pona li pona tawa mi');
  const [aiAnalysis, setAiAnalysis] = useState<{
    translation: string;
    grammaticalBreakdown: string[];
    tips: string;
  } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleSentences = [
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
      // rough cz to tp reverse matching
      const words = inputText.toLowerCase().split(/\s+/);
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
    setLoadingAi(true);
    try {
      const res = await explainTokiPonaSentenceWithGemini(inputText, apiKey);
      setAiAnalysis(res);
    } catch {
      setAiAnalysis({
        translation: 'Chyba při komunikaci.',
        grammaticalBreakdown: ['Zkontrolujte API klíč.'],
        tips: '',
      });
    } finally {
      setLoadingAi(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-1.5">
            <Languages className="w-3.5 h-3.5 text-blue-600" />
            <span>Gramatický analyzátor & překlad</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Překladač Toki Pona
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Rozlož věty na základní částice li, e, la, pi a získej lingvistický rozbor.
          </p>
        </div>

        {/* Direction Switcher */}
        <button
          onClick={() => {
            sound.playClick();
            setDirection(direction === 'tp_to_cz' ? 'cz_to_tp' : 'tp_to_cz');
            setAiAnalysis(null);
          }}
          className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all flex items-center gap-2 text-xs font-black text-slate-800 cursor-pointer self-start sm:self-auto"
        >
          <span>{direction === 'tp_to_cz' ? 'Toki Pona' : 'Čeština'}</span>
          <ArrowRightLeft className="w-4 h-4 text-blue-600" />
          <span>{direction === 'tp_to_cz' ? 'Čeština' : 'Toki Pona'}</span>
        </button>
      </div>

      {/* Quick Sample Sentences */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 shrink-0">Zkusit větu:</span>
        {sampleSentences.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => {
              sound.playClick();
              setInputText(sample);
              setAiAnalysis(null);
            }}
            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-amber-100 text-[11px] font-bold text-slate-700 whitespace-nowrap transition-colors cursor-pointer border border-slate-200"
          >
            {sample}
          </button>
        ))}
      </div>

      {/* Main Translation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>{direction === 'tp_to_cz' ? 'Toki Pona' : 'Čeština'}</span>
              {direction === 'tp_to_cz' && (
                <button
                  onClick={() => sound.speakTokiPona(inputText)}
                  title="Přehrát výslovnost"
                  className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 cursor-pointer"
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
              }}
              placeholder={
                direction === 'tp_to_cz'
                  ? 'Zadej větu v Toki Pona (např. mi moku e kili)...'
                  : 'Zadej českou větu (např. Mám rád ovoce)...'
              }
              className="w-full text-base sm:text-lg font-bold text-slate-900 focus:outline-hidden resize-none placeholder:text-slate-300 font-heading"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
            <span>{tokens.length} slov</span>
            {inputText && (
              <button
                onClick={() => setInputText('')}
                className="hover:text-slate-600 font-bold cursor-pointer"
              >
                Vymazat
              </button>
            )}
          </div>
        </div>

        {/* Output Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 to-white border border-amber-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-amber-700 mb-2">
              <span>{direction === 'tp_to_cz' ? 'Český význam' : 'Toki Pona'}</span>
              <button
                onClick={() => handleCopy(aiAnalysis?.translation || ruleBasedTranslation)}
                title="Kopírovat překlad"
                className="p-1 rounded-lg text-amber-700 hover:bg-amber-100 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="text-base sm:text-lg font-extrabold text-emerald-900 font-heading min-h-[96px] leading-relaxed">
              {aiAnalysis?.translation || ruleBasedTranslation || (
                <span className="text-slate-300 font-normal text-sm">
                  Překlad se zobrazí zde...
                </span>
              )}
            </div>
          </div>

          {/* AI Call to Action */}
          <div className="border-t border-amber-200/50 pt-3 flex items-center justify-between">
            <span className="text-[11px] text-amber-800 font-medium">
              Linguistic parser
            </span>
            <button
              onClick={handleDeepAiAnalyze}
              disabled={loadingAi || !inputText.trim()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{loadingAi ? 'Analyzuji...' : 'Hloubkový AI rozbor'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Deep Analysis Section if returned */}
      {aiAnalysis && (
        <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-md space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold font-heading text-base">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>AI Lingvistický a filosofický rozbor (Google Gemini)</span>
          </div>

          {aiAnalysis.grammaticalBreakdown && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Struktura věty:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                {aiAnalysis.grammaticalBreakdown.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {aiAnalysis.tips && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
              💡 {aiAnalysis.tips}
            </div>
          )}
        </div>
      )}

      {/* Syntactic Structure Breakdown */}
      {grammarBreakdown && grammarBreakdown.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Gramatický rozpad věty</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {grammarBreakdown.map((part, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1"
              >
                <div className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                  {part.label}
                </div>
                <div className="font-black text-sm text-slate-900 font-heading">
                  {part.value}
                </div>
                <div className="text-[11px] text-slate-500">{part.desc}</div>
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
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : token.match
                    ? 'bg-white border-slate-200 text-slate-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-black text-sm font-heading">{token.word}</span>
                  {token.match?.sitelenPonaSymbol && (
                    <span className="text-lg">{token.match.sitelenPonaSymbol}</span>
                  )}
                </div>
                <div className="text-xs text-emerald-800 font-semibold truncate mt-0.5">
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
