/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleAuthProvider } from './lib/firebase.ts';
import {
  TabType,
  UserProgressState,
  LessonNode,
} from './types/index.ts';
import {
  loadLocalProgress,
  saveLocalProgress,
  fetchUserProgressFromFirestore,
  saveUserProgressToFirestore,
  calculateStreak,
  INITIAL_PROGRESS,
} from './lib/storage.ts';
import { getStoredGeminiKey } from './lib/gemini.ts';
import { sound } from './lib/audio.ts';
import { LEARNING_SECTIONS } from './data/learningPath.ts';

import { Navbar } from './components/Navbar.tsx';
import { LearningPath } from './components/LearningPath/LearningPath.tsx';
import { LessonModal } from './components/LessonModal/LessonModal.tsx';
import { Dictionary } from './components/Dictionary/Dictionary.tsx';
import { Phrases } from './components/Phrases/Phrases.tsx';
import { Translator } from './components/Translator/Translator.tsx';
import { VoiceMode } from './components/VoiceMode/VoiceMode.tsx';
import { Profile } from './components/Profile/Profile.tsx';
import { ApiKeyModal } from './components/ApiKeyModal.tsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('learn');
  const [progress, setProgress] = useState<UserProgressState>(loadLocalProgress());
  const [activeLessonNode, setActiveLessonNode] = useState<LessonNode | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Dark Mode Theme State & Persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('tokipona_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tokipona_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tokipona_theme', 'light');
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isDarkMode ? '#090d16' : '#fef9ee');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    sound.playClick();
    setIsDarkMode((prev) => !prev);
  };

  // Initialize and listen to Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        // Fetch or create user record in Firestore
        const remoteProgress = await fetchUserProgressFromFirestore(user.uid);
        if (remoteProgress) {
          setProgress(remoteProgress);
          saveLocalProgress(remoteProgress);
        } else {
          // Sync current local progress to Firestore
          const updated: UserProgressState = {
            ...progress,
            uid: user.uid,
            displayName: user.displayName || progress.displayName,
            email: user.email || '',
          };
          setProgress(updated);
          saveLocalProgress(updated);
          await saveUserProgressToFirestore(updated);
        }
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update streak on mount
  useEffect(() => {
    const { streak, todayActive } = calculateStreak(progress.lastActiveDate, progress.streak);
    if (streak !== progress.streak || !todayActive) {
      updateProgress({
        streak,
        lastActiveDate: new Date().toISOString().split('T')[0],
      });
    }

    // Load gemini API key
    const key = getStoredGeminiKey();
    if (key && key !== progress.geminiApiKey) {
      updateProgress({ geminiApiKey: key });
    }
  }, []);

  // Heart regeneration timer (1 heart every 30 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev.hearts < prev.maxHearts) {
          const now = Date.now();
          const thirtyMinutes = 30 * 60 * 1000;
          if (now - prev.lastHeartRegenTime >= thirtyMinutes) {
            const updated = {
              ...prev,
              hearts: Math.min(prev.maxHearts, prev.hearts + 1),
              lastHeartRegenTime: now,
            };
            saveLocalProgress(updated);
            saveUserProgressToFirestore(updated);
            return updated;
          }
        }
        return prev;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const updateProgress = (partial: Partial<UserProgressState>) => {
    setProgress((prev) => {
      const next = { ...prev, ...partial };
      saveLocalProgress(next);
      saveUserProgressToFirestore(next);
      return next;
    });
  };

  const handleSignInGoogle = async () => {
    try {
      sound.playClick();
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      console.error('Google Sign In failed:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      sound.playClick();
      await signOut(auth);
    } catch (err) {
      console.error('Sign Out failed:', err);
    }
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.soundEnabled = next;
    if (next) sound.playClick();
  };

  const handleGainXp = (amount: number) => {
    updateProgress({ xp: progress.xp + amount });
  };

  const handleLoseHeart = () => {
    updateProgress({
      hearts: Math.max(0, progress.hearts - 1),
      lastHeartRegenTime: Date.now(),
    });
  };

  const handleRefillHearts = () => {
    updateProgress({
      hearts: progress.maxHearts,
      lastHeartRegenTime: Date.now(),
    });
  };

  const handleAddCustomSection = (section: import('./types/index.ts').UnitSection) => {
    const existing = progress.customSections || [];
    const updatedCustom = [...existing, section];
    // Unlock first node of new section
    const newUnlocked = [...progress.unlockedNodes];
    if (section.nodes.length > 0 && !newUnlocked.includes(section.nodes[0].id)) {
      newUnlocked.push(section.nodes[0].id);
    }
    updateProgress({
      customSections: updatedCustom,
      unlockedNodes: newUnlocked,
    });
  };

  const handleFinishLesson = (nodeId: string, xpEarned: number, heartsLeft: number) => {
    // Find all nodes in sequence (including custom sections)
    const allSections = [...LEARNING_SECTIONS, ...(progress.customSections || [])];
    const allNodes: LessonNode[] = [];
    allSections.forEach((s) => allNodes.push(...s.nodes));

    const currentIndex = allNodes.findIndex((n) => n.id === nodeId);
    const completedList = Array.from(new Set([...progress.completedLessons, nodeId]));

    // Unlock next node
    const unlockedList = Array.from(new Set([...progress.unlockedNodes, nodeId]));
    if (currentIndex >= 0 && currentIndex + 1 < allNodes.length) {
      unlockedList.push(allNodes[currentIndex + 1].id);
    }

    updateProgress({
      xp: progress.xp + xpEarned,
      hearts: heartsLeft,
      completedLessons: completedList,
      unlockedNodes: unlockedList,
      lastActiveDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleToggleSaveWord = (word: string) => {
    const current = progress.savedWords;
    const exists = current.includes(word);
    const updated = exists ? current.filter((w) => w !== word) : [...current, word];
    updateProgress({ savedWords: updated });
  };

  const handleResetProgress = () => {
    const reset = { ...INITIAL_PROGRESS, uid: progress.uid, displayName: progress.displayName, email: progress.email };
    setProgress(reset);
    saveLocalProgress(reset);
    saveUserProgressToFirestore(reset);
  };

  return (
    <div className="min-h-screen bg-amber-50/30 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Header Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        progress={progress}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onSignInGoogle={handleSignInGoogle}
        onSignOut={handleSignOut}
        isAuthenticated={isAuthenticated}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-16 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]">
        <div className={currentTab === 'learn' ? 'block' : 'hidden'}>
          <LearningPath
            progress={progress}
            onStartLesson={(node) => setActiveLessonNode(node)}
            onOpenPractice={() => setCurrentTab('phrases')}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            onAddCustomSection={handleAddCustomSection}
          />
        </div>

        <div className={currentTab === 'dictionary' ? 'block' : 'hidden'}>
          <Dictionary
            savedWords={progress.savedWords}
            onToggleSaveWord={handleToggleSaveWord}
          />
        </div>

        <div className={currentTab === 'phrases' ? 'block' : 'hidden'}>
          <Phrases onGainXp={handleGainXp} />
        </div>

        <div className={currentTab === 'translator' ? 'block' : 'hidden'}>
          <Translator
            apiKey={progress.geminiApiKey}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          />
        </div>

        <div className={currentTab === 'voice' ? 'block' : 'hidden'}>
          <VoiceMode
            apiKey={progress.geminiApiKey}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            onGainXp={handleGainXp}
          />
        </div>

        <div className={currentTab === 'profile' ? 'block' : 'hidden'}>
          <Profile
            progress={progress}
            isAuthenticated={isAuthenticated}
            onSignInGoogle={handleSignInGoogle}
            onSignOut={handleSignOut}
            onRefillHearts={handleRefillHearts}
            onResetProgress={handleResetProgress}
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />
        </div>
      </main>

      {/* Active Interactive Lesson Modal */}
      {activeLessonNode && (
        <LessonModal
          node={activeLessonNode}
          isOpen={Boolean(activeLessonNode)}
          hearts={progress.hearts}
          onClose={() => setActiveLessonNode(null)}
          onFinishLesson={handleFinishLesson}
          onLoseHeart={handleLoseHeart}
          onRefillHearts={handleRefillHearts}
        />
      )}

      {/* Gemini API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSaved={(key) => updateProgress({ geminiApiKey: key })}
      />
    </div>
  );
}
