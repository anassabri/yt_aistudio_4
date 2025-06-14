import React, { useState, useEffect, memo   } from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../types';
import { getVideos } from '../services/mockVideoService';
import FireIcon from './icons/FireIcon';
import VideoCard from './VideoCard';

interface TrendingSectionProps {
  maxVideos?: number;
}

const TrendingSection: React.FC<TrendingSectionProps> = memo(({ maxVideos = 6 }) => {
  const [trendingVideos, setTrendingVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      try {
        setLoading(true);
        const allVideos = await getVideos();
        // Sort by views (convert string to number for sorting)
        const sortedByViews = allVideos
          .filter(video => !video.isShort) // Exclude shorts from trending
          .sort((a, b) => {
            const viewsA = parseFloat(a.views.replace(/[^0-9.]/g, ''));
            const viewsB = parseFloat(b.views.replace(/[^0-9.]/g, ''));
            return viewsB - viewsA;
          })
          .slice(0, maxVideos);
        
        setTrendingVideos(sortedByViews);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch trending videos:', err);
        setError('Could not load trending videos at this time.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingVideos();
  }, [maxVideos]);

  if (loading) {
    return (
      <div className="mb-8 px-4">
        <div className="flex items-center mb-4">
          <FireIcon className="w-6 h-6 mr-2 text-red-600 dark:text-red-500" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Trending</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-neutral-900 rounded-xl animate-pulse">
              <div className="aspect-video bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
              <div className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-300 dark:bg-neutral-700/80 mt-0.5 flex-shrink-0"></div>
                  <div className="flex-grow space-y-1.5 pt-0.5">
                    <div className="h-4 bg-neutral-300 dark:bg-neutral-700/80 rounded w-5/6"></div>
                    <div className="h-3 bg-neutral-300 dark:bg-neutral-700/80 rounded w-3/4"></div>
                    <div className="h-3 bg-neutral-300 dark:bg-neutral-700/80 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8 px-4">
        <div className="flex items-center mb-4">
          <FireIcon className="w-6 h-6 mr-2 text-red-600 dark:text-red-500" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Trending</h2>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
      </div>
    );
  }

  if (trendingVideos.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FireIcon className="w-6 h-6 mr-2 text-red-600 dark:text-red-500" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Trending</h2>
        </div>
        <Link 
          to="/trending"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {trendingVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
});

export default TrendingSection;