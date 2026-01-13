import * as fs from 'fs/promises';
import * as path from 'path';

interface SaveScreenshotParams {
  chatId: string;
  folderPath: string;
  source: string;
  screenshot: string;
}

class ScreenshotController {
  async saveScreenshot({ chatId, folderPath, source, screenshot }: SaveScreenshotParams): Promise<string> {
    try {
      // Create screenshots directory if it doesn't exist
      const screenshotsDir = path.join(folderPath, 'screenshots', chatId);
      await fs.mkdir(screenshotsDir, { recursive: true });

      // Generate unique filename
      const timestamp = new Date().getTime();
      const filename = `${source}_${timestamp}.jpg`;
      const filePath = path.join(screenshotsDir, filename);

      // Convert base64 to buffer and save
      const buffer = Buffer.from(screenshot, 'base64');
      await fs.writeFile(filePath, buffer);

      return filePath;
    } catch (error) {
      console.error('Failed to save screenshot:', error);
      throw error;
    }
  }
}

export const screenshotController = new ScreenshotController();
