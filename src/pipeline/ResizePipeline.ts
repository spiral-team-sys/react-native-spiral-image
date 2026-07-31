import type { ImageSourcePropType } from 'react-native';

export class ResizePipeline {
  static async resize(
    source: ImageSourcePropType
  ): Promise<ImageSourcePropType> {
    return source;
  }
}
