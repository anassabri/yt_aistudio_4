import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Short } from '../src/types/core';
import { getShortsVideos } from '../services/mockVideoService';
import ShortsIcon from './icons/ShortsIcon';
import ShortDisplayCard from './ShortDisplayCard';

interface ShortsSectionProps {
  maxShorts?: number;
}

const ShortsSection: React.FC<ShortsSectionProps> = ({ maxShorts = 10 }) => {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        setLoading(true);
        // Assuming your video service can filter by a 'Shorts' category or similar
        // Get shorts videos directly from the service
        const allShortsVideos = await getShortsVideos();
        const shortsVideos = allShortsVideos.slice(0, maxShorts);

        // Convert Video objects to Short objects
        const convertedShorts: Short[] = shortsVideos.map(video => {
          const shortVideo: Short = {
             ...video,
             duration: parseInt(video.duration) || 60, // Convert string duration to number
             isVertical: true,
             visibility: (video.visibility === 'scheduled' ? 'public' : video.visibility) as 'public' | 'private' | 'unlisted',
             createdAt: video.createdAt || new Date().toISOString(),
             updatedAt: video.updatedAt || new Date().toISOString(),
             // Ensure all required Short properties are present
             isShort: true,
             effects: [],
             music: undefined
           } as any as Short;
          return shortVideo;
        });

        setShorts(convertedShorts);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch shorts:', err);
        setError('Could not load Shorts at this time.');
      } finally {
        setLoading(false);
      }
    };

    fetchShorts();
  }, [maxShorts]);

  if (loading) {
    return (
      <div className="mb-8 px-4">
        <div className="flex items-center mb-3">
          <ShortsIcon className="w-6 h-6 mr-2 text-red-600 dark:text-red-500" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Shorts</h2>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-40 h-72 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse flex-shrink-0"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8 px-4">
        <div className="flex items-center mb-3">
          <ShortsIcon className="w-6 h-6 mr-2 text-red-600 dark:text-red-500" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Shorts</h2>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
      </div>
    );
  }

  if (shorts.length === 0) {
    return null; // Don't render the section if there are no shorts
  }

  return (
    <div className="mb-8 px-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <ShortsIcon className="w-6 h-6 mr-2 text-red-600 dark:text-red-500" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Shorts</h2>
        </div>
        <Link
          to="/shorts"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
        >
          View All
        </Link>
      </div>
      <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        {shorts.map(short => (
          <Link key={short.id} to={`/shorts?v=${short.id}`} className="flex-shrink-0">
            <ShortDisplayCard short={short} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShortsSection;