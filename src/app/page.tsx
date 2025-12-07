"use client";

import { AirdropHero } from "./components/airdrop/airdrop-hero";
import { AirdropDetailsSection } from "./components/airdrop/airdrop-details-section";
import { AirdropSearchSection } from "./components/airdrop/airdrop-search-section";
import { useDashboardController } from "./hooks/use-dashboard-controller";

export default function Home() {
  const {
    selectedId,
    data,
    isLoading,
    isFetching,
    isError,
    error,
    tokenPrice,
    stats,
    handleLookup,
  } = useDashboardController();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-0">
      <AirdropHero />

      <AirdropSearchSection
        selectedId={selectedId}
        onSelect={handleLookup}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
      />

      {data && selectedId ? (
        <AirdropDetailsSection
          snapshot={data}
          stats={stats}
          distributorId={selectedId}
          tokenPrice={tokenPrice}
        />
      ) : null}
    </main>
  );
}
