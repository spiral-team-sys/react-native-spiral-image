import { useCallback, useEffect, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';

import { CacheManager } from '../cache';
import type { ImageDebugInfo, UseSpiralImageResult } from '../types/ImageTypes';

const DEFAULT_DEBUG: ImageDebugInfo = {
  source: 'unknown',
  cacheHit: false,
};

export function useSpiralImage(
  source: ImageSourcePropType
): UseSpiralImageResult {
  const [currentSource, setCurrentSource] =
    useState<ImageSourcePropType>(source);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const [debug, setDebug] = useState<ImageDebugInfo>(DEFAULT_DEBUG);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await CacheManager.resolve(source);

      setCurrentSource(result.source);

      setDebug(result.debug);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));

      // fallback
      setCurrentSource(source);

      setDebug({
        source: 'unknown',
        cacheHit: false,
      });
    } finally {
      setLoading(false);
    }
  }, [source]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    source: currentSource,
    loading,
    error,
    reload: load,
    debug,
  };
}
