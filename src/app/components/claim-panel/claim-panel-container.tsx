"use client";

import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { formatTokenAmount } from "@/app/lib/airdrops";
import { formatUsd, lamportsToNumber } from "@/app/lib/currency";
import { useClaimant, useClaimAirdrop } from "@/app/hooks/use-claimant";

import { ClaimPanelView } from "./claim-panel-view";

interface ClaimPanelProps {
  distributorId: string;
  mintDecimals: number;
  tokenPrice?: number | null;
}

export function ClaimPanel({
  distributorId,
  mintDecimals,
  tokenPrice,
}: ClaimPanelProps) {
  const { connected } = useWallet();
  const claimantQuery = useClaimant(distributorId);
  const claimMutation = useClaimAirdrop(distributorId);

  const { displayAmount, canClaim, rawAmount, usdValue } = useMemo(() => {
    const entry = claimantQuery.data;
    if (!entry) {
      return {
        rawAmount: "0",
        displayAmount: "0",
        canClaim: false,
        usdValue: null,
      };
    }

    const unlocked = BigInt(entry.amountUnlocked ?? "0");
    const claimed = BigInt(entry.amountClaimed ?? "0");
    const fallbackAvailable =
      unlocked > claimed ? unlocked - claimed : BigInt(0);
    const available = entry.claimableAmount
      ? BigInt(entry.claimableAmount)
      : fallbackAvailable;
    const normalized = available > BigInt(0) ? available : BigInt(0);
    const lamports = normalized.toString();

    const tokenAmountFloat = lamportsToNumber(lamports, mintDecimals);
    const usd = tokenPrice ? formatUsd(tokenAmountFloat * tokenPrice) : null;

    return {
      rawAmount: lamports,
      displayAmount: formatTokenAmount(lamports, mintDecimals),
      canClaim: normalized > BigInt(0),
      usdValue: usd,
    };
  }, [claimantQuery.data, mintDecimals, tokenPrice]);

  const handleClaim = () => {
    if (claimantQuery.data) {
      claimMutation.mutate(claimantQuery.data);
    }
  };

  let claimError: string | null = null;
  if (claimMutation.isError) {
    claimError =
      claimMutation.error instanceof Error
        ? claimMutation.error.message
        : "Claim failed";
  }

  return (
    <ClaimPanelView
      connected={connected}
      isLoading={claimantQuery.isLoading}
      isClaiming={claimMutation.isPending}
      hasData={!!claimantQuery.data}
      canClaim={canClaim}
      displayAmount={displayAmount}
      rawAmount={rawAmount}
      usdValue={usdValue}
      onClaim={handleClaim}
      claimError={claimError}
      loadError={claimantQuery.isError}
    />
  );
}
