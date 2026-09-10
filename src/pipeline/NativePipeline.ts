import type { ImageSourcePropType } from 'react-native';
import SpiralImage, {
  type SpiralProcessOptions,
} from 'react-native-spiral-image';

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
    source: ImageSourcePropType,
    options?: SpiralProcessOptions
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
      const normalizedSourcePath = source.uri.replace('file://', '');

      const fallbackOutputPath = source.uri.startsWith('content://')
        ? `${source.uri.replace(/[^a-zA-Z0-9]/g, '_')}.spiral.jpg`
        : `${normalizedSourcePath}.spiral.jpg`;

      const outputPath = options?.output?.path ?? fallbackOutputPath;

      /**
       * TODO:
       * Enable when native resize is implemented.
       */
      const result = await SpiralImage.process({
        path: source.uri,
        resize: options?.resize,
        output: {
          ...options?.output,
          path: outputPath,
        },
      });

      return {
        uri: result.path,
      };

      // return source;
    } catch (e) {
      console.warn('[SpiralImage]', e);

      return source;
    }
  }
}
