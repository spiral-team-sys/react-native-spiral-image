import { MemoryCache } from '../cache/MemoryCache';

const memory = new MemoryCache();

export class MemoryPipeline {
  /**
   * Get cached file path
   */
  static get(key: string): string | undefined {
    return memory.get(key);
  }

  /**
   * Check cache exists
   */
  static has(key: string): boolean {
    return memory.has(key);
  }

  /**
   * Save cache path
   */
  static set(key: string, value: string): void {
    memory.set(key, value);
  }

  /**
   * Remove single cache
   */
  static remove(key: string): boolean {
    return memory.remove(key);
  }

  /**
   * Clear all memory cache
   */
  static clear(): void {
    memory.clear();
  }

  /**
   * Cache size
   */
  static size(): number {
    return memory.size();
  }

  /**
   * Cache keys
   */
  static keys(): string[] {
    return memory.keys();
  }
}
