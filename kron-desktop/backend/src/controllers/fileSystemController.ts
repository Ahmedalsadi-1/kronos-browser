import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { config } from '../config';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

interface FileSystemItem {
  name: string;
  type: 'file' | 'directory';
  path: string;
}

export const getFileStructure = async (req: Request, res: Response) => {
  try {
    // Check if explorer functionality is enabled
    if (!config.explorer.enabled) {
      return res.status(403).json({ 
        error: 'File system functionality is disabled' 
      });
    }

    const folderPath = req.query.path as string;
    
    if (!folderPath) {
      return res.status(400).json({ 
        error: 'Path is required' 
      });
    }

    // Validate path is allowed
    const isAllowedPath = config.explorer.allowedPaths.some(allowedPath => 
      folderPath.startsWith(allowedPath)
    );

    if (!isAllowedPath) {
      return res.status(403).json({ 
        error: 'Access to this path is not allowed',
        allowedPaths: config.explorer.allowedPaths
      });
    }

    // Check directory depth
    const depth = folderPath.split(path.sep).length;
    if (depth > config.explorer.maxDepth) {
      return res.status(400).json({ 
        error: `Maximum directory depth of ${config.explorer.maxDepth} exceeded` 
      });
    }

    const items = await readdir(folderPath);
    
    // Apply exclusion filter, hidden folder filter, and file limit
    const filteredItems = items
      .filter(item => !config.explorer.excludedFolders.includes(item))
      .filter(item => !item.startsWith('.')) // Filter out hidden folders and files
      .slice(0, config.explorer.maxFilesPerDirectory);

    const itemsWithStats = await Promise.all(
      filteredItems.map(async (item) => {
        const fullPath = path.join(folderPath, item);
        const stats = await stat(fullPath);
        const isDirectory = stats.isDirectory();

        const fileItem: FileSystemItem = {
          name: item,
          type: isDirectory ? 'directory' : 'file',
          path: fullPath
        };

        return fileItem;
      })
    );

    res.json(itemsWithStats);
  } catch (error) {
    console.error('Error reading file structure:', error);
    res.status(500).json({ 
      error: 'Failed to read file structure',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Middleware to check if explorer is enabled
export const checkExplorerEnabled = (req: Request, res: Response, next: Function) => {
  if (!config.explorer.enabled) {
    return res.status(403).json({ 
      error: 'File system functionality is disabled' 
    });
  }
  next();
};
