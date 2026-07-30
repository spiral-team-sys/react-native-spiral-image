import type { ImageSourcePropType } from 'react-native';

export interface RequestTask {
  id: string;
  uri: string;
  source: ImageSourcePropType;
}

export interface WorkerResult {
  source: ImageSourcePropType;
}
