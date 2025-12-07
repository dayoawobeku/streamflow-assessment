"use client";

import { useWallet } from "@solana/wallet-adapter-react";

import { cn } from "@/app/lib/utils";

interface WalletStatusProps {
  className?: string;
  textClassName?: string;
}

export function WalletStatus({ className, textClassName }: WalletStatusProps) {
  const { publicKey, connected } = useWallet();
  const defaultTone = connected
    ? "bg-emerald-500/10 text-emerald-100"
    : "bg-muted/40 text-muted-foreground";

  return (
    <div
      className={cn(
        "rounded-2xl px-5 py-4 text-sm shadow-inner backdrop-blur",
        className ?? defaultTone
      )}
    >
      {connected ? (
        <div className={cn("flex flex-col gap-1", textClassName)}>
          <span className="text-xs uppercase tracking-[0.2em] opacity-80">
            Connected wallet
          </span>
          <span className="font-mono text-lg">{publicKey?.toBase58()}</span>
        </div>
      ) : (
        <div className={cn("flex flex-col gap-1", textClassName)}>
          <span className="text-xs uppercase tracking-[0.2em] opacity-80">
            Wallet not connected
          </span>
          <p className="text-sm opacity-80">
            Connect Phantom to check your eligibility.
          </p>
        </div>
      )}
    </div>
  );
}
