import { StreamflowDistributorSolana } from "@streamflow/distributor";
import { ICluster } from "@streamflow/common";
import { Connection } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";

import { STREAMFLOW } from "@/app/lib/config";

export function getDistributorClient(connection: Connection) {
  return new StreamflowDistributorSolana.SolanaDistributorClient({
    clusterUrl: connection.rpcEndpoint,
    cluster: ICluster.Devnet,
    apiUrl: STREAMFLOW.API_URL.DEVNET,
  });
}

export function assertWalletReady(
  wallet: WalletContextState
): SignerWalletAdapter {
  const adapter = wallet.wallet?.adapter as SignerWalletAdapter | undefined;

  const walletNotReady =
    !wallet.publicKey ||
    !wallet.signTransaction ||
    !wallet.signAllTransactions ||
    !adapter;

  if (walletNotReady) throw new Error("Wallet not ready");

  return adapter;
}
