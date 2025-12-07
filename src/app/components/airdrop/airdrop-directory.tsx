"use client";

import { Button } from "@/app/components/ui/button";
import { sectionStyles, SectionLabel } from "@/app/components/ui/design-tokens";
import { useAirdropDirectory } from "@/app/hooks/use-airdrop-directory";
import { useWallet } from "@solana/wallet-adapter-react";
import { AirdropListItem } from "./airdrop-list-item";

interface AirdropDirectoryProps {
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function AirdropDirectory({
  selectedId,
  onSelect,
}: AirdropDirectoryProps) {
  const { publicKey } = useWallet();
  const walletAddress = publicKey?.toBase58();

  const { data, isLoading, isError, refetch, isFetching, isFetched } =
    useAirdropDirectory(walletAddress);

  return (
    <section className={sectionStyles.container}>
      <header className="mb-4 flex items-center justify-between">
        <div>
          <SectionLabel>Recent airdrops</SectionLabel>
          <p className={sectionStyles.subtext}>
            Click any entry to load its details.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={!walletAddress || isFetching}
        >
          Refresh
        </Button>
      </header>

      {!walletAddress ? (
        <p className="text-sm text-muted-foreground">
          Connect your wallet to see the airdrops you created.
        </p>
      ) : null}

      {walletAddress && isLoading ? (
        <p className="text-sm text-muted-foreground">Loading airdrops…</p>
      ) : null}

      {walletAddress && isError ? (
        <p className="text-sm text-destructive">
          Failed to load airdrops. Try refreshing.
        </p>
      ) : null}

      <div className="mt-3 space-y-3">
        {data?.map((drop) => (
          <AirdropListItem
            key={drop.address}
            drop={drop}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}

        {walletAddress && isFetched && data?.length === 0 && !isLoading ? (
          <p className="text-sm text-muted-foreground">No airdrops found.</p>
        ) : null}
      </div>
    </section>
  );
}
