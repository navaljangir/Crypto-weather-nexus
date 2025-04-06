'use client'

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/store";
import { rehydrateFavorites } from "../lib/redux/favoriteSlice";
import { ThermometerSun, ThermometerSnowflake } from 'lucide-react';

export function FavoriteCities() {
  const { data: weatherData } = useAppSelector((state) => state.weather);
  const favorites = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      dispatch(rehydrateFavorites(JSON.parse(stored)));
    }
  }, [dispatch]);

  const weatherFavorites = favorites.filter(fav => fav.type === 'city');

  if (weatherFavorites.length > 0) {
    return (
      <div>
        {weatherFavorites.map((favorite) => {
          const weather = weatherData[favorite.id];
          const temperature = weather?.main?.temp;

          const TemperatureIcon = temperature > 20 ? ThermometerSun : ThermometerSnowflake;

          return (
            <div key={favorite.id} className="group p-4 transition-all rounded-lg border border-gray-200/80">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">
                    {weather?.name || favorite.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xl font-semibold">
                      {weather ? `${Math.round(temperature)}°C` : '...'}
                    </p>
                    {weather && <TemperatureIcon className="w-5 h-5 text-sky-600" />}
                  </div>
                </div>
                <span className="text-sm text-gray-500 capitalize">
                  {weather?.weather[0]?.description || ''}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}
