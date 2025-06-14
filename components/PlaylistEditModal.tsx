import React, { useState, useEffect, useRef   } from 'react';

interface PlaylistEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle: string;
  initialDescription: string;
  onSaveChanges: (title: string, description: string) => Promise<void>;
}

const PlaylistEditModal: React.FC<PlaylistEditModalProps> = ({ 
  isOpen, 
  onClose, 
  initialTitle, 
  initialDescription, 
  onSaveChanges 
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const modalRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Playlist title cannot be empty.");
      return;
    }
    await onSaveChanges(title, description);
    // onClose(); // Parent component will handle closing on successful save
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-fast">
      <form 
        ref={modalRef}
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl w-full max-w-md space-y-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-playlist-title-modal"
      >
        <h2 id="edit-playlist-title-modal" className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Edit playlist details</h2>
        <div>
          <label htmlFor="playlistTitleModal" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Title</label>
          <input 
            type="text" 
            id="playlistTitleModal" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            required
          />
        </div>
        <div>
          <label htmlFor="playlistDescriptionModal" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Description (optional)</label>
          <textarea 
            id="playlistDescriptionModal" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows={3}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-md border border-neutral-300 dark:border-neutral-500 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-neutral-800 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaylistEditModal;