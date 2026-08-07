import {
  Image as RNImage,
  type ImageProps,
  type ImageSourcePropType,
} from 'react-native';

import { useSpiralImage } from '../hooks/useSpiralImage';
import type { SpiralProcessOptions } from '../types';

export interface SpiralImageProps
  extends Omit<ImageProps, 'source'>, SpiralProcessOptions {
  source: ImageSourcePropType;
}

export function Image({ source, ...rest }: SpiralImageProps) {
  const image = useSpiralImage(source);

  return <RNImage {...rest} source={image.source} />;
}

export default Image;
