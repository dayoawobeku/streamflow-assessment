import { Loader2 } from "lucide-react";

export interface AllocationStatusProps {
  connected: boolean;
  isLoading: boolean;
  hasData: boolean;
  canClaim: boolean;
  displayAmount: string;
  rawAmount: string;
  usdValue?: string | null;
}

export function AllocationStatus({
  connected,
  isLoading,
  hasData,
  canClaim,
  displayAmount,
  rawAmount,
  usdValue,
}: AllocationStatusProps) {
  const showUsd = usdValue && usdValue !== "—";

  if (!connected) {
    return (
      <p className="text-muted-foreground">
        Connect your wallet to check eligibility.
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        <p>Checking eligibility…</p>
      </div>
    );
  }

  if (!hasData) {
    return (
      <p className="text-muted-foreground">
        This wallet is not on the airdrop list.
      </p>
    );
  }

  if (!canClaim) {
    return (
      <div>
        <p className="text-3xl font-semibold text-white">0 tokens</p>
        <p className="text-sm text-muted-foreground">Nothing left to claim.</p>
        {showUsd ? (
          <p className="text-sm text-muted-foreground">{usdValue}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <p className="text-3xl font-semibold text-white">
        {displayAmount} tokens
      </p>
      <p className="text-sm text-muted-foreground">{rawAmount} raw units</p>
      {showUsd ? (
        <p className="text-sm text-muted-foreground">{usdValue}</p>
      ) : null}
    </div>
  );
}
