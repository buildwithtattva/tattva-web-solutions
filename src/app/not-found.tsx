'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Gamepad2, Sparkles } from 'lucide-react';

export default function NotFound() {
  const [score, setScore] = useState<number>(0);
  const [bonusText, setBonusText] = useState<string>('Click the arcade button for bonus points!');

  const handleScore = () => {
    const newScore = score + 100;
    setScore(newScore);
    if (newScore === 500) {
      setBonusText('🎉 ARCADE CHAMPION! You unlocked the secret path!');
    } else {
      setBonusText(`+100 POINTS! Total Score: ${newScore}`);
    }
  };

  return (
    <div className="arcade-page min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl w-full arcade-box p-8 sm:p-12 space-y-8 relative overflow-hidden rounded-3xl">
        {/* CRT Scanline overlay simulation */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none" />

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-950 border border-rose-500 text-rose-300 font-mono text-xs">
            <Gamepad2 className="w-4 h-4 animate-bounce" />
            <span>ERROR 404</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black text-rose-500 tracking-widest drop-shadow-[0_0_15px_rgba(255,0,85,0.8)]">
            404
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold uppercase text-green-400 font-mono">
            GAME OVER // STAGE NOT FOUND
          </h2>

          <p className="text-xs font-mono text-slate-300 max-w-md mx-auto leading-relaxed">
            The requested digital vector route does not exist or has been warped into another space-time dimension.
          </p>
        </div>

        {/* Mini Interactive Arcade Game Box */}
        <div className="p-6 rounded-2xl bg-slate-950 border-2 border-green-500/50 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between text-green-400">
            <span>HIGH SCORE: 99900</span>
            <span>YOUR SCORE: {score}</span>
          </div>

          <p className="text-[11px] text-yellow-300">{bonusText}</p>

          <button
            type="button"
            onClick={handleScore}
            className="px-6 py-3 arcade-button rounded-xl text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <Sparkles className="w-4 h-4" />
            <span>INSERT COIN / PRESS TO SCORE</span>
          </button>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-green-500 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider hover:bg-green-400 transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,102,0.4)] focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs uppercase hover:bg-slate-800 transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="pt-4 text-[10px] font-mono text-slate-500">
          TATTVA WEB SOLUTIONS © 2026 — ARCADE RETRO ENGINE
        </div>
      </div>
    </div>
  );
}
