import type { ImageSourcePropType } from 'react-native';

import type { ResolveResult, SpiralImageOptions } from '../types/ImageTypes';

import { ImagePipeline } from '../pipeline';

export interface CacheInfo {
  key: string;
  originalPath: string;
  cachePath: string;
  exists: boolean;
  memory: boolean;
}

export class CacheManager {
  /**
   * Generate cache key
   */
  static getKey(source: ImageSourcePropType): string {
    if (typeof source === 'number') {
      return source.toString();
    }

    if (Array.isArray(source)) {
      const first = source[0];

      if (!first) {
        return '';
      }

      return first.uri ?? JSON.stringify(first);
    }

    if (source && typeof source === 'object' && 'uri' in source) {
      return source.uri ?? '';
    }

    return JSON.stringify(source);
  }

  /**
   * Main image resolver
   */
  static async resolve(
    source: ImageSourcePropType,
    options?: SpiralImageOptions
  ): Promise<ResolveResult> {
    return ImagePipeline.resolve(source, options);
  }

  /**
   * Cache information
   */
  static async getInfo(source: ImageSourcePropType): Promise<CacheInfo> {
    return ImagePipeline.getInfo(source);
  }

  /**
   * Check cache
   */
  static async exists(source: ImageSourcePropType): Promise<boolean> {
    return ImagePipeline.exists(source);
  }

  /**
   * Delete cache
   */
  static async delete(source: ImageSourcePropType): Promise<boolean> {
    return ImagePipeline.delete(source);
  }

  /**
   * Clear all cache
   */
  static async clear(): Promise<void> {
    return ImagePipeline.clear();
  }
}
