"use client";

import { useQuery } from "@tanstack/react-query";
import { useConnection } from "@solana/wallet-adapter-react";

import { loadRecentDistributors } from "@/app/lib/distributors";

export function useAirdropDirectory(admin?: string, limit = 8) {
  const { connection } = useConnection();

  return useQuery({
    queryKey: ["airdrop-directory", limit, connection.rpcEndpoint, admin],
    enabled: Boolean(admin),
    queryFn: () => loadRecentDistributors(connection, admin!, limit),
  });
}
