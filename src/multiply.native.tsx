import { NitroModules } from 'react-native-nitro-modules';
import type { SpiralImage } from './SpiralImage.nitro';

const SpiralImageHybridObject =
  NitroModules.createHybridObject<SpiralImage>('SpiralImage');

export function multiply(a: number, b: number): number {
  return SpiralImageHybridObject.multiply(a, b);
}
