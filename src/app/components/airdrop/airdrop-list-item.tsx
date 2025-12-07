import truncate from "lodash/truncate";
import { DistributorSummary } from "@/app/types";

export interface AirdropListItemProps {
  drop: DistributorSummary;
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function AirdropListItem({
  drop,
  selectedId,
  onSelect,
}: AirdropListItemProps) {
  const isSelected = drop.address === selectedId;
  const claimedRecipients = `${drop.numNodesClaimed} / ${drop.maxNumNodes} claimed`;
  const created = new Date(drop.createdTs).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const mintLabel = truncate(drop.mint, { length: 16 });

  return (
    <button
      onClick={() => onSelect(drop.address)}
      className={`w-full rounded-2xl border border-white/5 bg-[#111] p-4 text-left transition hover:border-white/20 ${
        isSelected ? "ring-2 ring-white" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">
            {drop.name || truncate(drop.address, { length: 16 })}
          </p>
          <p className="flex gap-2 text-xs text-muted-foreground">
            <span>{mintLabel}</span>
            <span aria-hidden="true">•</span>
            <span>{created}</span>
          </p>
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {drop.isActive ? "Active" : "Complete"}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{claimedRecipients}</p>
    </button>
  );
}

