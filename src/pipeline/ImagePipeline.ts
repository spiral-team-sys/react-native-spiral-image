import type { ImageSourcePropType } from 'react-native';

import type { SpiralProcessOptions } from '../types';

import { DiskPipeline } from './DiskPipeline';
import { MemoryPipeline } from './MemoryPipeline';
import { NativePipeline } from './NativePipeline';
import { OriginalPipeline } from './OriginalPipeline';
import type { CacheInfo, ResolveResult } from '../types';
import { getCacheKey } from '../utils/getCacheKey';

export class ImagePipeline {
  /**
   * Main resolver
   *
   * Flow
   * Memory
   * ↓
   * Disk
   * ↓
   * Original
   * ↓
   * Network (future)
   */
  static async resolve(
    source: ImageSourcePropType,
    options?: SpiralProcessOptions
  ): Promise<ResolveResult> {
    const key = getCacheKey(source);

    return (
      (await this.resolveMemory(key)) ??
      (await this.resolveDisk(key)) ??
      (await this.resolveOriginal(key, source, options)) ??
      this.resolveNetwork(key, source)
    );
  }

  /**
   * Memory
   */
  private static async resolveMemory(
    key: string
  ): Promise<ResolveResult | null> {
    const path = MemoryPipeline.get(key);

    if (!path) {
      return null;
    }

    const uri = this.toFileUri(path);

    return {
      source: { uri },
      debug: {
        source: 'memory',
        cacheHit: true,
        originalPath: key,
        cachePath: path,
      },
    };
  }

  /**
   * Disk
   */
  private static async resolveDisk(key: string): Promise<ResolveResult | null> {
    const path = await DiskPipeline.get(key);

    if (!path) {
      return null;
    }

    MemoryPipeline.set(key, path);

    const uri = this.toFileUri(path);

    return {
      source: { uri },
      debug: {
        source: 'disk',
        cacheHit: true,
        originalPath: key,
        cachePath: path,
      },
    };
  }

  /**
   * Original File
   */
  private static async resolveOriginal(
    key: string,
    source: ImageSourcePropType,
    options?: SpiralProcessOptions
  ): Promise<ResolveResult | null> {
    if (!OriginalPipeline.isLocal(source)) {
      return null;
    }

    const originalPath = OriginalPipeline.getPath(source);

    if (!originalPath) {
      return null;
    }

    const processed = await NativePipeline.process(
      { uri: originalPath },
      options
    );

    const processedPath =
      typeof processed === 'object' &&
      processed &&
      !Array.isArray(processed) &&
      'uri' in processed
        ? (processed.uri ?? originalPath)
        : originalPath;

    const cachePath = await DiskPipeline.save(key, processedPath);

    MemoryPipeline.set(key, cachePath);

    return {
      source: {
        uri: this.toFileUri(cachePath),
      },
      debug: {
        source: 'original',
        cacheHit: false,
        originalPath,
        cachePath,
      },
    };
  }

  /**
   * Network (Phase 4)
   */
  private static resolveNetwork(
    key: string,
    source: ImageSourcePropType
  ): ResolveResult {
    return {
      source,
      debug: {
        source: 'network',
        cacheHit: false,
        originalPath: key,
      },
    };
  }

  /**
   * Cache information
   */
  static async getInfo(source: ImageSourcePropType): Promise<CacheInfo> {
    const key = getCacheKey(source);

    const memory = MemoryPipeline.get(key);

    if (memory) {
      return {
        key,
        originalPath: key,
        cachePath: memory,
        exists: true,
        memory: true,
      };
    }

    const disk = await DiskPipeline.get(key);

    return {
      key,
      originalPath: key,
      cachePath: disk ?? '',
      exists: disk !== undefined,
      memory: false,
    };
  }

  static async exists(source: ImageSourcePropType): Promise<boolean> {
    const key = getCacheKey(source);

    return MemoryPipeline.has(key) || (await DiskPipeline.has(key));
  }

  static async delete(source: ImageSourcePropType): Promise<boolean> {
    const key = getCacheKey(source);

    MemoryPipeline.remove(key);

    return DiskPipeline.remove(key);
  }

  static async clear(): Promise<void> {
    MemoryPipeline.clear();

    await DiskPipeline.clear();
  }

  private static toFileUri(path: string): string {
    if (!path) {
      return path;
    }

    return path.startsWith('file://') || path.startsWith('content://')
      ? path
      : `file://${path}`;
  }
}
