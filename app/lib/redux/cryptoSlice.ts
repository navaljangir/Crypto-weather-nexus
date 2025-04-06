// features/cryptoSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCrypto } from '../services/crypto';

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  icon : string
}

interface CryptoState {
  data: Record<string, CryptoData>;
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  data: {},
  loading: false,
  error: null
};

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetch',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchCrypto(id);
      console.log(response)
      return {
        id,
        data: {
          id,
          name: response.name,
          symbol: response.symbol.toUpperCase(),
          price: response.market_data.current_price.usd,
          priceChange24h: response.market_data.price_change_percentage_24h,
          marketCap: response.market_data.market_cap.usd,
          icon : response.image.small
        }
      };
    } catch (error) {
        console.log('Error while fetching Cryto Data' , error)
      return rejectWithValue('Failed to fetch crypto data');
    }
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const { id, price } = action.payload;
      if (state.data[id]) {
        state.data[id].price = price;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.data[action.payload.id] = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { updateCryptoPrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;