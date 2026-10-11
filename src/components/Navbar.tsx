import React from 'react';
import {
  Compass,
  BookOpen,
  MessageCircle,
  Languages,
  Mic,
  User,
  Flame,
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  Key,
  LogIn,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import { TabType, UserProgressState } from '../types/index.ts';
import { sound } from '../lib/audio.ts';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  progress: UserProgressState;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenApiKeyModal: () => void;
  onSignInGoogle: () => void;
  onSignOut: () => void;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  progress,
  soundEnabled,
  onToggleSound,
  onOpenApiKeyModal,
  onSignInGoogle,
  onSignOut,
  isAuthenticated,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const tabs = [
    { id: 'learn' as TabType, label: 'Lekce', icon: Compass },
    { id: 'dictionary' as TabType, label: 'Slovníček', icon: BookOpen },
    { id: 'phrases' as TabType, label: 'Fráze', icon: MessageCircle },
    { id: 'translator' as TabType, label: 'Překladač', icon: Languages },
    { id: 'voice' as TabType, label: 'Voice AI', icon: Mic },
    { id: 'profile' as TabType, label: 'Profil', icon: User },
  ];

  return (
    <>
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-amber-100 dark:border-slate-800 shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
            {/* Brand Logo */}
            <div
              onClick={() => onSelectTab('learn')}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-400 group-hover:scale-105 transition-transform flex items-center justify-center shadow-xs text-xl sm:text-2xl font-bold text-amber-900 select-none">
                󱥪
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-amber-950 dark:text-amber-100 flex items-center gap-1.5 font-heading leading-tight">
                  toki pona
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hidden xs:inline-block">
                    učebnice
                  </span>
                </span>
                <p className="text-[11px] text-amber-700 dark:text-amber-400/80 font-medium hidden sm:block">
                  jazyk dobra a jednoduchosti
                </p>
              </div>
            </div>

            {/* Navigation Links - Desktop Only */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sound.playClick();
                      onSelectTab(tab.id);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-950 dark:text-amber-300 shadow-xs ring-1 ring-amber-300/60 dark:ring-amber-500/40'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-amber-50/60 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-amber-600 dark:text-amber-400 stroke-[2.5]' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* User Stats & Compact Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Streak */}
              <div
                title={`${progress.streak} dní v řadě!`}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-900/60 text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-extrabold"
              >
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 fill-orange-500 animate-pulse" />
                <span>{progress.streak}</span>
              </div>

              {/* Hearts */}
              <div
                title={`${progress.hearts} z ${progress.maxHearts} životů zbývá`}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-extrabold"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 fill-rose-500" />
                <span>{progress.hearts}</span>
              </div>

              {/* XP */}
              <div
                title={`${progress.xp} celkových zkušeností`}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-extrabold"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-400" />
                <span>{progress.xp} <span className="hidden xs:inline">XP</span></span>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={onToggleDarkMode}
                title={isDarkMode ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
                aria-label={isDarkMode ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
                className="p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-amber-400 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                {isDarkMode ? (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400/20" />
                ) : (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                )}
              </button>

              {/* API Key Modal Button */}
              <button
                onClick={onOpenApiKeyModal}
                title="Nastavit Gemini API klíč"
                aria-label="Nastavit Gemini API klíč"
                className="p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-amber-400 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400" />
              </button>

              {/* Audio Toggle */}
              <button
                onClick={onToggleSound}
                title={soundEnabled ? 'Zvuky zapnuty' : 'Zvuky ztlumeny'}
                aria-label={soundEnabled ? 'Zvuky zapnuty' : 'Zvuky ztlumeny'}
                className="p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                )}
              </button>

              {/* Auth Google Button (Desktop) */}
              {isAuthenticated ? (
                <button
                  onClick={onSignOut}
                  title="Odhlásit se"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Odhlásit</span>
                </button>
              ) : (
                <button
                  onClick={onSignInGoogle}
                  title="Přihlásit se přes Google"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs hover:shadow cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Přihlásit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar - Icons ONLY without text */}
      <nav
        aria-label="Mobilní navigace"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-amber-200/90 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] px-2 py-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex items-center justify-around transition-colors duration-200"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                onSelectTab(tab.id);
              }}
              title={tab.label}
              aria-label={tab.label}
              className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-150 cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-950 dark:text-amber-200 shadow-xs ring-1 ring-amber-300 dark:ring-amber-500/40'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-amber-50/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-transform ${
                  isActive ? 'text-amber-700 dark:text-amber-400 stroke-[2.5] scale-110' : 'text-slate-500 dark:text-slate-400'
                }`}
              />
              {/* Active Indicator Dot */}
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 animate-in zoom-in duration-150" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
