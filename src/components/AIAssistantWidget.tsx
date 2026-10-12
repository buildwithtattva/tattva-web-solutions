'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, Mic, MicOff, Send, X, Volume2, VolumeX, Shield, Languages, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  actions?: { label: string; href: string }[];
}

interface SpeechEvent {
  results: Array<Array<{ transcript: string }>>;
}

interface SpeechRecognizer {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: () => void;
  onresult: (event: SpeechEvent) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  abort?: () => void;
}

export const AIAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'mr'>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello! I am Tattva AI Assistant. I can speak English & Marathi (मराठी). Ask me about our websites, AI solutions, or custom software!',
      time: '10:00 AM',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakOutput, setSpeakOutput] = useState(true);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<SpeechRecognizer | null>(null);

  // Stop all active thinking, streaming, voice speech, and mic listening
  const stopAllAgentActions = () => {
    // 1. Abort in-flight network request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort('panel_closed');
      abortControllerRef.current = null;
    }
    setIsLoading(false);

    // 2. Stop voice speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // 3. Stop active microphone recording
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore if already stopped
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  // Clean up all agent resources on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort('unmount');
        abortControllerRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'mr' : 'en';
    setLanguage(newLang);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'assistant',
        text:
          newLang === 'mr'
            ? 'नमस्कार! आता मी मराठीत संवाद साधू शकतो. तुम्हाला तत्त्व सोल्यूशन्सबद्दल काय जाणून घ्यायचे आहे?'
            : 'Language switched to English. How can I assist you today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const speakText = (text: string) => {
    if (!speakOutput || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'mr' ? 'mr-IN' : 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Stop active speech and abort previous in-flight request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort('new_query');
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Hard ceiling: thinking time should not be longer than 20 seconds
    const timeoutId = setTimeout(() => {
      controller.abort('timeout');
    }, 20000);

    try {
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-6)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        }));

      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language, history: historyPayload }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.response || 'Thank you for your question.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: data.suggestedActions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      speakText(assistantMsg.text);
    } catch {
      clearTimeout(timeoutId);
      // If aborted because panel was closed or new query began, stop completely without error
      if (controller.signal.aborted) {
        if (controller.signal.reason === 'panel_closed' || controller.signal.reason === 'new_query') {
          return;
        }
        if (controller.signal.reason === 'timeout') {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: 'assistant',
              text:
                language === 'mr'
                  ? 'माफ करा, विचार करण्यास २० सेकंदांपेक्षा जास्त वेळ लागला. कृपया पुन्हा विचारा किंवा आमच्याशी थेट संपर्क साधा.'
                  : 'Thinking time exceeded the 20-second limit. Please try asking again or reach out to our team.',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              actions: [
                { label: 'Submit Project Inquiry', href: '/contact' },
                { label: 'Explore Services', href: '/services' },
              ],
            },
          ]);
          return;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'I apologize, I had trouble reaching our servers. Please try again.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      clearTimeout(timeoutId);
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      setIsLoading(false);
    }
  };

  const startListening = () => {
    // If currently listening, clicking mic stops listening immediately
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
      recognitionRef.current = null;
      setIsListening(false);
      return;
    }

    if (!privacyConsent) {
      setShowPrivacyNotice(true);
      return;
    }

    if (typeof window === 'undefined') return;

    const windowWithSpeech = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognizer;
      webkitSpeechRecognition?: new () => SpeechRecognizer;
    };

    const SpeechRecognitionClass =
      windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert('Speech Recognition is not supported by this browser. Please type your query.');
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognitionRef.current = recognition;
    recognition.lang = language === 'mr' ? 'mr-IN' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: SpeechEvent) => {
      const transcript = event.results[0]?.[0]?.transcript || '';
      setIsListening(false);
      recognitionRef.current = null;
      if (transcript) handleSend(transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };
    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
  };

  return (
    <>
      {/* FLOATING CYBERPUNK AI LAUNCHER BUTTON */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => {
            if (isOpen) {
              stopAllAgentActions();
              setIsOpen(false);
            } else {
              setIsOpen(true);
            }
          }}
          className="relative group p-3 sm:p-3.5 rounded-full bg-slate-950 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:border-pink-500 transition-all duration-300 flex items-center gap-2"
          aria-label="Open AI Assistant"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:text-pink-400 transition" />
          <span className="hidden sm:inline-block text-xs font-mono font-semibold tracking-wider text-cyan-300 pr-1">
            TATTVA AI
          </span>
        </button>
      </div>

      {/* CYBERPUNK CHATBOT DRAWER */}
      {isOpen && (
        <div className="fixed bottom-16 sm:bottom-20 right-2 sm:right-6 z-50 w-[calc(100vw-1rem)] sm:w-96 bg-slate-950/95 border-2 border-cyan-500/60 rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.3)] backdrop-blur-xl flex flex-col h-[480px] max-h-[78vh] overflow-hidden text-slate-100 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-slate-900 px-4 py-3 border-b border-cyan-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/50 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  Tattva Voice & AI
                </h3>
                <p className="text-[10px] text-slate-400 font-mono">Marathi & English Support</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleLanguage}
                className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono font-bold text-pink-400 hover:border-pink-500 transition flex items-center gap-1"
                title="Switch Language"
              >
                <Languages className="w-3 h-3" />
                <span>{language.toUpperCase()}</span>
              </button>

              <button
                type="button"
                onClick={() => setSpeakOutput(!speakOutput)}
                className={`p-1.5 rounded border text-xs transition ${
                  speakOutput
                    ? 'border-cyan-500/50 text-cyan-400 bg-cyan-950/40'
                    : 'border-slate-700 text-slate-500'
                }`}
                title={speakOutput ? 'Mute Voice Output' : 'Enable Voice Output'}
              >
                {speakOutput ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  stopAllAgentActions();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Privacy Alert */}
          {showPrivacyNotice && (
            <div className="p-3 bg-pink-950/90 border-b border-pink-500/50 text-xs text-pink-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-pink-300">
                <Shield className="w-4 h-4" />
                <span>Voice Privacy Disclosure</span>
              </div>
              <p className="text-[11px] leading-tight">
                Microphone audio is processed locally by your browser for speech-to-text. Recordings are never saved or transmitted to 3rd party servers.
              </p>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPrivacyNotice(false)}
                  className="px-2.5 py-1 rounded text-[10px] bg-slate-800 text-slate-300"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPrivacyConsent(true);
                    setShowPrivacyNotice(false);
                    startListening();
                  }}
                  className="px-3 py-1 rounded text-[10px] bg-pink-500 text-slate-950 font-bold"
                >
                  Accept & Enable Mic
                </button>
              </div>
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 shadow-md leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none border border-cyan-400/40'
                      : 'bg-slate-900 border border-cyan-500/30 text-slate-200 rounded-bl-none shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-cyan-500/20">
                      {msg.actions.map((act, i) => (
                        <a
                          key={i}
                          href={act.href}
                          className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:border-pink-500 hover:text-pink-300 transition"
                        >
                          {act.label} →
                        </a>
                      ))}
                    </div>
                  )}
                  <span className="block text-[9px] font-mono text-slate-400 mt-1 text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            {messages.length <= 1 && (
              <div className="pt-1 pb-1 space-y-1.5 animate-in fade-in duration-300">
                <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  {language === 'mr' ? 'सुचवलेले प्रश्न:' : 'Suggested Inquiries:'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    language === 'mr' ? 'कोणत्या सेवा पुरवता?' : 'What services do you provide?',
                    language === 'mr' ? 'किंमत कशी ठरवली जाते?' : 'How is pricing decided?',
                    language === 'mr' ? 'कोणते तंत्रज्ञान वापरता?' : 'What tech stack do you use?',
                    language === 'mr' ? 'कस्टम सॉफ्टवेअर बनवता का?' : 'Can you build custom software?'
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="text-[10px] text-left px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/40 text-slate-300 hover:border-cyan-300 hover:text-cyan-200 hover:bg-slate-800 transition"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {isLoading && (
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px]">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce [animation-delay:0.4s]"></div>
                <span>Processing Neural Query...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-900 border-t border-cyan-500/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={startListening}
                className={`p-2 rounded-xl border transition ${
                  isListening
                    ? 'bg-pink-600 border-pink-400 text-white animate-pulse'
                    : 'bg-slate-800 border-cyan-500/40 text-cyan-400 hover:bg-slate-700'
                }`}
                title="Speak to Assistant"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  language === 'mr' ? 'प्रश्न विचारा (मराठी किंवा English)...' : 'Ask anything about Tattva...'
                }
                className="flex-1 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 text-white disabled:opacity-40 hover:opacity-90 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
