"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getClaimantStatus, executeClaim } from "@/app/lib/claimants";
import { assertWalletReady, getDistributorClient } from "@/app/lib/streamflow";
import { ClaimantApiResponse } from "@/app/types";
import { STREAMFLOW } from "../lib/config";

type DistributorClient = ReturnType<typeof getDistributorClient>;
type ClaimInvoker = Parameters<DistributorClient["claim"]>[1]["invoker"];

export function useClaimant(distributorId?: string) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const walletAddress = publicKey?.toBase58();

  return useQuery({
    queryKey: ["claimant", distributorId, walletAddress],
    enabled: Boolean(distributorId && walletAddress),
    queryFn: () =>
      getClaimantStatus(
        connection,
        distributorId!,
        walletAddress!,
        STREAMFLOW.CLUSTER.DEVNET
      ),
  });
}

export function useClaimAirdrop(distributorId?: string) {
  const { connection } = useConnection();
  const wallet = useWallet();
  const queryClient = useQueryClient();
  const walletAddress = wallet.publicKey?.toBase58();

  return useMutation({
    mutationFn: async (claimantData: ClaimantApiResponse) => {
      const readyWallet = assertWalletReady(wallet);
      const invoker = readyWallet as unknown as ClaimInvoker;

      return executeClaim(connection, invoker, claimantData);
    },
    onSuccess: () => {
      if (distributorId && walletAddress) {
        queryClient.invalidateQueries({
          queryKey: ["claimant", distributorId, walletAddress],
        });
      }
      if (distributorId) {
        queryClient.invalidateQueries({
          queryKey: ["airdrop-details", distributorId, connection.rpcEndpoint],
        });
      }
    },
  });
}
