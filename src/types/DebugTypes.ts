export type ImageLoadSource =
  'memory' | 'disk' | 'original' | 'network' | 'unknown';

/**
 * Performance metrics.
 */
export interface ImagePerformanceInfo {
  /**
   * Total pipeline time.
   */
  loadTime?: number;

  /**
   * Decode image.
   */
  decodeTime?: number;

  /**
   * Resize image.
   */
  resizeTime?: number;

  /**
   * Encode image.
   */
  encodeTime?: number;

  /**
   * Write cache.
   */
  cacheTime?: number;
}

/**
 * Debug information.
 */
export interface ImageDebugInfo extends ImagePerformanceInfo {
  /**
   * Image loaded from.
   */
  source: ImageLoadSource;

  /**
   * Memory/Disk cache hit.
   */
  cacheHit: boolean;

  /**
   * Original file path or URL.
   */
  originalPath?: string;

  /**
   * Cached file path.
   */
  cachePath?: string;
}

/**
 * Pipeline debug log.
 */
export interface PipelineLog {
  timestamp: number;

  stage:
    | 'memory'
    | 'disk'
    | 'original'
    | 'network'
    | 'native'
    | 'decode'
    | 'resize'
    | 'encode'
    | 'cache';

  message: string;
}

/**
 * Benchmark result.
 */
export interface BenchmarkResult {
  totalTime: number;

  imageCount: number;

  cacheHits: number;

  cacheMisses: number;
}
