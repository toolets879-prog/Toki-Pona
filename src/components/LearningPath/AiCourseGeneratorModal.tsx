import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Wand2,
  BookOpen,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { UnitSection } from '../../types/index.ts';
import { generateTokiPonaCourseWithGemini } from '../../lib/gemini.ts';
import { sound } from '../../lib/audio.ts';

interface AiCourseGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onOpenApiKeyModal: () => void;
  onCourseGenerated: (section: UnitSection) => void;
}

export const AiCourseGeneratorModal: React.FC<AiCourseGeneratorModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onOpenApiKeyModal,
  onCourseGenerated,
}) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<'začátečník' | 'střední' | 'pokročilý'>('střední');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const topicIdeas = [
    { title: 'Cestování a dobrodružství', prompt: 'Cestování, orientace v prostoru, hory, les a řeka' },
    { title: 'Vaření a hostina', prompt: 'Příprava jídla, pití, sladkosti a společná večeře s přáteli' },
    { title: 'Moderní technologie v Toki Pona', prompt: 'Počítače, internet, telefony a robotika popsané jednoduše' },
    { title: 'Hudba a umění', prompt: 'Zpěv, malování, hudební nástroje a tanec' },
    { title: 'Počasí a roční období', prompt: 'Déšť, bouře, slunce, sníh, vítr a střídání času' },
    { title: 'Hvězdy a vesmír', prompt: 'Noční obloha, hvězdy, měsíc a nekonečno' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Zadejte prosím téma pro nový kurz.');
      return;
    }

    if (!apiKey) {
      setError('Pro vygenerování kurzu pomocí Google AI je zapotřebí připojit bezplatný Gemini API klíč.');
      return;
    }

    setError(null);
    setIsGenerating(true);
    sound.playClick();

    try {
      const generatedSection = await generateTokiPonaCourseWithGemini({
        topic: topic.trim(),
        level,
        apiKey,
      });

      sound.playFanfare();
      onCourseGenerated(generatedSection);
      onClose();
    } catch (err: unknown) {
      console.error('Failed to generate course:', err);
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'Při tvorbě kurzu došlo k chybě. Zkuste to prosím znovu.');
      sound.playIncorrect();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 p-6 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner">
              <Wand2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full mb-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Google AI Generátor</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-heading leading-tight">
                Vytvoř si vlastní kurz
              </h3>
            </div>
          </div>
          <p className="text-purple-100 text-xs mt-2 leading-relaxed">
            Napiš libovolné téma a Google Gemini ti okamžitě sestaví novou sekci lekcí s interaktivními kvízy a přidá ji přímo na tvoji mapu.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* API Key Check */}
          {!apiKey && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Chybí Gemini API klíč</span>
              </div>
              <p>
                Generování vlastních lekcí využívá Google Gemini model. Připojte si bezplatný API klíč a můžete tvořit neomezeně kurzů.
              </p>
              <button
                onClick={onOpenApiKeyModal}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Připojit API klíč nyní
              </button>
            </div>
          )}

          {/* Topic Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
              O čem se chceš v Toki Pona učit?
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="např. Příprava jídla v kuchyni, Cesta vlakem, Medicína..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:outline-hidden font-bold text-sm text-slate-900 placeholder:text-slate-300"
            />
          </div>

          {/* Difficulty Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
              Obtížnost lekcí:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['začátečník', 'střední', 'pokročilý'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`py-2 px-3 rounded-xl border-2 text-xs font-bold capitalize transition-all cursor-pointer ${
                    level === lvl
                      ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Preset topic ideas */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Nápady na oblíbená témata:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {topicIdeas.map((idea, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTopic(idea.prompt)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-200"
                >
                  {idea.title}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="px-4 py-3 rounded-2xl text-slate-500 hover:text-slate-700 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            Zrušit
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>AI tvoří nový kurz (chvilku strpení)...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Vygenerovat a přidat na mapu</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
