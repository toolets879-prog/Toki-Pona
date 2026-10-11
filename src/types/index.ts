export type TabType = 'learn' | 'dictionary' | 'phrases' | 'translator' | 'voice' | 'profile';

export interface TokiPonaWord {
  word: string;
  category: 'podstatné jméno' | 'přídavné jméno' | 'sloveso' | 'částice' | 'citoslovce' | 'zájmeno' | 'předložka' | 'číslovka';
  topicCategory: 'zaklad' | 'lide' | 'priroda' | 'jidlo' | 'akce' | 'emoce' | 'veci' | 'popis' | 'filosofie';
  translationCz: string;
  definition: string;
  examples: {
    tp: string;
    cz: string;
    explanation?: string;
  }[];
  sitelenPonaGlyph?: string; // Unicode or character representation
  sitelenPonaSymbol?: string;
  audioPronunciation?: string;
}

export type QuestionType =
  | 'multiple_choice_cz_to_tp'
  | 'multiple_choice_tp_to_cz'
  | 'word_scramble'
  | 'fill_in_blank'
  | 'listen_and_pick'
  | 'true_or_false';

export interface LessonQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  subPrompt?: string;
  tpSentence?: string;
  czSentence?: string;
  options?: string[];
  correctAnswer: string | string[];
  wordsAvailable?: string[]; // for word scramble
  hint?: string;
  explanation: string;
}

export interface LessonNode {
  id: string;
  unitId: string;
  unitTitle: string;
  unitColor: string;
  title: string;
  subtitle: string;
  iconName: string;
  grammarNote: string;
  newWords: string[];
  xpReward: number;
  questions: LessonQuestion[];
}

export interface UnitSection {
  id: string;
  title: string;
  description: string;
  color: string;
  nodes: LessonNode[];
}

export interface PhraseItem {
  id: string;
  tokiPona: string;
  czech: string;
  literalCzech: string;
  category: 'pozdravy' | 'zaklady' | 'pocity' | 'jidlo' | 'priroda' | 'filosofie';
  context: string;
}

export interface UserProgressState {
  uid: string;
  displayName: string;
  email?: string;
  xp: number;
  hearts: number;
  maxHearts: number;
  lastHeartRegenTime: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: string[];
  unlockedNodes: string[];
  savedWords: string[];
  learnedWordsCount: number;
  geminiApiKey: string;
}

export interface VoiceChatMessage {
  id: string;
  sender: 'ai' | 'user';
  tokiPona: string;
  czechTranslation?: string;
  timestamp: number;
}
