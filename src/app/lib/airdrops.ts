import padStart from "lodash/padStart";
import { Connection } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";

import { getDistributorClient } from "@/app/lib/streamflow";
import { AirdropSnapshot } from "@/app/types";

export async function loadAirdropSnapshot(
  connection: Connection,
  distributorId: string
): Promise<AirdropSnapshot> {
  const client = getDistributorClient(connection);
  const [distributor] = await client.getDistributors({ ids: [distributorId] });

  if (!distributor) {
    throw new Error("Distributor not found");
  }

  const mintAccount = await getMint(connection, distributor.mint);
  const recipientsTotal = Number(distributor.maxNumNodes.toString());
  const recipientsClaimed = Number(distributor.numNodesClaimed.toString());

  return {
    id: distributorId,
    mintAddress: distributor.mint.toBase58(),
    mintDecimals: mintAccount.decimals,
    recipientsTotal,
    recipientsClaimed,
    amountTotal: distributor.maxTotalClaim.toString(),
    amountClaimed: distributor.totalAmountClaimed.toString(),
    type: distributor.totalAmountLocked.isZero() ? "instant" : "vested",
    startTs: Number(distributor.startTs.toString()),
    endTs: Number(distributor.endTs.toString()),
    unlockPeriodSeconds: Number(distributor.unlockPeriod.toString()),
  };
}

export function formatTokenAmount(
  rawAmount: string,
  decimals: number,
  fractionDigits = 4
) {
  if (decimals === 0) {
    return rawAmount;
  }

  const zero = BigInt(0);
  const baseValue = BigInt(10);

  const value = BigInt(rawAmount);
  const base = baseValue ** BigInt(decimals);
  const whole = value / base;
  const fraction = value % base;

  if (fraction === zero) {
    return whole.toString();
  }

  const fractionStr = padStart(fraction.toString(), decimals, "0")
    .slice(0, fractionDigits)
    .replace(/0+$/, "");

  return fractionStr.length > 0
    ? `${whole.toString()}.${fractionStr}`
    : whole.toString();
}
