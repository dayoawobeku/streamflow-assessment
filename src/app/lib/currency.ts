const USD_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function formatUsd(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—";
  }
  return USD_FORMATTER.format(value);
}

export function lamportsToNumber(amount: string, decimals: number) {
  if (!amount) return 0;
  const base = BigInt(amount);
  const divisor = 10 ** decimals;
  return Number(base) / divisor;
}
