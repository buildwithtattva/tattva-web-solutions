'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, Check, X, Shield, Settings } from 'lucide-react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieBannerProps {
  forceOpenPrefs?: boolean;
  onClosePrefs?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  forceOpenPrefs = false,
  onClosePrefs,
}) => {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true, // Always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('tattva_cookie_consent');
    if (!saved) {
      // Show subtle banner after brief delay
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    } else {
      try {
        setPrefs(JSON.parse(saved));
      } catch {
        // Fallback
      }
    }
  }, []);

  useEffect(() => {
    if (forceOpenPrefs) {
      setShowModal(true);
    }
  }, [forceOpenPrefs]);

  const savePreferences = (newPrefs: CookiePreferences) => {
    setPrefs(newPrefs);
    localStorage.setItem('tattva_cookie_consent', JSON.stringify(newPrefs));
    setVisible(false);
    setShowModal(false);
    if (onClosePrefs) onClosePrefs();
  };

  const handleAcceptAll = () => {
    savePreferences({ essential: true, analytics: true, marketing: false });
  };

  const handleRejectNonEssential = () => {
    savePreferences({ essential: true, analytics: false, marketing: false });
  };

  if (!visible && !showModal) return null;

  return (
    <>
      {/* MINIMALIST COOKIE BANNER - Fixed Bottom Floating Pill */}
      {visible && !showModal && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900/95 border border-slate-700/70 backdrop-blur-md rounded-2xl p-4 shadow-2xl text-slate-200 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-800 text-amber-400 shrink-0">
                <Cookie className="w-4 h-4" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-100 text-xs">Privacy & Cookies</h4>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  We use essential cookies to ensure web functionality. We do not run intrusive ad trackers.
                </p>
                <div className="pt-2 flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition"
                  >
                    Accept Essential
                  </button>
                  <button
                    type="button"
                    onClick={handleRejectNonEssential}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition"
                  >
                    Strictly Necessary Only
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="px-2 py-1.5 text-slate-400 hover:text-slate-200 underline text-xs transition flex items-center gap-1"
                  >
                    <Settings className="w-3 h-3" />
                    <span>Customize</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COOKIE PREFERENCES MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 text-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-base text-white">Cookie Consent Preferences</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  if (onClosePrefs) onClosePrefs();
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Category 1 */}
              <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-100 flex items-center gap-2">
                    <span>Strictly Necessary</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Required</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">Required for navigation, contact submissions, and basic accessibility.</p>
                </div>
                <input type="checkbox" checked disabled className="w-4 h-4 accent-sky-500 rounded" />
              </div>

              {/* Category 2 */}
              <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-100">Performance & Diagnostics</div>
                  <p className="text-slate-400 text-[11px] mt-0.5">Helps us measure site rendering speed and error diagnostics.</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                  className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                />
              </div>

              {/* Category 3 */}
              <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-100">Marketing & Personalization</div>
                  <p className="text-slate-400 text-[11px] mt-0.5">Tattva does not use 3rd-party advertising cookies.</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                  className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition"
              >
                Reject Optional
              </button>
              <button
                type="button"
                onClick={() => savePreferences(prefs)}
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
