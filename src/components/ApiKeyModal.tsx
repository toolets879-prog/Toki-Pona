import React, { useState } from 'react';
import { Key, ExternalLink, CheckCircle2, AlertCircle, Eye, EyeOff, X, Sparkles } from 'lucide-react';
import { getStoredGeminiKey, saveStoredGeminiKey } from '../lib/gemini.ts';
import { GoogleGenAI } from '@google/genai';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSaved }) => {
  const [apiKey, setApiKey] = useState(getStoredGeminiKey());
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'Nejdříve zadejte svůj API klíč.' });
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      let success = false;
      let lastErr = '';
      for (const model of ['gemini-2.5-flash', 'gemini-flash-latest']) {
        try {
          const res = await ai.models.generateContent({
            model,
            contents: 'Odpověz jedním slovem v Toki Pona: pona.',
          });
          if (res.text) {
            success = true;
            break;
          }
        } catch (mErr) {
          lastErr = mErr instanceof Error ? mErr.message : String(mErr);
          if (lastErr.includes('404') || lastErr.includes('NOT_FOUND')) {
            continue;
          }
          break;
        }
      }
      if (success) {
        setTestResult({ success: true, message: 'Skvělé! API klíč je platný a funkční.' });
      } else {
        setTestResult({
          success: false,
          message: `Klíč nelze ověřit: ${lastErr || 'Chyba připojení'}`,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setTestResult({
        success: false,
        message: `Klíč nelze ověřit: ${msg.includes('403') || msg.includes('API key') ? 'Neplatný klíč nebo nepovolený přístup.' : msg}`,
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    saveStoredGeminiKey(apiKey);
    onSaved(apiKey.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-amber-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-amber-100">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading">Google Gemini API Klíč</h3>
              <p className="text-amber-100 text-sm">
                Pro hlasový mód a inteligentního AI učitele
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 text-sm text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Jak získat klíč zcela zdarma za 1 minutu?</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-xs text-amber-800">
              <li>Přejděte na oficiální portál Google AI Studio.</li>
              <li>Přihlaste se svým Google účtem.</li>
              <li>Klikněte na modré tlačítko <strong>"Create API key"</strong>.</li>
              <li>Zkopírujte vygenerovaný klíč a vložte jej níže.</li>
            </ol>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline mt-1 pt-1"
            >
              <span>Otevřít Google AI Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Váš Gemini API Klíč
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-3 pr-11 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Klíč se ukládá bezpečně ve vašem prohlížeči a je využíván pouze k přímým dotazům na Gemini.
            </p>
          </div>

          {/* Test Status */}
          {testResult && (
            <div
              className={`p-3.5 rounded-2xl flex items-start gap-2.5 text-xs font-medium ${
                testResult.success
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handleTestKey}
              disabled={testing || !apiKey.trim()}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
            >
              {testing ? 'Ověřuji...' : 'Otestovat klíč'}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Zrušit
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Uložit klíč
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
