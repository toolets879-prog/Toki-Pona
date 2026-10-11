import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  Key,
  Sparkles,
  AlertCircle,
  RotateCcw,
  User,
  CheckCircle2,
  ExternalLink,
  Radio,
  ArrowRight,
} from 'lucide-react';
import { VoiceChatMessage } from '../../types/index.ts';
import { askGeminiTokiPonaTutor, getStoredGeminiKey, saveStoredGeminiKey } from '../../lib/gemini.ts';
import { sound } from '../../lib/audio.ts';

interface VoiceModeProps {
  apiKey: string;
  onOpenApiKeyModal: () => void;
  onGainXp: (amount: number) => void;
}

const VOICE_STORAGE_KEY = 'tokipona_voice_chat_messages_v1';

const DEFAULT_WELCOME_MESSAGE: VoiceChatMessage = {
  id: 'm-welcome',
  sender: 'ai',
  tokiPona: 'toki! mi jan Soweli. sina wile toki e seme?',
  czechTranslation: 'Ahoj! Jsem přítel Soweli. O čem si chceš povídat?',
  timestamp: Date.now(),
};

function loadStoredVoiceMessages(): VoiceChatMessage[] {
  if (typeof window === 'undefined') return [DEFAULT_WELCOME_MESSAGE];
  try {
    const raw = localStorage.getItem(VOICE_STORAGE_KEY);
    if (!raw) return [DEFAULT_WELCOME_MESSAGE];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [DEFAULT_WELCOME_MESSAGE];
  } catch {
    return [DEFAULT_WELCOME_MESSAGE];
  }
}

