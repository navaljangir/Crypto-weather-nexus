// components/NewsSection.tsx
'use client'
import { useEffect } from 'react';
import { fetchNewsData } from '../lib/redux/newsSlice';
import { useAppDispatch, useAppSelector } from '../lib/store';
import Link from 'next/link';

export const NewsSection = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNewsData());
  }, [dispatch]);

  return (
    <div className=" p-6 rounded-lg shadow-md w-full flex items-center justify-center">
      <div className='flex flex-col justify-center items-center'>
      <h2 className="text-xl font-semibold mb-4">Latest Crypto News</h2>
      
      {loading && <p>Loading news...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="space-y-4">
        {articles.slice(5).map((article) => (
          <Link
            key={article.link}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <h3 className="font-medium">{article.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {article.source} • {new Date(article.pubDate).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
};