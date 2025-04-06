// features/newsSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchNews } from '../services/news';

interface NewsItem {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  source_id?: string
}

interface NewsState {
  articles: NewsItem[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

export const fetchNewsData = createAsyncThunk(
  'news/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchNews();
      return data.map((item: NewsItem) => ({
        title: item.title,
        link: item.link,
        source: item.source_id,
        pubDate: item.pubDate
      }));
    } catch (error) {
        console.log('Error while Fetching news' , error)
      return rejectWithValue('Failed to fetch news');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.loading = false;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.articles = [];
      });
  }
});

export default newsSlice.reducer;