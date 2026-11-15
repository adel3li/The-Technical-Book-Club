import type { ReactNode } from "react";
import { cn } from "./cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function SectionHeading({ title, subtitle, action, className }: { title: string; subtitle?: string; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/** Title block at the top of each page, with a soft accent glow. */
export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="hero-glow absolute inset-0" />
      <div aria-hidden className="dot-grid absolute inset-0 opacity-60" />
      <Container className="relative py-12 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-muted">{subtitle}</p>}
        {children}
      </Container>
    </header>
  );
}
