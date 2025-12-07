import { cn } from "@/app/lib/utils";

export const sectionStyles = {
  container:
    "rounded-3xl bg-[#111] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/5",
  label: "text-xs uppercase tracking-[0.3em] text-muted-foreground",
  title: "text-2xl font-semibold",
  subtext: "text-sm text-muted-foreground",
};

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn(sectionStyles.label, className)}>{children}</p>;
}

