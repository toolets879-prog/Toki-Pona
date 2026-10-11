import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './firebase.ts';
import { UserProgressState } from '../types/index.ts';

const LOCAL_STORAGE_KEY = 'tokipona_user_progress_v1';

export const INITIAL_PROGRESS: UserProgressState = {
  uid: 'guest',
  displayName: 'jan sin (Začátečník)',
  email: '',
  xp: 0,
  hearts: 5,
  maxHearts: 5,
  lastHeartRegenTime: Date.now(),
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: [],
  unlockedNodes: ['lesson-1-1'],
  savedWords: ['toki', 'pona'],
  learnedWordsCount: 2,
  geminiApiKey: '',
};

export function loadLocalProgress(): UserProgressState {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_PROGRESS, ...parsed };
  } catch {
    return INITIAL_PROGRESS;
  }
}

export function saveLocalProgress(state: UserProgressState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save progress locally:', err);
  }
}

export async function fetchUserProgressFromFirestore(userId: string): Promise<UserProgressState | null> {
  const path = `users/${userId}`;
  try {
    const userDocRef = doc(db, 'users', userId);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data();
      const local = loadLocalProgress();
      return {
        ...local,
        uid: userId,
        displayName: data.displayName || local.displayName,
        email: data.email || local.email,
        xp: typeof data.xp === 'number' ? data.xp : local.xp,
        hearts: typeof data.hearts === 'number' ? data.hearts : local.hearts,
        streak: typeof data.streak === 'number' ? data.streak : local.streak,
        lastActiveDate: data.lastActiveDate || local.lastActiveDate,
        completedLessons: data.completedLessons ? data.completedLessons.split(',').filter(Boolean) : local.completedLessons,
        unlockedNodes: data.unlockedNodes ? data.unlockedNodes.split(',').filter(Boolean) : local.unlockedNodes,
        savedWords: data.savedVocabulary ? JSON.parse(data.savedVocabulary) : local.savedWords,
        customSections: data.customSections ? JSON.parse(data.customSections) : local.customSections || [],
      };
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}

export async function saveUserProgressToFirestore(state: UserProgressState) {
  if (!auth.currentUser || auth.currentUser.uid !== state.uid) return;
  const path = `users/${state.uid}`;
  try {
    const userDocRef = doc(db, 'users', state.uid);
    await setDoc(userDocRef, {
      uid: state.uid,
      displayName: state.displayName,
      email: auth.currentUser.email || '',
      xp: state.xp,
      hearts: state.hearts,
      streak: state.streak,
      lastActiveDate: state.lastActiveDate,
      completedLessons: state.completedLessons.join(','),
      unlockedNodes: state.unlockedNodes.join(','),
      savedVocabulary: JSON.stringify(state.savedWords),
      customSections: JSON.stringify(state.customSections || []),
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function calculateStreak(lastActiveDate: string, currentStreak: number): { streak: number; todayActive: boolean } {
  const today = new Date().toISOString().split('T')[0];
  if (lastActiveDate === today) {
    return { streak: Math.max(1, currentStreak), todayActive: true };
  }

  const lastDate = new Date(lastActiveDate);
  const now = new Date(today);
  const diffDays = Math.round((now.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

  if (diffDays === 1) {
    return { streak: currentStreak + 1, todayActive: true };
  } else if (diffDays > 1) {
    return { streak: 1, todayActive: true };
  }

  return { streak: currentStreak, todayActive: true };
}
