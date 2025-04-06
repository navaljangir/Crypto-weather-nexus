// lib/wsClient.ts
import { toast } from 'sonner';
import { AppDispatch } from "./store";
import { addAlert } from './redux/notificationSlice';

export interface AlertMessage {
  type: 'price_alert' | 'weather_alert';
  message: string;
  asset?: string;
  changePercent?: number;
}

class WSClient {
  private cryptoWS: WebSocket | null = null;
  private weatherWS: WebSocket | null = null;
  private prevPrices: Record<string, number> = {};
  private dispatch: AppDispatch | null = null;

  setDispatch(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  connectCrypto() {
    this.cryptoWS = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana');
    this.cryptoWS.onmessage = (msg) => {
      const prices = JSON.parse(msg.data);
      Object.entries(prices).forEach(([asset, price]) => {
        const numericPrice = parseFloat(price as string);
        this.handlePriceUpdate(asset, numericPrice);
      });
    };

    this.cryptoWS.onerror = (error) => {
      console.error('Crypto WS error:', error);
      toast.error('Realtime price updates disconnected' , {duration: 2000});
    };
  }

  private handlePriceUpdate(asset: string, newPrice: number) {
    const prevPrice = this.prevPrices[asset];
    this.prevPrices[asset] = newPrice;

    if (prevPrice && this.dispatch) {
      const changePercent = ((newPrice - prevPrice) / prevPrice) * 100;
      if (Math.abs(changePercent) >= 0.01) {
        this.dispatch(addAlert({
          type: 'price_alert',
          message: `${asset.toUpperCase()} price ${changePercent > 0 ? '↑' : '↓'} ${Math.abs(changePercent).toFixed(1)}%`,
          asset,
          changePercent
        }));
      }
    }
  }

  disconnect() {
    this.cryptoWS?.close();
    this.weatherWS?.close();
  }
}

export const wsClient = new WSClient();