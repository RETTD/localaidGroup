"use client";

import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children?: React.ReactNode; // może być pusty przy przycisku-ikonce
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium text-sm transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm",
  secondary:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200",
  danger: "bg-rose-600 text-white hover:bg-rose-500 shadow-sm",
  icon: `
    bg-transparent
    text-slate-600
    hover:bg-slate-100
    rounded-full
  `,
};

export default function Button({
  variant = "primary",
  children,
  iconLeft,
  iconRight,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        fullWidth && "w-full",
        "px-4 py-2",
        className
      )}
    >
      {iconLeft && <span className="flex items-center">{iconLeft}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="flex items-center">{iconRight}</span>}
    </button>
  );
}
