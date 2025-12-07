"use client";

import { useMemo, useState } from "react";
import { useAirdropDetails } from "./use-airdrop-details";
import { useTokenPrice } from "./use-token-price";
import { formatTokenAmount } from "@/app/lib/airdrops";
import { formatUsd, lamportsToNumber } from "@/app/lib/currency";

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export function useDashboardController() {
  const [selectedId, setSelectedId] = useState<string>();

  const { data, isLoading, isFetching, isError, error } =
    useAirdropDetails(selectedId);

  const priceQuery = useTokenPrice(data?.mintAddress);
  const tokenPrice = priceQuery.data ?? null;

  const stats = useMemo(() => {
    if (!data) {
      return [];
    }

    const recipients = `${numberFormatter.format(
      data.recipientsClaimed
    )} / ${numberFormatter.format(data.recipientsTotal)}`;

    const amountClaimed = formatTokenAmount(
      data.amountClaimed,
      data.mintDecimals
    );
    const amountTotal = formatTokenAmount(data.amountTotal, data.mintDecimals);

    const claimedNumber = lamportsToNumber(
      data.amountClaimed,
      data.mintDecimals
    );
    const totalNumber = lamportsToNumber(data.amountTotal, data.mintDecimals);
    const claimedUsd =
      tokenPrice !== null ? formatUsd(claimedNumber * tokenPrice) : undefined;
    const totalUsd =
      tokenPrice !== null ? formatUsd(totalNumber * tokenPrice) : undefined;

    return [
      {
        label: "Airdrop type",
        primary: data.type === "instant" ? "Instant" : "Vested",
      },
      {
        label: "Recipients claimed / total",
        primary: recipients,
      },
      {
        label: "Amount claimed / total",
        primary: `${amountClaimed} tokens / ${amountTotal} total`,
        secondary:
          tokenPrice !== null && claimedUsd && totalUsd
            ? `${claimedUsd} / ${totalUsd}`
            : undefined,
      },
    ];
  }, [data, tokenPrice]);

  const handleLookup = (distributorId: string) => {
    setSelectedId(distributorId || undefined);
  };

  return {
    selectedId,
    data,
    isLoading,
    isFetching,
    isError,
    error,
    tokenPrice,
    stats,
    handleLookup,
  };
}
