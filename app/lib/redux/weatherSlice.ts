import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "../services/weather";


interface Weather{
  id : string
  main :string
  description : string
}

interface MainType{
  temp : number
  humidity : number
}

export interface WeatherType{
    name : string
    main : MainType,
    weather : Weather[]
}

interface WeatherState {
  data: Record<string, WeatherType>;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: {},
  loading: false,
  error: null,
};

export const getWeather = createAsyncThunk(
  "weather/fetch",
  async (city: string) => {
    const res = await  fetchWeather(city)
    return res;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.data[action.payload.name] = action.payload;
        state.loading = false;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch weather";
        state.loading = false;
      });
  },
});

export default weatherSlice.reducer;
