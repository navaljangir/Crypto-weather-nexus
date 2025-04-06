'use client'
import { HeartIcon } from 'lucide-react';
import { toggleFavorite } from '../lib/redux/favoriteSlice';
import { useAppDispatch, useAppSelector } from '../lib/store';
import { useEffect } from 'react';
import { getWeather } from '../lib/redux/weatherSlice';

const CITIES = ["New York", "London", "Tokyo"];

export default function WeatherSection() {
const { data: weather } = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  useEffect(()=>{
      CITIES.forEach((city) => dispatch(getWeather(city)));
  } , [dispatch])
  if(!weather){
    return <div>
      ...Loading
    </div>
  }
  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Weather</h2>
      {Object.values(weather).map((city) => (
        <div key={city.name} className="mb-4 last:mb-0">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{city.name}</h3>
            <button
              onClick={() => dispatch(toggleFavorite({
                type: 'city',
                id: city.name,
                name : city.name
              }))}
            >
              <HeartIcon className={`w-5 h-5 ${
                favorites.some(f => f.id === city.name) 
                ? 'text-red-500 fill-current' 
                : 'text-gray-400'
              }`}/>
            </button>
          </div>
          <p className="text-gray-600">
            {Math.round(city.main.temp)}°C, {city.weather[0].main}
          </p>
          <p className="text-sm text-gray-500">
            Humidity: {city.main.humidity}%
          </p>
        </div>
      ))}
    </div>
  );
}