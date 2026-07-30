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

export type {
  SpiralImageSpec as SpiralImage,
  ResizeOptions,
  ImageResult,
  ImageFormat,
};

export { formatFileSize } from './utils/formatFileSize';
