// lib/notificationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Alert = {
  id: string;
  type: 'price_alert' | 'weather_alert';
  message: string;
  read: boolean;
  timestamp: number;
  asset?: string;
  changePercent?: number;
};

const initialState: Alert[] = [];

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Omit<Alert, 'id' | 'read' | 'timestamp'>>) => {
      const newAlert: Alert = {
        ...action.payload,
        id: Date.now().toString(),
        read: false,
        timestamp: Date.now(),
      };
      state.unshift(newAlert);
    },
    markAllAsRead: (state) => {
      return state.map(alert => ({ ...alert, read: true }));
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      return state.map(alert => 
        alert.id === action.payload ? { ...alert, read: true } : alert
      );
    },
  },
});

export const { addAlert, markAllAsRead, markAsRead } = notificationSlice.actions;

// Selectors
export const selectAllAlerts = (state: { notifications: Alert[] }) => state.notifications;
export const selectUnreadCount = (state: { notifications: Alert[] }) => 
  state.notifications.filter(alert => !alert.read).length;

export default notificationSlice.reducer;