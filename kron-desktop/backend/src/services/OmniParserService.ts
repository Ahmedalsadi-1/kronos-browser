import axios from "axios";
import { config } from "../config";
import { OmniParserElement, OmniParserProcessedElement, OmniParserResponse } from './interfaces/BrowserService';
import sharp from 'sharp';

export class OmniParserService {
  serverUrl: string;
  enabled: boolean;

  constructor() {
    this.serverUrl = config.omniParser.serverUrl;
    this.enabled = config.omniParser.enabled;
  }

  async processImage(base64Image: string): Promise<OmniParserResponse | null> {
    if (!this.enabled || base64Image.length === 0) {
      return null;
    }

    const metadata = await sharp(Buffer.from(base64Image, 'base64')).metadata();

    try {
      const url = `${this.serverUrl}/parse/`;
      const response = await axios.post(
        url,
        JSON.stringify({
          base64_image: base64Image,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return {
        processedImage: response.data.som_image_base64,
        elements: this.elementCoordinateGenerate(
          response.data.parsed_content_list,
          metadata.height as number,
          metadata.width as number,
        ),
      };
    } catch (error: any) {
      console.error('OmniParser processing failed:', error);
      return null;
    }
  }

  elementCoordinateGenerate(
    elementList: OmniParserElement[],
    imageHeight: number,
    imageWidth: number,
  ): OmniParserProcessedElement[] {
    return elementList.map((element) => {
      return {
        content: element.content,
        interactivity: element.interactivity,
        coordinates: this.calculateCoordinate(
          element.bbox,
          imageHeight,
          imageWidth,
        ),
      };
    });
  }

  calculateCoordinate(bbox: number[], height: number, width: number): string {
    const left = width * bbox[0];
    const top = height * bbox[1];
    const boxWidth = width * bbox[2];
    const boxHeight = height * bbox[3];
    return `${Math.floor((left + boxWidth) / 2)},${Math.floor((top + boxHeight) / 2)}`;
  }
}

export default new OmniParserService();
