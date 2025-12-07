import { ReactNode } from "react";
import { sectionStyles } from "@/app/components/ui/design-tokens";
import { AirdropLookupForm } from "./airdrop-lookup-form";

interface AirdropLookupSectionProps {
  defaultValue?: string;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  onLookup: (id: string) => void;
  helper?: ReactNode;
}

export function AirdropLookupSection({
  defaultValue,
  isLoading,
  isFetching,
  isError,
  error,
  onLookup,
  helper,
}: AirdropLookupSectionProps) {
  return (
    <section className={sectionStyles.container}>
      <AirdropLookupForm
        key={defaultValue}
        defaultValue={defaultValue}
        isLoading={isFetching || isLoading}
        onSubmit={onLookup}
      />

      {helper}

      <div className="space-y-2 text-sm" aria-live="polite">
        {isLoading || isFetching ? (
          <p className="text-muted-foreground">Fetching airdrop data…</p>
        ) : null}
        {isError ? (
          <p className="text-destructive">
            {error instanceof Error ? error.message : "Unable to load airdrop"}
          </p>
        ) : null}
      </div>
    </section>
  );
}
