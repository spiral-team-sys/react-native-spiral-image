import type { ImageSourcePropType } from 'react-native';

import { MemoryCache } from './MemoryCache';
import { ImagePipeline } from '../pipeline';

const memory = new MemoryCache();

export class CacheManager {
  static get(key: string): string | undefined {
    return memory.get(key);
  }

  static has(key: string): boolean {
    return memory.has(key);
  }

  static set(key: string, value: string): void {
    memory.set(key, value);
  }

  static remove(key: string): boolean {
    return memory.remove(key);
  }

  static clear(): void {
    memory.clear();
  }

  static getCacheSize(): number {
    return memory.size();
  }

  static keys(): string[] {
    return memory.keys();
  }

  static async resolve(
    source: ImageSourcePropType
  ): Promise<ImageSourcePropType> {
    // Local image (require)
    if (typeof source === 'number') {
      return source;
    }

    // Image array (fallback sources)
    if (Array.isArray(source)) {
      return source;
    }

    // Invalid source
    if (!source || typeof source !== 'object') {
      return source;
    }

    // URI image
    if ('uri' in source && source.uri) {
      const cached = this.get(source.uri);

      if (cached) {
        return {
          ...source,
          uri: cached,
        };
      }

      return ImagePipeline.load(source);
    }

    return source;
  }
}
