import type { ImageSourcePropType } from 'react-native';

// import type { ResizeOptions } from '../SpiralImage.nitro';

export class NativePipeline {
  /**
   * Process image using native Nitro module.
   *
   * Phase 2:
   * - passthrough (nếu chưa implement native)
   *
   * Phase 3:
   * - decode
   * - resize
   * - encode
   */
  static async process(
    source: ImageSourcePropType
    // options?: ResizeOptions
  ): Promise<ImageSourcePropType> {
    if (
      !source ||
      typeof source !== 'object' ||
      Array.isArray(source) ||
      !('uri' in source)
    ) {
      return source;
    }

    if (!source.uri) {
      return source;
    }

    try {
      /**
       * TODO:
       * Enable when native resize is implemented.
       */
      // const result = await SpiralImage.resize({
      //   path: source.uri,
      //   ...options,
      // });

      // return {
      //   uri: result.path,
      // };

      return source;
    } catch (e) {
      console.warn('[SpiralImage]', e);

      return source;
    }
  }
}
