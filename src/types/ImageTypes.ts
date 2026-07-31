import type { ImageSourcePropType } from 'react-native';

export type ImageLoadSource =
  'memory' | 'disk' | 'original' | 'network' | 'unknown';

export interface ImageDebugInfo {
  source: ImageLoadSource;
  cacheHit: boolean;

  originalPath?: string;
  cachePath?: string;

  loadTime?: number;
  decodeTime?: number;
  resizeTime?: number;
}

export interface SpiralImageOptions {
  /**
   * Reserved for future versions.
   *
   * Phase 3:
   * - resize
   * - quality
   * - format
   * - priority
   */
}

export interface ResolveResult {
  source: ImageSourcePropType;
  debug: ImageDebugInfo;
}

export interface UseSpiralImageResult {
  source: ImageSourcePropType;

  loading: boolean;

  error: Error | null;

  reload: () => Promise<void>;

  debug: ImageDebugInfo;
}

export interface CacheInfo {
  key: string;
  originalPath: string;
  cachePath: string;
  exists: boolean;
  memory: boolean;
}
