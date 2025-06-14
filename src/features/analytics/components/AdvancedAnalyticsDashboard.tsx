import type * as React from 'react';
import {  useState, useMemo  } from 'react';

import {
  EyeIcon,
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

interface AnalyticsData {
  overview: {
    totalViews: number;
    totalWatchTime: number;
    subscribers: number;
    totalVideos: number;
    averageViewDuration: number;
    clickThroughRate: number;
  };
  timeSeriesData: Array<{
    date: string;
    views: number;
    watchTime: number;
    subscribers: number;
    revenue: number;
  }>;
  demographics: {
    ageGroups: Array<{ range: string; percentage: number }>;
    genders: Array<{ gender: string; percentage: number }>;
    countries: Array<{ country: string; percentage: number; views: number }>;
  };
  devices: {
    mobile: number;
    desktop: number;
    tablet: number;
    tv: number;
  };
  topVideos: Array<{
    id: string;
    title: string;
    views: number;
    watchTime: number;
    likes: number;
    comments: number;
    thumbnail: string;
    publishedAt: string;
  }>;
  engagement: {
    likes: number;
    dislikes: number;
    comments: number;
    shares: number;
    subscribersGained: number;
    subscribersLost: number;
  };
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ComponentType<any>;
  iconColor: string;
  format?: 'number' | 'duration' | 'percentage' | 'currency';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  format = 'number',
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') {
return val;
}

    switch (format) {
      case 'duration':
        const hours = Math.floor(val / 3600);
        const minutes = Math.floor((val % 3600) / 60);
        return `${hours}h ${minutes}m`;
      case 'percentage':
        return `${val.toFixed(1)}%`;
      case 'currency':
        return `$${val.toLocaleString()}`;
      default:
        return val.toLocaleString();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {formatValue(value)}
          </p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {change >= 0 ? (
                <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
              )}
              {Math.abs(change).toFixed(1)}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export const AdvancedAnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'views' | 'watchTime' | 'subscribers' | 'revenue'>('views');

  // Mock analytics data
  const analyticsData: AnalyticsData = useMemo(() => ({
    overview: {
      totalViews: 1250000,
      totalWatchTime: 45000000, // seconds
      subscribers: 125000,
      totalVideos: 156,
      averageViewDuration: 4.2, // minutes
      clickThroughRate: 12.5, // percentage
    },
    timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0] || '',
      views: Math.floor(Math.random() * 50000) + 20000,
      watchTime: Math.floor(Math.random() * 2000000) + 500000,
      subscribers: Math.floor(Math.random() * 500) + 100,
      revenue: Math.floor(Math.random() * 1000) + 200,
    })),
    demographics: {
      ageGroups: [
        { range: '13-17', percentage: 15.2 },
        { range: '18-24', percentage: 28.7 },
        { range: '25-34', percentage: 32.1 },
        { range: '35-44', percentage: 16.8 },
        { range: '45-54', percentage: 5.9 },
        { range: '55+', percentage: 1.3 },
      ],
      genders: [
        { gender: 'Male', percentage: 62.4 },
        { gender: 'Female', percentage: 35.8 },
        { gender: 'Other', percentage: 1.8 },
      ],
      countries: [
        { country: 'United States', percentage: 35.2, views: 440000 },
        { country: 'United Kingdom', percentage: 12.8, views: 160000 },
        { country: 'Canada', percentage: 8.9, views: 111250 },
        { country: 'Australia', percentage: 6.7, views: 83750 },
        { country: 'Germany', percentage: 5.4, views: 67500 },
      ],
    },
    devices: {
      mobile: 68.5,
      desktop: 24.3,
      tablet: 5.8,
      tv: 1.4,
    },
    topVideos: [
      {
        id: '1',
        title: 'How to Build a React App in 2024',
        views: 125000,
        watchTime: 850000,
        likes: 8900,
        comments: 1200,
        thumbnail: 'https://picsum.photos/160/90?random=1',
        publishedAt: '2024-01-15',
      },
      {
        id: '2',
        title: 'Advanced TypeScript Tips',
        views: 98000,
        watchTime: 720000,
        likes: 7200,
        comments: 890,
        thumbnail: 'https://picsum.photos/160/90?random=2',
        publishedAt: '2024-01-10',
      },
      {
        id: '3',
        title: 'CSS Grid vs Flexbox',
        views: 87000,
        watchTime: 650000,
        likes: 6800,
        comments: 750,
        thumbnail: 'https://picsum.photos/160/90?random=3',
        publishedAt: '2024-01-08',
      },
    ],
    engagement: {
      likes: 45600,
      dislikes: 1200,
      comments: 12800,
      shares: 8900,
      subscribersGained: 2400,
      subscribersLost: 180,
    },
  }), []);

  const chartData = analyticsData.timeSeriesData.map(item => ({
    ...item,
    value: item[selectedMetric],
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track your channel's performance and audience insights
            </p>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <CalendarIcon className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Views"
            value={analyticsData.overview.totalViews}
            change={12.5}
            icon={EyeIcon}
            iconColor="bg-blue-500"
          />
          <MetricCard
            title="Watch Time"
            value={analyticsData.overview.totalWatchTime}
            change={8.3}
            icon={ClockIcon}
            iconColor="bg-green-500"
            format="duration"
          />
          <MetricCard
            title="Subscribers"
            value={analyticsData.overview.subscribers}
            change={-2.1}
            icon={UserGroupIcon}
            iconColor="bg-purple-500"
          />
          <MetricCard
            title="Avg. View Duration"
            value={analyticsData.overview.averageViewDuration}
            change={5.7}
            icon={ClockIcon}
            iconColor="bg-orange-500"
          />
        </div>

        {/* Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Performance Overview
            </h2>
            <div className="flex space-x-2">
              {(['views', 'watchTime', 'subscribers', 'revenue'] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedMetric === metric
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Simple chart representation */}
          <div className="h-64 flex items-end justify-between gap-1">
            {chartData.slice(-14).map((item, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-t flex-1 min-w-0 transition-all hover:bg-blue-600"
                style={{
                  height: `${(item.value / Math.max(...chartData.map(d => d.value))) * 100}%`,
                  minHeight: '4px',
                }}
                title={`${new Date(item.date).toLocaleDateString()}: ${item.value.toLocaleString()}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Videos */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Performing Videos
            </h3>
            <div className="space-y-4">
              {analyticsData.topVideos.map((video, index) => (
                <div key={video.id} className="flex items-center gap-4">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                    #{index + 1}
                  </div>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-16 h-9 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>{video.views.toLocaleString()} views</span>
                      <span>{video.likes.toLocaleString()} likes</span>
                      <span>{video.comments.toLocaleString()} comments</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demographics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Audience Demographics
            </h3>

            <div className="space-y-6">
              {/* Age Groups */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Age Groups</h4>
                <div className="space-y-2">
                  {analyticsData.demographics.ageGroups.map((group) => (
                    <div key={group.range} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{group.range}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${group.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                          {group.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Countries */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Top Countries</h4>
                <div className="space-y-2">
                  {analyticsData.demographics.countries.slice(0, 5).map((country) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{country.country}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${country.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                          {country.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Device & Engagement Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Device Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Device Breakdown
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DevicePhoneMobileIcon className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Mobile</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {analyticsData.devices.mobile}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ComputerDesktopIcon className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Desktop</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {analyticsData.devices.desktop}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GlobeAltIcon className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tablet</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {analyticsData.devices.tablet}%
                </span>
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Engagement Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full mx-auto mb-2">
                  <HeartIcon className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analyticsData.engagement.likes.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Likes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-2">
                  <ChatBubbleLeftIcon className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analyticsData.engagement.comments.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Comments</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full mx-auto mb-2">
                  <ShareIcon className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analyticsData.engagement.shares.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Shares</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full mx-auto mb-2">
                  <UserGroupIcon className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  +{analyticsData.engagement.subscribersGained.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">New Subscribers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
