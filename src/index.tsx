import { NitroModules } from 'react-native-nitro-modules';

import type {
  SpiralImage as SpiralImageSpec,
  ResizeOptions,
  ImageResult,
  ImageFormat,
} from './SpiralImage.nitro';

const SpiralImage =
  NitroModules.createHybridObject<SpiralImageSpec>('SpiralImage');

export default SpiralImage;
export { SpiralImage };

export * from './components';
export * from './hooks';
export * from './types/ImageTypes';

export { formatFileSize } from './utils/formatFileSize';

export type { SpiralImageSpec, ResizeOptions, ImageResult, ImageFormat };
