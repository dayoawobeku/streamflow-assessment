"use client";

import { ConnectWalletButton } from "../connect-wallet-button";
import { WalletStatus } from "../wallet-status";

export function AirdropHero() {
  return (
    <section className="rounded-3xl bg-linear-to-br from-[#10101c] via-[#1a1334] to-[#2c1d65] p-8 text-white shadow-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <span className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.4em] text-white/70">
              Streamflow
            </span>
            <h1 className="text-4xl font-semibold leading-tight">
              Airdrop explorer
            </h1>
            <p className="text-white/80">
              Review a distributor before you connect and claim.
            </p>
          </div>

          <ConnectWalletButton />
        </div>

        <WalletStatus
          className="bg-white/10 text-white/90 shadow-none"
          textClassName="text-white"
        />
      </div>
    </section>
  );
}

