import { AirdropDirectory } from "./airdrop-directory";
import { AirdropLookupSection } from "./airdrop-lookup-section";

interface AirdropSearchSectionProps {
  selectedId?: string;
  onSelect: (id: string) => void;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
}

export function AirdropSearchSection({
  selectedId,
  onSelect,
  isLoading,
  isFetching,
  isError,
  error,
}: AirdropSearchSectionProps) {
  const helper = selectedId ? (
    <p className="text-sm text-muted-foreground">
      Showing results for{" "}
      <span className="font-mono text-foreground">{selectedId}</span>
    </p>
  ) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <AirdropLookupSection
        defaultValue={selectedId}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        onLookup={onSelect}
        helper={helper}
      />

      <AirdropDirectory selectedId={selectedId} onSelect={onSelect} />
    </div>
  );
}
