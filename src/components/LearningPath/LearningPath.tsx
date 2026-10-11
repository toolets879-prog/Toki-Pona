import React, { useState } from 'react';
import {
  Check,
  Lock,
  Star,
  Sparkles,
  Trophy,
  Gift,
  HelpCircle,
} from 'lucide-react';
import { LEARNING_SECTIONS } from '../../data/learningPath.ts';
import { LessonNode, UserProgressState } from '../../types/index.ts';
import { NodePreviewModal } from './NodePreviewModal.tsx';
import { sound } from '../../lib/audio.ts';
import confetti from 'canvas-confetti';

interface LearningPathProps {
  progress: UserProgressState;
  onStartLesson: (node: LessonNode) => void;
  onOpenPractice: () => void;
}

export const LearningPath: React.FC<LearningPathProps> = ({
  progress,
  onStartLesson,
  onOpenPractice,
}) => {
  const [selectedNode, setSelectedNode] = useState<LessonNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedChests, setOpenedChests] = useState<string[]>([]);

  const handleNodeClick = (node: LessonNode, isUnlocked: boolean) => {
    if (!isUnlocked) {
      sound.playIncorrect();
      return;
    }
    sound.playClick();
    setSelectedNode(node);
    setIsModalOpen(true);
  };

  const handleOpenChest = (sectionId: string) => {
    if (openedChests.includes(sectionId)) return;
    sound.playFanfare();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
    setOpenedChests([...openedChests, sectionId]);
  };

  // Horizontal offsets for Duolingo winding effect (center, right, center, left)
  const getOffsetClass = (index: number) => {
    const mod = index % 4;
    switch (mod) {
      case 0:
        return 'translate-x-0';
      case 1:
        return 'translate-x-12 sm:translate-x-16';
      case 2:
        return 'translate-x-0';
      case 3:
        return '-translate-x-12 sm:-translate-x-16';
      default:
        return 'translate-x-0';
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Welcome banner & Quick Action */}
      <div className="mb-8 p-5 rounded-3xl bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Duolingo pro Toki Pona</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
            kama sona e toki pona!
          </h2>
          <p className="text-amber-50 text-xs sm:text-sm mt-1 max-w-md">
            Nauč se 120 slov a objev nejjednodušší jazyk světa. Postupuj po cestě, sbírej XP a udržuj svůj streak!
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              onClick={onOpenPractice}
              className="px-4 py-2 rounded-xl bg-white text-emerald-800 text-xs font-extrabold shadow-sm hover:bg-emerald-50 transition-all cursor-pointer"
            >
              Rychlý trénink frází
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/15 text-xs font-bold">
              <span>Splněno {progress.completedLessons.length} lekcí</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-6 text-8xl opacity-20 font-bold select-none pointer-events-none">
          󱥪
        </div>
      </div>

      {/* Sections and Winding Path */}
      <div className="space-y-12">
        {LEARNING_SECTIONS.map((section, sIndex) => {
          const completedInSection = section.nodes.filter((n) =>
            progress.completedLessons.includes(n.id)
          ).length;
          const isSectionComplete = completedInSection === section.nodes.length;
          const isChestClaimed = openedChests.includes(section.id);

          return (
            <div key={section.id} className="relative">
              {/* Section Header Card */}
              <div
                className={`p-5 rounded-3xl mb-8 border shadow-sm transition-all ${
                  isSectionComplete
                    ? 'bg-emerald-50/80 border-emerald-200'
                    : 'bg-white border-amber-100'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 block">
                      Úroveň {sIndex + 1}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                      {section.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {section.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      {completedInSection} / {section.nodes.length}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full mt-3.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(completedInSection / section.nodes.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Winding Nodes */}
              <div className="flex flex-col items-center gap-7 relative py-2">
                {section.nodes.map((node, nIndex) => {
                  const isCompleted = progress.completedLessons.includes(node.id);
                  const isUnlocked =
                    isCompleted || progress.unlockedNodes.includes(node.id);
                  const isCurrent = isUnlocked && !isCompleted;
                  const offsetClass = getOffsetClass(nIndex);

                  return (
                    <div
                      key={node.id}
                      className={`relative flex flex-col items-center transition-transform ${offsetClass}`}
                    >
                      {/* Active Tooltip Badge */}
                      {isCurrent && (
                        <div className="absolute -top-10 px-3 py-1 rounded-xl bg-emerald-500 text-white text-[11px] font-black tracking-wide shadow-md animate-bounce flex items-center gap-1 z-20">
                          <span>ZAČÍT</span>
                          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-emerald-500 rotate-45" />
                        </div>
                      )}

                      {/* Lesson Circle Button */}
                      <button
                        onClick={() => handleNodeClick(node, isUnlocked)}
                        disabled={!isUnlocked}
                        className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md group ${
                          isCompleted
                            ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-200 hover:scale-105 hover:bg-amber-300'
                            : isCurrent
                            ? 'bg-emerald-500 text-white ring-8 ring-emerald-100 hover:scale-105 shadow-emerald-200 shadow-xl'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-80'
                        }`}
                      >
                        {/* Node Inner Icon */}
                        {isCompleted ? (
                          <div className="flex flex-col items-center">
                            <Check className="w-8 h-8 stroke-[3]" />
                            <div className="flex items-center gap-0.5 -mt-1">
                              <Star className="w-2.5 h-2.5 fill-amber-950 text-amber-950" />
                              <Star className="w-2.5 h-2.5 fill-amber-950 text-amber-950" />
                              <Star className="w-2.5 h-2.5 fill-amber-950 text-amber-950" />
                            </div>
                          </div>
                        ) : isCurrent ? (
                          <div className="flex flex-col items-center">
                            <Sparkles className="w-8 h-8 animate-spin-slow" />
                          </div>
                        ) : (
                          <Lock className="w-7 h-7 text-slate-400" />
                        )}
                      </button>

                      {/* Node Title Label */}
                      <div className="mt-2 text-center max-w-[140px]">
                        <span
                          className={`text-xs font-extrabold block truncate ${
                            isUnlocked ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {node.title}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {node.subtitle}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Section Milestone Chest */}
                <div className="mt-6 flex flex-col items-center">
                  <button
                    onClick={() => handleOpenChest(section.id)}
                    disabled={!isSectionComplete}
                    className={`relative p-5 rounded-3xl border transition-all cursor-pointer flex flex-col items-center gap-2 group ${
                      isSectionComplete
                        ? isChestClaimed
                          ? 'bg-amber-100/70 border-amber-300 text-amber-900 shadow-sm'
                          : 'bg-gradient-to-b from-amber-300 to-yellow-400 border-amber-400 text-amber-950 shadow-lg hover:scale-105 animate-pulse'
                        : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {isChestClaimed ? (
                      <>
                        <Trophy className="w-8 h-8 text-amber-700" />
                        <span className="text-[11px] font-black uppercase tracking-wider">
                          Odměna vybrána!
                        </span>
                      </>
                    ) : (
                      <>
                        <Gift className="w-8 h-8 text-amber-900 group-hover:rotate-12 transition-transform" />
                        <span className="text-[11px] font-black uppercase tracking-wider">
                          {isSectionComplete ? 'Otevřít truhlu (+50 XP)' : 'Zamčená truhla'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Node Preview Modal */}
      <NodePreviewModal
        node={selectedNode}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartLesson={(node) => {
          setIsModalOpen(false);
          onStartLesson(node);
        }}
        isCompleted={
          selectedNode
            ? progress.completedLessons.includes(selectedNode.id)
            : false
        }
      />
    </div>
  );
};
