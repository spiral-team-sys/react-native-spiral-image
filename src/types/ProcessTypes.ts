import type { ImageFormat } from '../SpiralImage.nitro';

export interface SpiralProcessOptions {
  resize?: {
    width?: number;
    height?: number;
  };

  output?: {
    path?: string;
    quality?: number;
    format?: ImageFormat;
    keepExif?: boolean;
  };
}
