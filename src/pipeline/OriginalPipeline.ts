import type { ImageSourcePropType } from 'react-native';

export class OriginalPipeline {
  static isLocal(source: ImageSourcePropType): boolean {
    if (
      !source ||
      typeof source !== 'object' ||
      Array.isArray(source) ||
      !('uri' in source)
    ) {
      return false;
    }

    const uri = source.uri;

    if (!uri) {
      return false;
    }

    return (
      uri.startsWith('file://') ||
      uri.startsWith('content://') ||
      uri.startsWith('ph://')
    );
  }

  static getPath(source: ImageSourcePropType): string | undefined {
    if (
      !source ||
      typeof source !== 'object' ||
      Array.isArray(source) ||
      !('uri' in source)
    ) {
      return undefined;
    }

    return source.uri;
  }
}
