"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  // Wczytanie stanu sidebaru z localStorage
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("localaid-sidebar-collapsed");
      if (stored === "true") {
        setCollapsed(true);
      }
    } catch {
      // ignorujemy
    }
  }, []);

  const handleToggle = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(
          "localaid-sidebar-collapsed",
          next ? "true" : "false"
        );
      } catch {
        // ignorujemy
      }
      return next;
    });
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      {/* Sidebar – pełna wysokość */}
      <Sidebar collapsed={collapsed} onToggle={handleToggle} />

      {/* Prawa część */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="mx-auto max-w-6xl p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
