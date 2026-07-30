import {
  Image as RNImage,
  type ImageProps,
  type ImageSourcePropType,
} from 'react-native';

import { useSpiralImage } from '../hooks/useSpiralImage';

export interface SpiralImageProps extends Omit<ImageProps, 'source'> {
  source: ImageSourcePropType;
}

export function Image({ source, ...rest }: SpiralImageProps) {
  const image = useSpiralImage(source);

  return <RNImage {...rest} source={image.source} />;
}

export default Image;
