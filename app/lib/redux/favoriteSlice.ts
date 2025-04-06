import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FavoriteItem = {
  type: 'city' | 'crypto';
  id: string;
  name: string;
};

interface FavoritesState {
  items: FavoriteItem[];
}



const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    rehydrateFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
      state.items = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.type === action.payload.type
      );

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(action.payload);
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    clearFavorites: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('favorites');
      }
    }
  }
});

export const { toggleFavorite, clearFavorites, rehydrateFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;