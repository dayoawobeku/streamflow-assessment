export type AirdropType = "instant" | "vested";

export interface AirdropSnapshot {
  id: string;
  mintAddress: string;
  mintDecimals: number;
  recipientsTotal: number;
  recipientsClaimed: number;
  amountTotal: string;
  amountClaimed: string;
  type: AirdropType;
  startTs: number;
  endTs: number;
  unlockPeriodSeconds: number;
}

export interface ClaimantApiResponse {
  distributorAddress: string;
  claimant: string;
  amountUnlocked: string;
  amountLocked: string;
  amountClaimed?: string;
  claimableAmount?: string;
  proof: string[];
  tokenSymbol?: string;
  tokenDecimals?: number;
}

export interface DistributorSummary {
  address: string;
  name?: string;
  maxNumNodes: number;
  numNodesClaimed: number;
  totalAmountUnlocked: string;
  totalAmountClaimed: string;
  mint: string;
  createdTs: number;
  isActive: boolean;
}
