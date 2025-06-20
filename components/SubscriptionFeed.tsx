import React, { useEffect, useState   } from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../types';
import { getVideos } from '../services/mockVideoService';
import SubscriptionsIcon from './icons/SubscriptionsIcon';
import VideoCard from './VideoCard';

interface SubscriptionFeedProps {
  maxVideos?: number;
}

const SubscriptionFeed: React.FC<SubscriptionFeedProps> = ({ maxVideos = 8 }) => {
  const [subscriptionVideos, setSubscriptionVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionVideos = async () => {
      try {
        setLoading(true);
        const allVideos = await getVideos();
        
        // Mock subscribed channels - in a real app, this would come from user data
        const subscribedChannels = [
          'Nature Explorers',
          'TechLevelUp', 
          'Chef Studio',
          'Science Explained',
          'Fitness Journey',
          'Music Vibes'
        ];
        
        // Filter videos from subscribed channels and sort by upload date
        const subscriptionFeed = allVideos
          .filter(video => subscribedChannels.includes(video.channelName) && !video.isShort)
          .sort((a, b) => {
            // Sort by most recent (this is a simple mock - in reality you'd parse actual dates)
            const timeA = a.uploadedAt.includes('hour') ? 1 : 
                         a.uploadedAt.includes('day') ? parseInt(a.uploadedAt) || 7 :
                         a.uploadedAt.includes('week') ? (parseInt(a.uploadedAt) || 1) * 7 : 30;
            const timeB = b.uploadedAt.includes('hour') ? 1 : 
                         b.uploadedAt.includes('day') ? parseInt(b.uploadedAt) || 7 :
                         b.uploadedAt.includes('week') ? (parseInt(b.uploadedAt) || 1) * 7 : 30;
            return timeA - timeB;
          })
          .slice(0, maxVideos);
        
        setSubscriptionVideos(subscriptionFeed);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch subscription videos:', err);
        setError('Could not load subscription feed at this time.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionVideos();
  }, [maxVideos]);

  if (loading) {
    return (
      <div className="mb-8 px-4">
        <div className="flex items-center mb-4">
          <SubscriptionsIcon className="w-6 h-6 mr-2 text-red-600 dark:text-red-500" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Latest from your subscriptions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
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
          <SubscriptionsIcon className="w-6 h-6 mr-2 text-red-600 dark:text-red-500" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Latest from your subscriptions</h2>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
      </div>
    );
  }

  if (subscriptionVideos.length === 0) {
    return (
      <div className="mb-8 px-4">
        <div className="flex items-center mb-4">
          <SubscriptionsIcon className="w-6 h-6 mr-2 text-red-600 dark:text-red-500" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Latest from your subscriptions</h2>
        </div>
        <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
          <p className="mb-2">No new videos from your subscriptions</p>
          <Link 
            to="/trending"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 font-medium"
          >
            Discover new channels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <SubscriptionsIcon className="w-6 h-6 mr-2 text-red-600 dark:text-red-500" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Latest from your subscriptions</h2>
        </div>
        <Link 
          to="/subscriptions"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subscriptionVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionFeed;