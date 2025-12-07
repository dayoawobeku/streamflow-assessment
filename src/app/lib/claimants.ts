import BN from "bn.js";
import { Connection, PublicKey } from "@solana/web3.js";
import { getClaimantStatusPda } from "@streamflow/distributor/solana";
import { ITransactionResult } from "@streamflow/common";

import { STREAMFLOW } from "@/app/lib/config";
import { getDistributorClient } from "@/app/lib/streamflow";
import { ClaimantApiResponse } from "@/app/types";

export async function fetchClaimantInfo(
  distributorId: string,
  walletAddress: string,
  cluster: string = STREAMFLOW.CLUSTER.DEVNET
): Promise<ClaimantApiResponse | null> {
  const url = new URL(
    `/v2/api/airdrops/${distributorId}/claimants/${walletAddress}`,
    STREAMFLOW.API_URL.DEVNET
  );
  url.searchParams.set("cluster", cluster);

  const res = await fetch(url.toString(), {
    next: { revalidate: 0 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch claimant data");
  }

  return res.json();
}

export async function getClaimantStatus(
  connection: Connection,
  distributorId: string,
  walletAddress: string,
  cluster: string = STREAMFLOW.CLUSTER.DEVNET
): Promise<ClaimantApiResponse | null> {
  const apiData = await fetchClaimantInfo(
    distributorId,
    walletAddress,
    cluster
  );

  if (!apiData) return null;

  try {
    const client = getDistributorClient(connection);
    const programId = client.getDistributorProgramId();
    const claimStatusPda = getClaimantStatusPda(
      programId,
      new PublicKey(distributorId),
      new PublicKey(walletAddress)
    );

    const claimStatus = await client.getClaim(claimStatusPda);

    if (claimStatus) {
      return {
        ...apiData,
        amountClaimed: apiData.amountUnlocked,
        claimableAmount: "0",
      };
    }
  } catch (e) {
    console.warn("Failed to check on-chain claim status", e);
  }

  return apiData;
}

type DistributorClient = ReturnType<typeof getDistributorClient>;
type ClaimInvoker = Parameters<DistributorClient["claim"]>[1]["invoker"];

export async function executeClaim(
  connection: Connection,
  invoker: ClaimInvoker,
  claimantData: ClaimantApiResponse
): Promise<ITransactionResult> {
  const client = getDistributorClient(connection);

  const claimableAmount = new BN(
    claimantData.claimableAmount ?? claimantData.amountUnlocked
  );

  return client.claim(
    {
      id: claimantData.distributorAddress,
      proof: claimantData.proof as unknown as Array<Array<number>>,
      amountUnlocked: new BN(claimantData.amountUnlocked),
      amountLocked: new BN(claimantData.amountLocked),
      claimableAmount,
    },
    { invoker }
  );
}
