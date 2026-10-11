import React, { useState } from 'react';
import {
  MessageSquare,
  Volume2,
  RotateCw,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  BookOpen,
} from 'lucide-react';
import { PHRASES_DATA } from '../../data/phrases.ts';
import { PhraseItem } from '../../types/index.ts';
import { sound } from '../../lib/audio.ts';
import confetti from 'canvas-confetti';

interface PhrasesProps {
  onGainXp: (amount: number) => void;
}

export const Phrases: React.FC<PhrasesProps> = ({ onGainXp }) => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'catalog'>('flashcards');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Všechny fráze' },
    { id: 'pozdravy', label: 'Pozdravy & Loučení' },
    { id: 'zaklady', label: 'Základní konverzace' },
    { id: 'jidlo', label: 'Jídlo & Pohostinnost' },
    { id: 'pocity', label: 'Pocity & Vztahy' },
    { id: 'priroda', label: 'Příroda & Svět' },
    { id: 'filosofie', label: 'Daoistická filosofie' },
  ];

  const currentPhrase = PHRASES_DATA[currentIndex];

  const handleFlip = () => {
    sound.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % PHRASES_DATA.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + PHRASES_DATA.length) % PHRASES_DATA.length);
  };

  const handleMaster = (id: string) => {
    if (!masteredIds.includes(id)) {
      setMasteredIds([...masteredIds, id]);
      onGainXp(5);
      sound.playCorrect();
      if ((masteredIds.length + 1) % 5 === 0) {
        confetti({ particleCount: 50, spread: 60 });
      }
    }
    handleNext();
  };

  const filteredCatalog = PHRASES_DATA.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Praktická konverzace</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
            Procvičování frází
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">
            Trénuj nejpoužívanější obraty, pozdravy a životní moudra v jazyce Toki Pona.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto transition-colors">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'flashcards'
                ? 'bg-white dark:bg-slate-900 text-emerald-900 dark:text-emerald-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Kartičky (Flashcards)</span>
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'bg-white dark:bg-slate-900 text-emerald-900 dark:text-emerald-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Přehled frází</span>
          </button>
        </div>
      </div>

      {/* FLASHCARDS VIEW */}
      {activeTab === 'flashcards' && (
        <div className="max-w-lg mx-auto space-y-6">
          {/* Progress Tracker */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Kartička {currentIndex + 1} z {PHRASES_DATA.length}</span>
            <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Zvládnuto: {masteredIds.length} / {PHRASES_DATA.length}
            </span>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={handleFlip}
            className="relative min-h-[320px] rounded-3xl p-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer select-none group text-center"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
              <span className="font-bold uppercase tracking-wider">
                {currentPhrase.category}
              </span>
              <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Klikni pro otočení</span>
              </span>
            </div>

            {/* Front vs Back Card Content */}
            <div className="py-6 space-y-3">
              {!isFlipped ? (
                // FRONT: Toki Pona
                <div className="space-y-4">
                  <div className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-slate-100">
                    {currentPhrase.tokiPona}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.speakTokiPona(currentPhrase.tokiPona);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-colors cursor-pointer border border-emerald-200/60 dark:border-emerald-800/60"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Přehrát výslovnost</span>
                  </button>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    (Víš, co tato fráze znamená česky?)
                  </p>
                </div>
              ) : (
                // BACK: Czech translation & breakdown
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-heading">
                    {currentPhrase.czech}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Doslovný význam: <span className="italic text-slate-900 dark:text-slate-100 font-semibold">{currentPhrase.literalCzech}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-xs text-amber-950 dark:text-amber-200">
                    💡 {currentPhrase.context}
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer status */}
            <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              {masteredIds.includes(currentPhrase.id) ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Tuto frázi už máš zvládnutou</span>
                </span>
              ) : (
                <span>Klepnutím otoč na český překlad</span>
              )}
            </div>
          </div>

          {/* Navigation & Action Buttons */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              title="Předchozí kartička"
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleMaster(currentPhrase.id)}
              className="flex-1 py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Už umím! (+5 XP)</span>
            </button>

            <button
              onClick={handleNext}
              title="Další kartička"
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* CATALOG VIEW */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Phrases List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCatalog.map((phrase) => (
              <div
                key={phrase.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-sm transition-all space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-lg font-black font-heading text-slate-900 dark:text-slate-100">
                      {phrase.tokiPona}
                    </span>
                    <button
                      onClick={() => sound.speakTokiPona(phrase.tokiPona)}
                      title="Přehrát zvuk"
                      className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 cursor-pointer shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="font-extrabold text-sm text-emerald-800 dark:text-emerald-400">
                    {phrase.czech}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Doslova: <span className="italic">{phrase.literalCzech}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span>{phrase.context}</span>
                  <span className="uppercase font-bold text-[9px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {phrase.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
