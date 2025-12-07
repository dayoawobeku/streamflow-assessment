import { Button } from "@/app/components/ui/button";
import { sectionStyles, SectionLabel } from "@/app/components/ui/design-tokens";
import { AllocationStatus } from "./allocation-status";

export interface ClaimPanelViewProps {
  connected: boolean;
  isLoading: boolean;
  isClaiming: boolean;
  hasData: boolean;
  canClaim: boolean;
  displayAmount: string;
  rawAmount: string;
  usdValue: string | null;
  onClaim: () => void;
  claimError: string | null;
  loadError: boolean;
}

export function ClaimPanelView({
  connected,
  isLoading,
  isClaiming,
  hasData,
  canClaim,
  displayAmount,
  rawAmount,
  usdValue,
  onClaim,
  claimError,
  loadError,
}: ClaimPanelViewProps) {
  const isClaimDisabled =
    !connected || isLoading || !hasData || !canClaim || isClaiming;

  return (
    <section className={sectionStyles.container}>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <SectionLabel>Your allocation</SectionLabel>
          <AllocationStatus
            connected={connected}
            isLoading={isLoading}
            hasData={hasData}
            canClaim={canClaim}
            displayAmount={displayAmount}
            rawAmount={rawAmount}
            usdValue={usdValue}
          />
        </div>

        <Button
          type="button"
          className="h-12 w-full rounded-2xl bg-white/90 px-6 font-semibold text-black shadow-lg transition hover:bg-white md:w-auto"
          disabled={isClaimDisabled}
          onClick={onClaim}
        >
          {isClaiming ? "Claiming…" : "Claim tokens"}
        </Button>
      </div>

      {loadError ? (
        <p className="mt-3 text-sm text-destructive">
          Failed to load eligibility. Please try again.
        </p>
      ) : null}

      {claimError ? (
        <p className="mt-3 text-sm text-destructive">{claimError}</p>
      ) : null}
    </section>
  );
}
