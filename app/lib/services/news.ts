import axios from 'axios';

export const fetchNews = async () => {
  const response = await axios.get(
    'https://newsdata.io/api/1/news',
    {
      params: {
        apikey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
        q: 'crypto',
        language: 'en'
      }
    }
  );
  return response.data.results;
};