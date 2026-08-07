import type { ImageSourcePropType } from 'react-native';

export function getCacheKey(source: ImageSourcePropType): string {
  if (typeof source === 'number') {
    return source.toString();
  }

  let uri = '';

  if (Array.isArray(source)) {
    uri = source[0]?.uri ?? '';
  } else if (source && typeof source === 'object' && 'uri' in source) {
    uri = source.uri ?? '';
  } else {
    return JSON.stringify(source);
  }

  return normalizeUri(uri);
}

function normalizeUri(uri: string): string {
  if (!uri) {
    return '';
  }

  const hashIndex = uri.indexOf('#');
  if (hashIndex >= 0) {
    uri = uri.substring(0, hashIndex);
  }

  const queryIndex = uri.indexOf('?');
  if (queryIndex >= 0) {
    uri = uri.substring(0, queryIndex);
  }

  return uri;
}
