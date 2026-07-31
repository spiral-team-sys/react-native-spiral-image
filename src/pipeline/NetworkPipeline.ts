import type { ImageSourcePropType } from 'react-native';

export class NetworkPipeline {
  static async download(
    source: ImageSourcePropType
  ): Promise<ImageSourcePropType> {
    return source;
  }
}
