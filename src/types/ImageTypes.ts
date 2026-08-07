import type { ImageSourcePropType } from 'react-native';
import type { ImageDebugInfo } from './DebugTypes';

export interface UseSpiralImageResult {
  source: ImageSourcePropType;

  loading: boolean;

  error: Error | null;

  reload: () => Promise<void>;

  debug: ImageDebugInfo;
}
