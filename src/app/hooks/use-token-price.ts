"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchTokenPrice } from "@/app/lib/prices";

export function useTokenPrice(mint?: string) {
  return useQuery({
    queryKey: ["token-price", mint],
    enabled: Boolean(mint),
    queryFn: () => fetchTokenPrice(mint!),
    staleTime: 1000 * 60,
  });
}
