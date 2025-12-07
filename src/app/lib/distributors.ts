import { Connection } from "@solana/web3.js";

import { getDistributorClient } from "@/app/lib/streamflow";
import { DistributorSummary } from "@/app/types";

export async function loadRecentDistributors(
  connection: Connection,
  admin: string,
  limit = 8
): Promise<DistributorSummary[]> {
  const client = getDistributorClient(connection);
  const distributors = await client.searchDistributors({ admin });

  return distributors
    .sort((a, b) => {
      const aTs = Number(a.account.startTs.toString());
      const bTs = Number(b.account.startTs.toString());
      return bTs - aTs;
    })
    .slice(0, limit)
    .map(({ publicKey, account }) => {
      const maxNumNodes = Number(account.maxNumNodes.toString());
      const numNodesClaimed = Number(account.numNodesClaimed.toString());
      const createdTs = Number(account.startTs.toString()) * 1000;
      const metadataName =
        (account as { metadata?: { name?: string } }).metadata?.name ?? "";

      return {
        address: publicKey.toBase58(),
        name: metadataName,
        maxNumNodes,
        numNodesClaimed,
        totalAmountUnlocked: account.totalAmountUnlocked.toString(),
        totalAmountClaimed: account.totalAmountClaimed.toString(),
        mint: account.mint.toBase58(),
        createdTs,
        isActive: numNodesClaimed < maxNumNodes,
      };
    });
}
