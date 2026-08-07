import type { ImageFormat, ImageResult } from '../SpiralImage.nitro';

/**
 * Native process options.
 *
 * Mapped directly to Nitro.
 */
export interface NativeProcessOptions {
  path: string;

  width?: number;

  height?: number;

  quality?: number;

  format?: ImageFormat;

  keepExif?: boolean;
}

/**
 * Native process result.
 */
export interface NativeProcessResult extends ImageResult {}
