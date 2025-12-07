"use client";

import truncate from "lodash/truncate";

import { sectionStyles, SectionLabel } from "@/app/components/ui/design-tokens";
import { AirdropSnapshot } from "@/app/types";

type Stat = {
  label: string;
  primary: string;
  secondary?: string;
};

interface AirdropSummaryProps {
  snapshot: AirdropSnapshot;
  stats: Stat[];
}

export function AirdropSummary({ snapshot, stats }: AirdropSummaryProps) {
  const shortMint = truncate(snapshot.mintAddress, {
    length: 12,
    omission: "...",
  });

  return (
    <section className={sectionStyles.container}>
      <header className="space-y-1">
        <SectionLabel>Airdrop overview</SectionLabel>
        <h2 className={sectionStyles.title}>{snapshot.id}</h2>
        <p className={sectionStyles.subtext}>
          Token mint&nbsp;
          <span className="font-mono text-foreground">{shortMint}</span>
        </p>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-white/5 bg-[#191919] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xl font-semibold text-foreground">
              {stat.primary}
            </p>
            {stat.secondary ? (
              <p className="text-sm text-muted-foreground">{stat.secondary}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
