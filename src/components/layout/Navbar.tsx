"use client";

import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 h-16 border-b border-slate-200 bg-white/90 backdrop-blur flex items-center">
      <div className="mx-auto flex w-full max-w-6xl items-center px-6">
        {/* Logo / nazwa appki */}
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 text-lg">
            🏠
          </span>
          <div className="leading-tight">
            <div className="font-semibold text-base text-slate-900">LocalAid</div>
            <div className="text-xs text-slate-500">
              Pomoc sąsiedzka w Twojej okolicy
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="ml-8 hidden flex-1 items-center md:flex">
          <div className="w-full max-w-md rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition">
            <input
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
              placeholder="Szukaj ogłoszeń, osób, kategorii..."
            />
          </div>
        </div>

        {/* Prawa strona – powiadomienia + user */}
        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium text-slate-800">
                Jan Kowalski
              </div>
              <div className="text-xs text-slate-500">
                jan.kowalski@example.com
              </div>
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
              JK
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
