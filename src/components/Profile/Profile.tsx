import React from 'react';
import {
  User,
  Sparkles,
  Trophy,
  Flame,
  Heart,
  BookOpen,
  Calendar,
  Cloud,
  CheckCircle2,
  RefreshCw,
  LogOut,
  LogIn,
  ShieldCheck,
} from 'lucide-react';
import { UserProgressState } from '../../types/index.ts';
import { sound } from '../../lib/audio.ts';

interface ProfileProps {
  progress: UserProgressState;
  isAuthenticated: boolean;
  onSignInGoogle: () => void;
  onSignOut: () => void;
  onRefillHearts: () => void;
  onResetProgress: () => void;
}

export const Profile: React.FC<ProfileProps> = ({
  progress,
  isAuthenticated,
  onSignInGoogle,
  onSignOut,
  onRefillHearts,
  onResetProgress,
}) => {
  // Determine rank based on XP
  const getRank = (xp: number) => {
    if (xp >= 600) {
      return { title: 'jan lawa pi toki pona', desc: 'Mistr jazyka Toki Pona', color: 'text-amber-600', badge: '👑' };
    }
    if (xp >= 300) {
      return { title: 'jan sona', desc: 'Pokročilý znalec', color: 'text-purple-600', badge: '🔮' };
    }
    if (xp >= 100) {
      return { title: 'jan pi toki pona', desc: 'Mluvčí Toki Pona', color: 'text-emerald-600', badge: '🌱' };
    }
    return { title: 'jan sin', desc: 'Nováček a objevitel', color: 'text-blue-600', badge: '🐣' };
  };

  const rank = getRank(progress.xp);

  // 7 days weekly streak calendar mockup based on current streak
  const daysOfWeek = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
  const todayIdx = (new Date().getDay() + 6) % 7; // Monday = 0

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Profile Card Header */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-inner">
            {rank.badge}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black font-heading text-slate-900">
                {progress.displayName}
              </h2>
              {isAuthenticated && (
                <span title="Účet synchronizován s databází" className="text-emerald-600">
                  <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-black uppercase tracking-wider ${rank.color}`}>
                {rank.title}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{rank.desc}</span>
            </div>
            {progress.email && (
              <p className="text-xs text-slate-400 mt-1">{progress.email}</p>
            )}
          </div>
        </div>

        {/* Auth Action */}
        <div className="self-start sm:self-auto">
          {isAuthenticated ? (
            <button
              onClick={onSignOut}
              className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Odhlásit účet</span>
            </button>
          ) : (
            <button
              onClick={onSignInGoogle}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Propojit Google účet</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* XP Card */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-amber-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Celkem XP</span>
            <Sparkles className="w-4 h-4 fill-amber-400" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-heading">
            {progress.xp}
          </div>
          <p className="text-[11px] text-slate-400">Zkušenosti z lekcí a mluvení</p>
        </div>

        {/* Streak Card */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-orange-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Dny v řadě</span>
            <Flame className="w-4 h-4 fill-orange-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-heading">
            {progress.streak}
          </div>
          <p className="text-[11px] text-slate-400">Udržuj svůj denní plamínek</p>
        </div>

        {/* Lessons Completed */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Lekce</span>
            <Trophy className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-heading">
            {progress.completedLessons.length}
          </div>
          <p className="text-[11px] text-slate-400">Dokončených uzlů na cestě</p>
        </div>

        {/* Vocabulary Saved */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Oblíbená slova</span>
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-heading">
            {progress.savedWords.length}
          </div>
          <p className="text-[11px] text-slate-400">Uložených pro rychlé opakování</p>
        </div>
      </div>

      {/* Weekly Activity Calendar */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Týdenní aktivita
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400">Tento týden</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day, idx) => {
            const isActive = idx <= todayIdx;
            const isToday = idx === todayIdx;

            return (
              <div
                key={day}
                className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border transition-all ${
                  isToday
                    ? 'border-orange-400 bg-orange-50/70 shadow-xs ring-2 ring-orange-200'
                    : isActive
                    ? 'border-slate-200 bg-slate-50'
                    : 'border-slate-100 bg-slate-50/40 text-slate-300'
                }`}
              >
                <span className="text-[10px] font-bold text-slate-500 uppercase">{day}</span>
                <Flame
                  className={`w-5 h-5 ${
                    isActive ? 'text-orange-500 fill-orange-500' : 'text-slate-200'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Cloud Persistence & Database status */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Ukládání dat & Synchronizace
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Aktivní ukládání</span>
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Váš postup (XP, streak, odemčené lekce a uložená slovíčka) je nepřetržitě ukládán v zabezpečeném cloudu. Přihlášením přes Google propojíte svůj postup s vaším účtem napříč všemi zařízeními.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              sound.playCorrect();
              onRefillHearts();
            }}
            className="px-4 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer border border-rose-200 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Doplnit plná srdíčka (5/5)</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Opravdu si přejete resetovat svůj postup?')) {
                onResetProgress();
              }
            }}
            className="px-4 py-2.5 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer ml-auto"
          >
            Resetovat postup
          </button>
        </div>
      </div>
    </div>
  );
};
