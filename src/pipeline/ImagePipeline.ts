import type { ImageSourcePropType } from 'react-native';

import { RequestQueue } from './RequestQueue';

export class ImagePipeline {
  static load(source: ImageSourcePropType) {
    return RequestQueue.load(source);
  }
}
