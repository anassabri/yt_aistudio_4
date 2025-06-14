
import * as React from 'react';
import {  useEffect, useState  } from 'react';
import { Video } from '../types';
import { getLikedVideos } from '../services/mockVideoService';
import VideoCard from '../components/VideoCard';
import { HeartIcon } from '@heroicons/react/24/solid'; // Using Heroicons solid version
import LikedVideosPageSkeleton from '../components/LoadingStates/LikedVideosPageSkeleton';

const LikedVideosPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiked = async () => {
      setLoading(true);
      try {
        const fetchedVideos = await getLikedVideos();
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Failed to fetch liked videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLiked();
  }, []);

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-neutral-950">
      <div className="flex items-center mb-6 sm:mb-8">
        <HeartIcon className="w-7 h-7 sm:w-8 sm:h-8 text-red-500 dark:text-red-400 mr-3" />
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">Liked Videos</h1>
      </div>

      {loading ? (
        <LikedVideosPageSkeleton />
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 md:gap-x-4 gap-y-5 md:gap-y-6">
          {videos.map(video => (
            <VideoCard key={`${video.id}-liked`} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-lg">
           <HeartIcon className="w-16 h-16 text-red-400 dark:text-red-500/70 mx-auto mb-6" />
          <p className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">You haven't liked any videos yet</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-md mx-auto">
            Tap the thumbs up icon on videos you enjoy, and they'll appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default LikedVideosPage;
