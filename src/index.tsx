import { NitroModules } from 'react-native-nitro-modules';

import type {
  SpiralImage as SpiralImageSpec,
  ResizeOptions,
  ImageResult,
  ImageFormat,
  ProcessOptions,
} from './SpiralImage.nitro';

const SpiralImage =
  NitroModules.createHybridObject<SpiralImageSpec>('SpiralImage');

export default SpiralImage;
export { SpiralImage };

/**
 * Components
 */
export * from './components';

/**
 * Hooks
 */
export * from './hooks';

/**
 * Cache
 */
export * from './cache';

/**
 * Pipeline
 */
export * from './pipeline';

/**
 * Utils
 */
export * from './utils';

/**
 * Types
 */
export * from './types';

/**
 * Nitro Types
 */
export type {
  SpiralImageSpec,
  ResizeOptions,
  ImageResult,
  ImageFormat,
  ProcessOptions,
};
