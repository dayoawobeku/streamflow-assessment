import { JUPITER_PRICE_API_URL } from "./config";

export async function fetchTokenPrice(mint: string): Promise<number | null> {
  if (!mint) return null;

  try {
    const url = new URL(JUPITER_PRICE_API_URL);
    url.searchParams.set("ids", mint);

    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    const entry = json[mint] || json.data?.[mint];
    const price = entry?.usdPrice ?? entry?.price ?? null;

    return typeof price === "number" ? price : null;
  } catch {
    return null;
  }
}