export const VoiceMode: React.FC<VoiceModeProps> = ({
  apiKey,
  onOpenApiKeyModal,
  onGainXp,
}) => {
  const [messages, setMessages] = useState<VoiceChatMessage[]>(loadStoredVoiceMessages());
  const [inputText, setInputText] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [conversationMode, setConversationMode] = useState<'beginner' | 'intermediate' | 'roleplay'>('beginner');
  const [showCzechTranslations, setShowCzechTranslations] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [inlineKeyInput, setInlineKeyInput] = useState('');
  const [autoSendOnSpeech, setAutoSendOnSpeech] = useState(true);

  // Effective API key
  const effectiveApiKey = apiKey || getStoredGeminiKey();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionInstanceRef = useRef<any>(null);

  // Check speech recognition support on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setSpeechSupported(false);
      }
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, interimTranscript]);

  // Persist messages whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      try {
        localStorage.setItem(VOICE_STORAGE_KEY, JSON.stringify(messages));
      } catch (err) {
        console.warn('Failed to save voice messages:', err);
      }
    }
  }, [messages]);

  const handleStartListening = async () => {
    setErrorMessage(null);

    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setErrorMessage('Váš prohlížeč nepodporuje Web Speech API. Můžete pohodlně psát do vstupního pole a AI bude odpovídat hlasem.');
      return;
    }

    // Explicitly test/prompt microphone permission first via getUserMedia if available
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Close test stream immediately so recognition can use the hardware
        stream.getTracks().forEach((track) => track.stop());
      } catch (micErr: any) {
        console.warn('Microphone permission query error:', micErr);
        if (micErr?.name === 'NotAllowedError' || micErr?.name === 'PermissionDeniedError') {
          setErrorMessage('Přístup k mikrofonu byl v prohlížeči zablokován. Povolte prosím mikrofon v adresním řádku nebo nastavení prohlížeče.');
          return;
        }
      }
    }

    try {
      // Stop previous instance if running
      if (recognitionInstanceRef.current) {
        try {
          recognitionInstanceRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'cs-CZ'; // captures vowels identically to Toki Pona

      recognition.onstart = () => {
        setIsListening(true);
        setInterimTranscript('');
        sound.playClick();
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (interim) {
          setInterimTranscript(interim);
        }

        if (final) {
          const finalClean = final.trim();
          setInputText(finalClean);
          setInterimTranscript('');
          setIsListening(false);
          sound.playCorrect();

          if (autoSendOnSpeech && finalClean.length > 0) {
            handleSendMessage(finalClean);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        setIsListening(false);
        setInterimTranscript('');

        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setErrorMessage('Přístup k mikrofonu je zamítnut. Povolte prosím mikrofon v nastavení prohlížeče (ikona zámku/nastavení v adresním řádku) nebo napište větu textem.');
        } else if (event.error === 'no-speech') {
          setErrorMessage('Nebyl zachycen žádný zvuk. Zkuste kliknout na mikrofon znovu a mluvit zblízka.');
        } else if (event.error === 'network') {
          setErrorMessage('Chyba sítě při rozpoznávání řeči. Zkontrolujte připojení k internetu, případně zadejte text klávesnicí.');
        } else {
          setErrorMessage(`Chyba mikrofonu: ${event.error}. Můžete také psát do textového pole.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionInstanceRef.current = recognition;
      recognition.start();
    } catch (err: unknown) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setErrorMessage('Nepodařilo se spustit mikrofon. Povolte přístup k mikrofonu v prohlížeči.');
    }
  };

  const handleStopListening = () => {
    if (recognitionInstanceRef.current) {
      try {
        recognitionInstanceRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    if (!effectiveApiKey) {
      setErrorMessage('Nejprve vložte svůj Google Gemini API klíč.');
      return;
    }

    sound.playClick();
    const userMsg: VoiceChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      tokiPona: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setInterimTranscript('');
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const history = messages.map((m) => ({
        sender: m.sender,
        text: m.tokiPona,
      }));

      const response = await askGeminiTokiPonaTutor({
        apiKey: effectiveApiKey,
        userMessage: text,
        conversationHistory: history,
        mode: conversationMode,
      });

      const aiMsg: VoiceChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        tokiPona: response.tokiPona,
        czechTranslation: response.czechTranslation,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      sound.speakTokiPona(response.tokiPona);
      onGainXp(10);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
      sound.playIncorrect();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveInlineKey = () => {
    if (!inlineKeyInput.trim()) return;
    saveStoredGeminiKey(inlineKeyInput.trim());
    window.location.reload(); // Re-hydrate state seamlessly
  };

  const quickPrompts = [
    { tp: 'toki!', cz: 'Ahoj!' },
    { tp: 'sina pilin seme?', cz: 'Jak se máš?' },
    { tp: 'mi wile moku.', cz: 'Mám hlad.' },
    { tp: 'telo li pona.', cz: 'Voda je dobrá.' },
    { tp: 'nimi sina li seme?', cz: 'Jak se jmenuješ?' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 text-xs font-bold mb-1.5 border border-purple-200/60 dark:border-purple-800/60">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Google Gemini AI Voice Chat</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
            Konverzace s jan Soweli
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">
            Mluv hlasem do mikrofonu nebo piš v Toki Pona se svým osobním AI učitelem.
          </p>
        </div>

        {/* API Key Status Badge */}
        {effectiveApiKey ? (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Gemini AI Aktivní</span>
            </span>
            <button
              onClick={onOpenApiKeyModal}
              title="Změnit API klíč"
              className="p-1.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <Key className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenApiKeyModal}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto animate-pulse"
          >
            <Key className="w-4 h-4" />
            <span>Připojit Gemini API Klíč</span>
          </button>
        )}
      </div>

      {/* Missing API key inline setup banner */}
      {!effectiveApiKey && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 border-2 border-amber-300 dark:border-amber-700/60 shadow-md space-y-4 transition-colors">
          <div className="flex items-start gap-3">
            <Key className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-extrabold text-amber-950 dark:text-amber-200 font-heading">
                Pro mluvení s Google AI je potřeba připojit bezplatný Gemini API klíč
              </h3>
              <p className="text-xs text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                Google poskytuje bezplatný API klíč pro osobní projekty. Získejte jej během 1 minuty na{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-amber-900 dark:text-amber-200 hover:text-black dark:hover:text-white inline-flex items-center gap-1"
                >
                  aistudio.google.com <ExternalLink className="w-3 h-3" />
                </a>{' '}
                a vložte jej přímo sem:
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <input
              type="password"
              value={inlineKeyInput}
              onChange={(e) => setInlineKeyInput(e.target.value)}
              placeholder="Vložte váš API klíč (AIzaSy...)"
              className="w-full sm:flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-slate-900 dark:text-slate-100 rounded-2xl text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-xs"
            />
            <button
              onClick={handleSaveInlineKey}
              disabled={!inlineKeyInput.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all cursor-pointer disabled:opacity-50 shrink-0"
            >
              Uložit a aktivovat
            </button>
          </div>
        </div>
      )}

      {/* Browser speech support warning if unsupported */}
      {!speechSupported && (
        <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200 text-xs flex items-center gap-2">
          <Radio className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>
            Váš prohlížeč nepodporuje přímé nahrávání hlasu (SpeechRecognition). Doporučujeme Google Chrome, Edge nebo Safari. Zprávy můžete psát textem a AI bude v Toki Pona hlasitě odpovídat.
          </span>
        </div>
      )}

      {/* Conversation Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
          <button
            onClick={() => setConversationMode('beginner')}
            className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
              conversationMode === 'beginner'
                ? 'bg-white dark:bg-slate-900 text-purple-950 dark:text-purple-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Začátečník
          </button>
          <button
            onClick={() => setConversationMode('roleplay')}
            className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
              conversationMode === 'roleplay'
                ? 'bg-white dark:bg-slate-900 text-purple-950 dark:text-purple-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Hraní rolí
          </button>
          <button
            onClick={() => setConversationMode('intermediate')}
            className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
              conversationMode === 'intermediate'
                ? 'bg-white dark:bg-slate-900 text-purple-950 dark:text-purple-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Pokročilý
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer font-bold select-none">
            <input
              type="checkbox"
              checked={autoSendOnSpeech}
              onChange={(e) => setAutoSendOnSpeech(e.target.checked)}
              className="rounded-md accent-purple-600"
            />
            <span>Auto-odeslat po domluvení</span>
          </label>

          <button
            onClick={() => setShowCzechTranslations(!showCzechTranslations)}
            className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer"
          >
            {showCzechTranslations ? 'Skrýt české překlady' : 'Zobrazit české překlady'}
          </button>
        </div>
      </div>

      {/* Interactive Avatar Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Animated Mascot */}
          <div
            className={`relative w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl font-bold shadow-inner ${
              isLoading || isListening ? 'animate-bounce' : ''
            }`}
          >
            󱥡
            {isLoading && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            )}
            {isListening && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading">jan Soweli</h3>
            <p className="text-xs text-purple-100">
              {isLoading
                ? 'Přemýšlím a mluvím...'
                : isListening
                ? '🔴 Poslouchám tvůj hlas... mluv teď!'
                : 'Připraven ke konverzaci v Toki Pona'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setMessages([
              {
                id: 'm-reset',
                sender: 'ai',
                tokiPona: 'toki! mi jan Soweli. sina wile toki e seme?',
                czechTranslation: 'Ahoj! Jsem přítel Soweli. O čem si chceš povídat?',
                timestamp: Date.now(),
              },
            ]);
          }}
          title="Restartovat konverzaci"
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Nová konverzace</span>
        </button>
      </div>

      {/* Live Speech Recognition Visualizer when isListening */}
      {isListening && (
        <div className="p-5 rounded-3xl bg-rose-500 text-white shadow-lg animate-in fade-in duration-150 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-6 bg-white rounded-full animate-bounce" />
              <span className="w-1.5 h-10 bg-white rounded-full animate-bounce [animation-delay:0.1s]" />
              <span className="w-1.5 h-8 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-5 bg-white rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
            <div>
              <div className="font-extrabold text-sm font-heading flex items-center gap-2">
                <span>Poslouchám váš hlas...</span>
              </div>
              <div className="text-xs text-rose-100">
                {interimTranscript
                  ? `Právě říkáte: "${interimTranscript}"`
                  : 'Mluvte do mikrofonu (např. řekněte "toki" nebo "mi moku")...'}
              </div>
            </div>
          </div>

          <button
            onClick={handleStopListening}
            className="px-5 py-2.5 rounded-2xl bg-white text-rose-600 font-extrabold text-xs shadow-md hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
          >
            Dokončit nahrávání
          </button>
        </div>
      )}

      {/* Chat Messages Display */}
      <div className="min-h-[280px] sm:min-h-[350px] max-h-[500px] overflow-y-auto p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isAi ? 'justify-start' : 'justify-end'
              }`}
            >
              {isAi && (
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 flex items-center justify-center text-lg font-bold shrink-0">
                  󱥡
                </div>
              )}

              <div
                className={`max-w-[80%] p-4 rounded-3xl space-y-1.5 shadow-xs ${
                  isAi
                    ? 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-tl-sm'
                    : 'bg-emerald-500 text-white rounded-tr-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-black text-sm sm:text-base font-heading">
                    {msg.tokiPona}
                  </div>
                  {isAi && (
                    <button
                      onClick={() => sound.speakTokiPona(msg.tokiPona)}
                      title="Poslechnout výslovnost"
                      className="text-slate-400 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {isAi && msg.czechTranslation && showCzechTranslations && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium pt-1 border-t border-slate-200/60 dark:border-slate-700">
                    🇨🇿 {msg.czechTranslation}
                  </div>
                )}
              </div>

              {!isAi && (
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-sm font-bold shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 flex items-center justify-center text-lg font-bold">
              󱥡
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              <span>jan Soweli formuluje odpověď v Toki Pona...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Quick Phrase Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0">Nápověda odpovědi:</span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.tp)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 disabled:opacity-50"
          >
            {p.tp} <span className="text-slate-400 dark:text-slate-500 font-normal">({p.cz})</span>
          </button>
        ))}
      </div>

      {/* Input & Voice Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Microphone Toggle Button */}
        <button
          onClick={() => {
            if (isListening) {
              handleStopListening();
            } else {
              handleStartListening();
            }
          }}
          disabled={isLoading}
          title={isListening ? 'Zastavit nahrávání hlasu' : 'Stiskněte a mluvte mikrofonem'}
          aria-label={isListening ? 'Zastavit nahrávání hlasu' : 'Stiskněte a mluvte mikrofonem'}
          className={`p-3 sm:p-4 rounded-2xl transition-all cursor-pointer shadow-md disabled:opacity-50 shrink-0 ${
            isListening
              ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
              : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 text-slate-700 dark:text-slate-200 hover:bg-emerald-50/50 dark:hover:bg-slate-700'
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />}
        </button>

        {/* Text Input */}
        <div className="flex-1 relative min-w-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            placeholder={
              isListening
                ? 'Poslouchám váš hlas... mluvte teď...'
                : 'Věta v Toki Pona (např. toki!, mi moku...)'
            }
            disabled={isLoading}
            className="w-full px-3.5 py-3 sm:px-5 sm:py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-2xl text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-xs disabled:opacity-60 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputText.trim()}
          title="Odeslat zprávu"
          aria-label="Odeslat zprávu"
          className="p-3 sm:p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-md disabled:opacity-40 transition-all cursor-pointer shrink-0"
        >
          <Send className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};
