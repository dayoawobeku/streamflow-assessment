"use client";

import { useQuery } from "@tanstack/react-query";
import { useConnection } from "@solana/wallet-adapter-react";

import { loadAirdropSnapshot } from "@/app/lib/airdrops";

export function useAirdropDetails(distributorId?: string) {
  const { connection } = useConnection();

  return useQuery({
    queryKey: ["airdrop-details", distributorId, connection.rpcEndpoint],
    enabled: Boolean(distributorId),
    queryFn: () => loadAirdropSnapshot(connection, distributorId!),
  });
}
