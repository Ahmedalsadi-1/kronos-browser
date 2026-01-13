import { useState, useEffect } from 'react';
import { getFileStructure } from '../../services/api';
import { config } from '../../config';
import { Button } from "@nextui-org/react";

interface FileSystemItem {
  name: string;
  type: 'file' | 'directory';
  path: string;
}

interface FolderSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
}

export const FolderSelectModal = ({ isOpen, onClose, onSelect }: FolderSelectModalProps) => {
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [pathHistory, setPathHistory] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Start with user's home directory from config
      const homePath = config.system.homePath;
      setPathHistory([homePath]);
      loadDirectory(homePath);
    }
  }, [isOpen]);

  const loadDirectory = async (path: string, isBack = false) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getFileStructure(path);
      // Filter to show only directories in the modal
      const directories = data.filter((item: FileSystemItem) => item.type === 'directory');
      setItems(directories);
      setCurrentPath(path);
      
      if (!isBack) {
        setPathHistory(prev => [...prev, path]);
      }
    } catch (err) {
      setError('Failed to load directory');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (pathHistory.length > 1) {
      const newHistory = [...pathHistory];
      newHistory.pop(); // Remove current path
      const previousPath = newHistory[newHistory.length - 1];
      setPathHistory(newHistory);
      loadDirectory(previousPath, true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-lg w-[600px] max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-white text-lg">Select Project Folder</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex items-center px-4 py-2 border-b border-gray-700 bg-[#2d2d2d]">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={handleBack}
            isDisabled={pathHistory.length <= 1}
            className="mr-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Button>
          <div className="text-gray-400 text-sm truncate text-left flex-1">
            {currentPath}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {error && (
            <div className="text-red-500 mb-4 p-2 bg-red-900/20 rounded">
              {error}
            </div>
          )}
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="space-y-1">
              {items.map((item) => (
                <div
                  key={item.path}
                  className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-700 group"
                  onClick={() => loadDirectory(item.path)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H2V6zm0 3v6a2 2 0 002 2h12a2 2 0 002-2V9H2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 group-hover:text-white">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-700 flex justify-end">
          <Button
            variant="light"
            onPress={onClose}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={() => {
              onSelect(currentPath);
              onClose();
            }}
          >
            Select Folder
          </Button>
        </div>
      </div>
    </div>
  );
};
