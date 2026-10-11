import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  CheckCircle2,
  AlertCircle,
  Volume2,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import { LessonNode, LessonQuestion } from '../../types/index.ts';
import { sound } from '../../lib/audio.ts';
import confetti from 'canvas-confetti';

interface LessonModalProps {
  node: LessonNode;
  isOpen: boolean;
  hearts: number;
  onClose: () => void;
  onFinishLesson: (nodeId: string, xpEarned: number, heartsLeft: number) => void;
  onLoseHeart: () => void;
  onRefillHearts: () => void;
}

function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  node,
  isOpen,
  hearts,
  onClose,
  onFinishLesson,
  onLoseHeart,
  onRefillHearts,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedTokenIds, setSelectedTokenIds] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ: LessonQuestion = node.questions[currentQIndex];
  const progressPercent = ((currentQIndex) / node.questions.length) * 100;

  // Randomly shuffle multiple choice options for current question
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // Randomly shuffle word scramble tokens
  const [scrambleTokens, setScrambleTokens] = useState<{ id: string; word: string }[]>([]);

  // Whenever current question or lesson node changes, re-shuffle options and tokens
  useEffect(() => {
    if (currentQ.options && currentQ.options.length > 0) {
      let opts = shuffleArray(currentQ.options);
      // Guarantee it does not always leave correctAnswer as the first option if options > 1
      if (opts.length > 1 && opts[0] === currentQ.correctAnswer) {
        const randIndex = 1 + Math.floor(Math.random() * (opts.length - 1));
        [opts[0], opts[randIndex]] = [opts[randIndex], opts[0]];
      }
      setShuffledOptions(opts);
    } else {
      setShuffledOptions([]);
    }

    if (currentQ.wordsAvailable && currentQ.wordsAvailable.length > 0) {
      let shuffled = shuffleArray(currentQ.wordsAvailable);
      const correctArr = Array.isArray(currentQ.correctAnswer)
        ? currentQ.correctAnswer
        : [currentQ.correctAnswer];

      // Ensure the tokens are not in the exact answer order
      if (
        correctArr.length > 1 &&
        shuffled.slice(0, correctArr.length).every((w, i) => w === correctArr[i])
      ) {
        shuffled = shuffleArray(shuffled.reverse());
      }

      setScrambleTokens(
        shuffled.map((word, idx) => ({
          id: `tok-${idx}-${word}-${Math.random().toString(36).slice(2, 6)}`,
          word,
        }))
      );
    } else {
      setScrambleTokens([]);
    }
  }, [currentQIndex, node.id]);

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    sound.playClick();
    setSelectedOption(opt);
  };

  const handleAddScrambleToken = (tokenId: string) => {
    if (isAnswered) return;
    sound.playClick();
    setSelectedTokenIds([...selectedTokenIds, tokenId]);
  };

  const handleRemoveScrambleToken = (index: number) => {
    if (isAnswered) return;
    sound.playClick();
    const updated = [...selectedTokenIds];
    updated.splice(index, 1);
    setSelectedTokenIds(updated);
  };

  const handleCheckAnswer = () => {
    if (isAnswered) return;

    let correct = false;
    if (currentQ.type === 'word_scramble') {
      const assembledWords = selectedTokenIds
        .map((id) => scrambleTokens.find((t) => t.id === id)?.word)
        .filter(Boolean);
      const correctArr = Array.isArray(currentQ.correctAnswer)
        ? currentQ.correctAnswer
        : [currentQ.correctAnswer];
      correct =
        assembledWords.length === correctArr.length &&
        assembledWords.every((w, i) => w === correctArr[i]);
    } else {
      correct = selectedOption === currentQ.correctAnswer;
    }

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      sound.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playIncorrect();
      onLoseHeart();
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    setSelectedTokenIds([]);

    if (currentQIndex + 1 < node.questions.length) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Completed lesson!
      setIsLessonFinished(true);
      sound.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleClaimVictory = () => {
    onFinishLesson(node.id, node.xpReward, hearts);
    onClose();
  };

  // If user ran out of hearts
  if (hearts <= 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
            <Heart className="w-10 h-10 fill-rose-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-heading text-slate-900">
              Došla ti srdíčka!
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Nevadí, chyby jsou nejlepší způsob jak se učit. Můžeš si srdíčka ihned doplnit nebo zopakovat slovíčka.
            </p>
          </div>
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => {
                onRefillHearts();
                setIsAnswered(false);
                setSelectedOption(null);
                setSelectedTokenIds([]);
              }}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
            >
              Doplnit plná srdíčka (5/5) a pokračovat
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Vrátit se na mapu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Victory celebration screen
  if (isLessonFinished) {
    const accuracy = Math.round((correctCount / node.questions.length) * 100);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in zoom-in-95 duration-200">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-amber-950 shadow-lg animate-bounce">
            <Trophy className="w-12 h-12 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Lekce dokončena!
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-2">
              pona a! Skvělá práce!
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Úspěšně jsi zvládl(a) lekci <strong className="text-slate-800">{node.title}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-bold text-amber-700 block">Získané XP</span>
              <span className="text-2xl font-black text-amber-900">+{node.xpReward} XP</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-700 block">Úspěšnost</span>
              <span className="text-2xl font-black text-emerald-900">{accuracy}%</span>
            </div>
          </div>

          <button
            onClick={handleClaimVictory}
            className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Pokračovat na mapu</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Active Question view
  const canCheck =
    currentQ.type === 'word_scramble'
      ? selectedTokenIds.length > 0
      : selectedOption !== null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-hidden animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="max-w-4xl w-full mx-auto px-4 py-4 flex items-center justify-between gap-4 border-b border-slate-100">
        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-sm font-black">
          <Heart className="w-4 h-4 fill-rose-500" />
          <span>{hearts}</span>
        </div>
      </div>

      {/* Main Question Body */}
      <div className="flex-1 overflow-y-auto max-w-2xl w-full mx-auto px-4 py-6 sm:py-10 flex flex-col justify-center">
        {/* Question Prompt */}
        <div className="mb-6 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600">
            Otázka {currentQIndex + 1} z {node.questions.length}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-snug">
            {currentQ.prompt}
          </h2>
          {currentQ.subPrompt && (
            <p className="text-xs sm:text-sm text-slate-500">{currentQ.subPrompt}</p>
          )}

          {/* Pronunciation button if Toki Pona sentence is present */}
          {(currentQ.tpSentence || (currentQ.type === 'multiple_choice_tp_to_cz' && currentQ.prompt)) && (
            <button
              onClick={() => sound.speakTokiPona(currentQ.tpSentence || currentQ.prompt)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-colors cursor-pointer mt-1"
            >
              <Volume2 className="w-4 h-4" />
              <span>Poslechnout výslovnost</span>
            </button>
          )}
        </div>

        {/* Question Type: Multiple Choice / Fill-in / True-False */}
        {currentQ.type !== 'word_scramble' && shuffledOptions.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {shuffledOptions.map((option, idx) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-xs ring-2 ring-emerald-200'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span className="font-heading">{option}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Question Type: Word Scramble Block Builder */}
        {currentQ.type === 'word_scramble' && (
          <div className="space-y-6">
            {/* Target Assembly Area */}
            <div className="min-h-[70px] p-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-wrap items-center gap-2">
              {selectedTokenIds.length === 0 ? (
                <span className="text-xs text-slate-400 font-medium">
                  Klikáním na slova níže poskládej větu ve správném pořadí...
                </span>
              ) : (
                selectedTokenIds.map((tokenId, idx) => {
                  const token = scrambleTokens.find((t) => t.id === tokenId);
                  if (!token) return null;
                  return (
                    <button
                      key={tokenId}
                      onClick={() => handleRemoveScrambleToken(idx)}
                      disabled={isAnswered}
                      className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 font-extrabold text-sm shadow-xs hover:bg-rose-50 hover:border-rose-300 transition-colors cursor-pointer"
                    >
                      {token.word}
                    </button>
                  );
                })
              )}
            </div>

            {/* Available Word Pool */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              {scrambleTokens.map((token) => {
                const isUsed = selectedTokenIds.includes(token.id);

                return (
                  <button
                    key={token.id}
                    onClick={() => handleAddScrambleToken(token.id)}
                    disabled={isUsed || isAnswered}
                    className={`px-4 py-2.5 rounded-2xl border-2 font-black text-sm transition-all cursor-pointer shadow-xs ${
                      isUsed
                        ? 'border-transparent bg-slate-100 text-slate-300 cursor-not-allowed'
                        : 'border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 text-slate-800 active:scale-95'
                    }`}
                  >
                    {token.word}
                  </button>
                );
              })}
            </div>

            {/* Clear button */}
            {selectedTokenIds.length > 0 && !isAnswered && (
              <button
                onClick={() => setSelectedTokenIds([])}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mx-auto font-bold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Začít znovu</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Evaluation Bar */}
      <div
        className={`border-t transition-all duration-200 p-4 sm:p-6 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] ${
          !isAnswered
            ? 'bg-white border-slate-200'
            : isCorrect
            ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
            : 'bg-rose-50 border-rose-200 text-rose-950'
        }`}
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          {/* Feedback message */}
          {isAnswered && (
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0">
                <div className="font-extrabold text-sm sm:text-base font-heading">
                  {isCorrect ? 'Výborně! Správná odpověď!' : 'Těsně vedle!'}
                </div>
                <div className="text-xs sm:text-sm mt-0.5 opacity-90 break-words">
                  {currentQ.explanation}
                </div>
              </div>
            </div>
          )}

          {!isAnswered && <div className="hidden sm:block" />}

          {/* Action Button */}
          {!isAnswered ? (
            <button
              onClick={handleCheckAnswer}
              disabled={!canCheck}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 text-center"
            >
              Zkontrolovat
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl text-white font-extrabold text-sm shadow-md transition-all cursor-pointer shrink-0 text-center ${
                isCorrect ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              Další otázka
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
