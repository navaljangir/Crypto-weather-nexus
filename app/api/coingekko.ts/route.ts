import { NextResponse } from "next/server";

export default async function handler() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/solana?localization=false&tickers=false");
    const data = await response.json();
    return NextResponse.json(data , {status : 200});
}
