import type { HybridObject } from 'react-native-nitro-modules';

export type ImageFormat = 'jpeg' | 'png' | 'webp';

export interface ResizeOptions {
  input: string;
  output: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: ImageFormat;
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
  resize(options: ResizeOptions): ImageResult;
}
