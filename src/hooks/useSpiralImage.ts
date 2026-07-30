import { useCallback, useEffect, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';

import { CacheManager } from '../cache';
import type { UseSpiralImageResult } from '../types/ImageTypes';

export function useSpiralImage(
  source: ImageSourcePropType
): UseSpiralImageResult {
  const [currentSource, setCurrentSource] =
    useState<ImageSourcePropType>(source);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const resolvedSource = await CacheManager.resolve(source);

      setCurrentSource(resolvedSource);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));

      // fallback
      setCurrentSource(source);
    } finally {
      setLoading(false);
    }
  }, [source]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    source: currentSource,
    loading,
    error,
    reload: load,
  };
}
