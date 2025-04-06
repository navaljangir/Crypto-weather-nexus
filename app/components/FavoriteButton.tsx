// components/FavoriteButton.tsx
'use client'

import { HeartIcon } from "lucide-react";
import { FavoriteItem, toggleFavorite } from "../lib/redux/favoriteSlice";
import { useAppDispatch } from "../lib/store";

export const FavoriteButton = ({ item }: { item: FavoriteItem }) => {
  const dispatch = useAppDispatch();
  
  return (
    <button 
      onClick={() => dispatch(toggleFavorite(item))}
      className="p-2 hover:bg-gray-100 rounded-full"
    >
      <HeartIcon className="w-5 h-5 text-red-500" />
    </button>
  );
};