// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './redux/cryptoSlice';
import weatherReducer from './redux/weatherSlice';
import newsReducer from './redux/newsSlice';
import favoritesReducer from './redux/favoriteSlice';
import notificationsReducer from './redux/notificationSlice';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    weather: weatherReducer,
    news: newsReducer,
    favorites: favoritesReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type AppStore = typeof store
export const useAppStore: () => AppStore = useStore
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector