import { AirdropSnapshot } from "@/app/types";
import { AirdropSummary } from "./airdrop-summary";
import { ClaimPanel } from "../claim-panel/claim-panel-container";

interface AirdropDetailsSectionProps {
  snapshot: AirdropSnapshot;
  stats: {
    label: string;
    primary: string;
    secondary?: string;
  }[];
  distributorId: string;
  tokenPrice: number | null;
}

export function AirdropDetailsSection({
  snapshot,
  stats,
  distributorId,
  tokenPrice,
}: AirdropDetailsSectionProps) {
  return (
    <>
      <AirdropSummary snapshot={snapshot} stats={stats} />
      <ClaimPanel
        distributorId={distributorId}
        mintDecimals={snapshot.mintDecimals}
        tokenPrice={tokenPrice}
      />
    </>
  );
}
