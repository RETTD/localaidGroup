"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import {
  HomeIcon,
  MapIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PlusIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const mainNav: NavItem[] = [
  { label: "Przegląd", href: "/", icon: HomeIcon },
  { label: "Ogłoszenia", href: "/posts", icon: ClipboardDocumentListIcon },
  { label: "Mapa", href: "/map", icon: MapIcon },
];

const accountNav: NavItem[] = [
  { label: "Profil", href: "/profile", icon: UserCircleIcon },
  { label: "Ustawienia", href: "/settings", icon: Cog6ToothIcon },
];

export default function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActive =
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        title={item.label}
        className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition
          ${
            isActive
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }
          ${collapsed ? "justify-center" : "gap-3"}
        `}
      >
        <Icon
          className={`h-5 w-5 ${
            isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700"
          }`}
        />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={`
        flex h-full flex-col border-r border-slate-200 bg-white/90 backdrop-blur
        transition-[width] duration-300
        ${collapsed ? "w-[72px]" : "w-64"}
      `}
    >
      <div className="flex h-16 items-center justify-end px-3">
        <button
          onClick={onToggle}
          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100 transition"
          aria-label={collapsed ? "Rozwiń menu" : "Zwiń menu"}
        >
          {collapsed ? (
            <ChevronDoubleRightIcon className="h-5 w-5 text-slate-600" />
          ) : (
            <ChevronDoubleLeftIcon className="h-5 w-5 text-slate-600" />
          )}
        </button>
      </div>

      {/* Środkowa część – scrollowalna, żeby nic się nie ucinało */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="space-y-1">{mainNav.map(renderItem)}</div>

        <div className="mt-4 border-t border-slate-200 pt-4 space-y-1">
          {accountNav.map(renderItem)}
        </div>
      </div>

      {/* Stały bottom bar – zawsze widoczny */}
      <div className="border-t border-slate-200 p-3">
        <Button
          variant="primary"
          iconLeft={<PlusIcon className="h-5 w-5" />}
          fullWidth={!collapsed}
          className={collapsed ? "h-10 w-10 p-0 mx-auto" : "w-full"}
          onClick={() => router.push("/posts/create")}
          title="Dodaj ogłoszenie"
        >
          {!collapsed && "Dodaj ogłoszenie"}
        </Button>
      </div>
    </aside>
  );
}
