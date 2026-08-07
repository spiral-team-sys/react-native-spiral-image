import type { ImageSourcePropType } from 'react-native';

/**
 * Cache policy.
 *
 * Reserved for future versions.
 */
export type CachePolicy = 'memory' | 'disk' | 'memory-disk' | 'none';

/**
 * Cache information.
 */
export interface CacheInfo {
  /**
   * Unique cache key.
   */
  key: string;

  /**
   * Original image path or URL.
   */
  originalPath: string;

  /**
   * Cached file path.
   */
  cachePath: string;

  /**
   * Cache exists.
   */
  exists: boolean;

  /**
   * Memory cache hit.
   */
  memory: boolean;
}

/**
 * Cache entry.
 */
export interface CacheEntry {
  key: string;

  source: ImageSourcePropType;

  cachePath: string;

  createdAt: number;

  lastAccess: number;

  size?: number;
}

/**
 * Cache statistics.
 */
export interface CacheStats {
  memoryItems: number;

  diskItems: number;

  memorySize: number;

  diskSize: number;
}
