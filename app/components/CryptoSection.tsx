// components/CryptoSection.tsx
'use client';

import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { CryptoData, fetchCryptoData } from "../lib/redux/cryptoSlice";
import { toggleFavorite } from "../lib/redux/favoriteSlice";
import { useAppDispatch, useAppSelector } from "../lib/store";
import { useEffect } from "react";


const CRYPTO_IDS = ["bitcoin", "ethereum", "solana"];
export default function CryptoSection() {
  const dispatch = useAppDispatch();
  const { data: cryptoData, loading, error } = useAppSelector((state) => state.crypto);
  const favorites = useAppSelector((state) => state.favorites.items);

  // Predefined list of cryptocurrencies to display
  const cryptoIds = ['bitcoin', 'ethereum', 'solana'];

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'green-600' : 'red-600';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };
  useEffect(()=>{
    CRYPTO_IDS.forEach((id) => dispatch(fetchCryptoData(id)));
  } , [dispatch])
  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Cryptocurrencies</h2>
      
      {loading && <p className="text-gray-500">Loading crypto data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {cryptoIds.map((cryptoId) => {
          const crypto = cryptoData[cryptoId] as CryptoData | undefined;
          
          if (!crypto) return null;

          const isFavorite = favorites.some(f => f.id === cryptoId && f.type === 'crypto');

          return (
            <div key={cryptoId} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={crypto.icon}
                      alt={crypto.name}
                      width={28}
                      height={28}
                      className="w-8 h-8 rounded-full"
                    />
                    <h3 className="font-semibold">{crypto.name}</h3>
                    <span className="text-sm text-gray-500">{crypto.symbol}</span>
                  </div>
                  <p className="text-2xl font-medium mt-1">
                    {formatPrice(crypto.price)}
                  </p>
                </div>

                <button
                  onClick={() => dispatch(toggleFavorite({
                    type: 'crypto',
                    id: cryptoId,
                    name: crypto.name
                  }))}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <HeartIcon
                    className={`w-6 h-6 ${
                      isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              <div className="mt-2 flex gap-4 text-sm">
                <div className={`text-${getChangeColor(crypto.priceChange24h)} bg-${getChangeColor(crypto.priceChange24h)}` } >
                  24h: {crypto.priceChange24h.toFixed(2)}%
                </div>
                <div className="text-gray-600">
                  MCap: ${(crypto.marketCap / 1e9).toFixed(1)}B
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}