import type { HybridObject } from 'react-native-nitro-modules';

export type ImageFormat = 'jpeg' | 'png' | 'webp';
export interface ResizeOptions {
  width?: number;
  height?: number;
}

export interface OutputOptions {
  path: string;
  quality?: number;
  format?: ImageFormat;
  keepExif?: boolean;
}

export interface ProcessOptions {
  /**
   * Original image path
   */
  path: string;

  /**
   * Resize configuration
   */
  resize?: ResizeOptions;

  /**
   * Output configuration
   */
  output?: OutputOptions;
}

export interface ImageResult {
  id: string;

  path: string;

  permanentPath: string;

  width: number;

  height: number;

  size: number;
}

export interface SpiralImage extends HybridObject<{
  ios: 'swift';
  android: 'kotlin';
}> {
  process(options: ProcessOptions): Promise<ImageResult>;
}
