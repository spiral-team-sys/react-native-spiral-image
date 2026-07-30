import type { ImageSourcePropType } from 'react-native';

export interface UseSpiralImageResult {
  source: ImageSourcePropType;
  loading: boolean;
  error: Error | null;
  reload: () => Promise<void>;
}
