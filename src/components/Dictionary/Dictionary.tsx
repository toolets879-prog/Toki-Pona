import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  Star,
  BookOpen,
  Filter,
  Sparkles,
  Info,
} from 'lucide-react';
import { TOKI_PONA_DICTIONARY } from '../../data/tokiPonaDictionary.ts';
import { TokiPonaWord } from '../../types/index.ts';
import { sound } from '../../lib/audio.ts';

interface DictionaryProps {
  savedWords: string[];
  onToggleSaveWord: (word: string) => void;
}

export const Dictionary: React.FC<DictionaryProps> = ({
  savedWords,
  onToggleSaveWord,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [showOnlySaved, setShowOnlySaved] = useState(false);

  const topics = [
    { id: 'all', label: 'Všechna slova' },
    { id: 'zaklad', label: 'Základní' },
    { id: 'lide', label: 'Lidé & Tělo' },
    { id: 'priroda', label: 'Zvířata & Příroda' },
    { id: 'jidlo', label: 'Jídlo & Pití' },
    { id: 'akce', label: 'Akce & Slovesa' },
    { id: 'emoce', label: 'Emoce & Pocity' },
    { id: 'veci', label: 'Předměty & Nástroje' },
    { id: 'popis', label: 'Vlastnosti & Barvy' },
    { id: 'filosofie', label: 'Filosofie' },
  ];

  const filteredWords = useMemo(() => {
    return TOKI_PONA_DICTIONARY.filter((item) => {
      // Saved filter
      if (showOnlySaved && !savedWords.includes(item.word)) {
        return false;
      }

      // Topic filter
      if (selectedTopic !== 'all' && item.topicCategory !== selectedTopic) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesWord = item.word.toLowerCase().includes(q);
        const matchesCz = item.translationCz.toLowerCase().includes(q);
        const matchesDef = item.definition.toLowerCase().includes(q);
        return matchesWord || matchesCz || matchesDef;
      }

      return true;
    });
  }, [searchQuery, selectedTopic, showOnlySaved, savedWords]);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Oficiální slovník nimi pu a nimi ku</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Slovník Toki Pona
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Kompletní databáze {TOKI_PONA_DICTIONARY.length} slov s českými překlady, znaky Sitelen Pona a výslovností.
          </p>
        </div>

        {/* Saved count badge */}
        <button
          onClick={() => setShowOnlySaved(!showOnlySaved)}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto border ${
            showOnlySaved
              ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Star className={`w-4 h-4 ${showOnlySaved ? 'fill-amber-950' : 'text-amber-500'}`} />
          <span>Oblíbená slova ({savedWords.length})</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Hledat slovo v Toki Pona nebo česky (např. toki, přítel, voda, jíst)..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-xs placeholder:text-slate-400 font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            Vymazat
          </button>
        )}
      </div>

      {/* Topic Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {topics.map((t) => {
          const isSelected = selectedTopic === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                sound.playClick();
                setSelectedTopic(t.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Words Grid */}
      {filteredWords.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
          <Info className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-700 font-heading">
            Žádná slova nenalezena
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Zkuste upravit hledaný výraz nebo vybrat jinou kategorii.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((item) => {
            const isSaved = savedWords.includes(item.word);
            return (
              <div
                key={item.word}
                className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Top bar of card */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black font-heading text-slate-900 group-hover:text-amber-600 transition-colors">
                        {item.word}
                      </span>
                      {item.sitelenPonaSymbol && (
                        <span
                          title={`Sitelen Pona znak pro "${item.word}"`}
                          className="text-2xl text-amber-700/80 leading-none select-all"
                        >
                          {item.sitelenPonaSymbol}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => sound.speakTokiPona(item.word)}
                        title="Vyslovit slovo"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          sound.playClick();
                          onToggleSaveWord(item.word);
                        }}
                        title={isSaved ? 'Odebrat z oblíbených' : 'Uložit do oblíbených'}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            isSaved ? 'fill-amber-400 text-amber-500' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Category Pill */}
                  <div className="mb-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {item.category}
                    </span>
                  </div>

                  {/* Translation */}
                  <div className="font-extrabold text-sm text-emerald-800 mb-1.5">
                    {item.translationCz}
                  </div>

                  {/* Definition */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {item.definition}
                  </p>
                </div>

                {/* Example sentence */}
                {item.examples.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 mt-2 space-y-1">
                    <div className="text-[11px] font-bold text-slate-800 flex items-center justify-between">
                      <span className="font-heading text-amber-900">
                        {item.examples[0].tp}
                      </span>
                      <button
                        onClick={() => sound.speakTokiPona(item.examples[0].tp)}
                        title="Přehrát příklad"
                        className="text-slate-400 hover:text-emerald-600 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {item.examples[0].cz}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
