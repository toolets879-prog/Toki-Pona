import React from 'react';
import { Sparkles, BookOpen, Volume2, X, Play } from 'lucide-react';
import { LessonNode } from '../../types/index.ts';
import { sound } from '../../lib/audio.ts';
import { TOKI_PONA_DICTIONARY } from '../../data/tokiPonaDictionary.ts';

interface NodePreviewModalProps {
  node: LessonNode | null;
  isOpen: boolean;
  onClose: () => void;
  onStartLesson: (node: LessonNode) => void;
  isCompleted: boolean;
}

export const NodePreviewModal: React.FC<NodePreviewModalProps> = ({
  node,
  isOpen,
  onClose,
  onStartLesson,
  isCompleted,
}) => {
  if (!isOpen || !node) return null;

  const wordDetails = node.newWords.map((nw) => {
    return TOKI_PONA_DICTIONARY.find((w) => w.word === nw) || {
      word: nw,
      translationCz: '',
      sitelenPonaSymbol: '',
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-100 dark:border-slate-800 overflow-hidden transition-colors">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider text-emerald-100 mb-2">
            {node.unitTitle}
          </div>
          <h3 className="text-2xl font-bold font-heading">{node.title}</h3>
          <p className="text-emerald-100 text-sm mt-0.5">{node.subtitle}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Grammar Note */}
          <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm mb-1.5">
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Gramatické pravidlo lekce</span>
            </div>
            <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
              {node.grammarNote}
            </p>
          </div>

          {/* New Vocabulary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Nová slovíčka v této lekci:
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {wordDetails.map((w) => (
                <div
                  key={w.word}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/70 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl leading-none text-emerald-700 dark:text-emerald-400">
                      {w.sitelenPonaSymbol || '󱥪'}
                    </span>
                    <div className="truncate">
                      <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100 font-heading">
                        {w.word}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {w.translationCz}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => sound.speakTokiPona(w.word)}
                    title="Přehrát výslovnost"
                    className="p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>+{node.xpReward} XP za dokončení</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onStartLesson(node);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isCompleted ? 'Zopakovat lekci' : 'Začít lekci'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
