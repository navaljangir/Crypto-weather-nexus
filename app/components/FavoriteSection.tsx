/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { HeartIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../lib/store";
import { CryptoData } from "../lib/redux/cryptoSlice";
import { useEffect } from "react";
import { rehydrateFavorites } from "../lib/redux/favoriteSlice";
import { FavoriteCities } from "./FavoriteCitites";

const FavoriteSection = () => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const { data: cryptoData } = useAppSelector((state) => state.crypto);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      dispatch(rehydrateFavorites(JSON.parse(stored)));
    }
  }, []);

  const cryptoFavorites = favorites.filter(fav => fav.type === 'crypto');
  const weatherFavorites = favorites.filter(fav => fav.type === 'city');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className=" rounded-xl shadow-lg border-white border px-5 py-6">
      <div className="flex items-center gap-3 mb-6">
        <HeartIcon className="w-7 h-7 text-rose-500 fill-rose-100/80" />
        <h2 className="text-2xl font-bold ">Favorite Items</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-3">
          <HeartIcon className="w-12 h-12 text-rose-200/80" />
          <p className=" text-lg font-medium">
            No favorites yet. Click the heart to add items!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {cryptoFavorites.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-rose-500" />
                Favorite Cryptocurrencies
              </h3>
              {cryptoFavorites.map((favorite) => {
                const crypto = cryptoData[favorite.id] as CryptoData | undefined;
                const priceChange = crypto?.priceChange24h || 0;
                
                return (
                  <div key={favorite.id} className="group p-4 hover:bg-rose-50/50 transition-all rounded-lg border border-gray-200/80">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg">
                          {crypto?.name || favorite.name}
                          <span className="ml-2 text-sm font-medium">
                            {crypto?.symbol || ''}
                          </span>
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xl font-semibold">
                            {crypto ? formatPrice(crypto.price) : '...'}
                          </p>
                          {crypto && (
                            <span className={`text-sm ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(1)}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {weatherFavorites.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-sky-500" />
                Favorite Cities
              </h3>
              <FavoriteCities/>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoriteSection;