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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand */}
          <div
            onClick={() => onSelectTab('learn')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-400 group-hover:scale-105 transition-transform flex items-center justify-center shadow-sm text-2xl font-bold text-amber-900">
              󱥪
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-amber-950 flex items-center gap-1.5 font-heading">
                toki pona
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  učebnice
                </span>
              </span>
              <p className="text-[11px] text-amber-700 font-medium hidden sm:block">
                jazyk dobra a jednoduchosti
              </p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
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
                      ? 'bg-amber-100 text-amber-950 shadow-xs ring-1 ring-amber-300/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/60'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-amber-600 stroke-[2.5]' : 'text-slate-400'
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Stats & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak */}
            <div
              title={`${progress.streak} dní v řadě!`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 text-xs sm:text-sm font-extrabold"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>{progress.streak}</span>
            </div>

            {/* Hearts */}
            <div
              title={`${progress.hearts} z ${progress.maxHearts} životů zbývá`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs sm:text-sm font-extrabold"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>{progress.hearts}</span>
            </div>

            {/* XP */}
            <div
              title={`${progress.xp} celkových zkušeností`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs sm:text-sm font-extrabold"
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{progress.xp} XP</span>
            </div>

            {/* API Key Modal Button */}
            <button
              onClick={onOpenApiKeyModal}
              title="Nastavit Gemini API klíč pro AI Voice mód"
              className="p-2 rounded-xl text-slate-600 hover:text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer border border-slate-200 bg-white"
            >
              <Key className="w-4 h-4 text-amber-600" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Zvuky zapnuty' : 'Zvuky ztlumeny'}
              className="p-2 rounded-xl text-slate-600 hover:text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer border border-slate-200 bg-white"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Auth Google Button */}
            {isAuthenticated ? (
              <button
                onClick={onSignOut}
                title="Odhlásit se"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Odhlásit</span>
              </button>
            ) : (
              <button
                onClick={onSignInGoogle}
                title="Přihlásit se přes Google pro trvalé uložení"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs hover:shadow cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Přihlásit</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-amber-100 bg-white/95 px-2 py-1.5">
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
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                isActive ? 'text-amber-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
