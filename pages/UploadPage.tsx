import * as React from 'react';
import {  useState, useRef  } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CloudArrowUpIcon,
  VideoCameraIcon,
  EyeIcon,
  GlobeAltIcon,
  LockClosedIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { UnifiedButton } from '../components/ui/UnifiedButton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';

interface UploadedFile {
  file: File;
  preview: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
}

interface VideoMetadata {
  title: string;
  description: string;
  visibility: 'public' | 'unlisted' | 'private';
  category: string;
  tags: string[];
  thumbnail: string | null;
  monetization: boolean;
  commentsEnabled: boolean;
  ageRestriction: boolean;
}

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [metadata, setMetadata] = useState<VideoMetadata>({
    title: '',
    description: '',
    visibility: 'public',
    category: 'Entertainment',
    tags: [],
    thumbnail: null,
    monetization: false,
    commentsEnabled: true,
    ageRestriction: false
  });
  const [tagInput, setTagInput] = useState('');

  const categories = [
    'Entertainment', 'Education', 'Gaming', 'Music', 'News & Politics',
    'Science & Technology', 'Sports', 'Travel & Events', 'People & Blogs',
    'Comedy', 'Film & Animation', 'Autos & Vehicles'
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file');
      return;
    }

    // Validate file size (max 2GB for demo)
    if (file.size > 2 * 1024 * 1024 * 1024) {
      alert('File size must be less than 2GB');
      return;
    }

    const preview = URL.createObjectURL(file);
    const newFile: UploadedFile = {
      file,
      preview,
      progress: 0,
      status: 'uploading'
    };

    setUploadedFile(newFile);
    setMetadata(prev => ({
      ...prev,
      title: file.name.replace(/\.[^/.]+$/, '') // Remove file extension
    }));

    // Simulate upload progress
    simulateUpload(newFile);
  };

  const simulateUpload = (_file: UploadedFile) => {
    const interval = setInterval(() => {
      setUploadedFile(prev => {
        if (!prev) return null;
        
        const newProgress = prev.progress + Math.random() * 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return {
            ...prev,
            progress: 100,
            status: 'processing'
          };
        }
        
        return {
          ...prev,
          progress: newProgress
        };
      });
    }, 200);

    // Simulate processing completion
    setTimeout(() => {
      setUploadedFile(prev => prev ? {
        ...prev,
        status: 'completed'
      } : null);
    }, 5000);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fakeEvent = {
        target: { files: [file] }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !metadata.tags.includes(tagInput.trim())) {
      setMetadata(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setMetadata(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handlePublish = () => {
    if (!uploadedFile || uploadedFile.status !== 'completed') {
      alert('Please wait for the video to finish processing');
      return;
    }

    if (!metadata.title.trim()) {
      alert('Please enter a title for your video');
      return;
    }

    // Simulate publishing
    alert('Video published successfully!');
    navigate('/studio');
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return <GlobeAltIcon className="w-4 h-4" />;
      case 'unlisted': return <EyeIcon className="w-4 h-4" />;
      case 'private': return <LockClosedIcon className="w-4 h-4" />;
      default: return <GlobeAltIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <VideoCameraIcon className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Upload Video
            </h1>
          </div>
          
          <UnifiedButton
            variant="ghost"
            onClick={() => navigate('/studio')}
          >
            <XMarkIcon className="w-5 h-5 mr-2" />
            Cancel
          </UnifiedButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            {!uploadedFile ? (
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <CloudArrowUpIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Select files to upload
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Or drag and drop video files
                </p>
                <UnifiedButton variant="primary">
                  Select Files
                </UnifiedButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Your videos will be private until you publish them.
                </p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                {/* Upload Progress */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <video
                      src={uploadedFile.preview}
                      className="w-24 h-14 object-cover rounded"
                      controls={false}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {uploadedFile.file.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {(uploadedFile.file.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {uploadedFile.status === 'completed' && (
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      )}
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {uploadedFile.status === 'uploading' && 'Uploading...'}
                        {uploadedFile.status === 'processing' && 'Processing...'}
                        {uploadedFile.status === 'completed' && 'Ready to publish'}
                        {uploadedFile.status === 'error' && 'Upload failed'}
                      </span>
                    </div>
                  </div>
                  
                  {uploadedFile.status !== 'completed' && (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadedFile.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Video Details Form */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="visibility">Visibility</TabsTrigger>
                    <TabsTrigger value="monetization">Monetization</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title (required)
                      </label>
                      <input
                        type="text"
                        value={metadata.title}
                        onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Add a title that describes your video"
                        maxLength={100}
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {metadata.title.length}/100
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={metadata.description}
                        onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Tell viewers about your video"
                        maxLength={5000}
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {metadata.description.length}/5000
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={metadata.category}
                        onChange={(e) => setMetadata(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {metadata.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Add a tag"
                        />
                        <UnifiedButton variant="outline" onClick={addTag}>
                          Add
                        </UnifiedButton>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="visibility" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Choose when to publish and who can see your video
                      </h3>
                      
                      <div className="space-y-3">
                        {[
                          { value: 'public', label: 'Public', description: 'Anyone can search for and view' },
                          { value: 'unlisted', label: 'Unlisted', description: 'Anyone with the link can view' },
                          { value: 'private', label: 'Private', description: 'Only you can view' }
                        ].map(option => (
                          <label
                            key={option.value}
                            className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <input
                              type="radio"
                              name="visibility"
                              value={option.value}
                              checked={metadata.visibility === option.value}
                              onChange={(e) => setMetadata(prev => ({ ...prev, visibility: e.target.value as any }))}
                              className="mr-3"
                            />
                            <div className="flex items-center space-x-3">
                              {getVisibilityIcon(option.value)}
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {option.label}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {option.description}
                                </p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={metadata.commentsEnabled}
                          onChange={(e) => setMetadata(prev => ({ ...prev, commentsEnabled: e.target.checked }))}
                          className="mr-3"
                        />
                        <span className="text-gray-900 dark:text-white">Allow comments</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={metadata.ageRestriction}
                          onChange={(e) => setMetadata(prev => ({ ...prev, ageRestriction: e.target.checked }))}
                          className="mr-3"
                        />
                        <span className="text-gray-900 dark:text-white">Age restriction (18+)</span>
                      </label>
                    </div>
                  </TabsContent>

                  <TabsContent value="monetization" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Monetization
                      </h3>
                      
                      <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <input
                          type="checkbox"
                          checked={metadata.monetization}
                          onChange={(e) => setMetadata(prev => ({ ...prev, monetization: e.target.checked }))}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Enable monetization
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Allow ads to be shown on your video
                          </p>
                        </div>
                      </label>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {uploadedFile && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Video Preview
                </h3>
                <video
                  src={uploadedFile.preview}
                  controls
                  className="w-full rounded-lg"
                />
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Publish Options
              </h3>
              
              <div className="space-y-4">
                <UnifiedButton
                  variant="primary"
                  fullWidth
                  onClick={handlePublish}
                  disabled={!uploadedFile || uploadedFile.status !== 'completed' || !metadata.title.trim()}
                >
                  Publish
                </UnifiedButton>
                
                <UnifiedButton variant="outline" fullWidth>
                  Save as Draft
                </UnifiedButton>
                
                <UnifiedButton variant="ghost" fullWidth>
                  Schedule for Later
                </UnifiedButton>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Upload Tips
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Use a clear, descriptive title</li>
                <li>• Add relevant tags to help people find your video</li>
                <li>• Choose an eye-catching thumbnail</li>
                <li>• Write a detailed description</li>
                <li>• Select the appropriate category</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
