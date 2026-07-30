import type { ImageSourcePropType } from 'react-native';

export class PendingRequests {
  private static requests = new Map<string, Promise<ImageSourcePropType>>();

  static get(uri: string) {
    return this.requests.get(uri);
  }

  static has(uri: string) {
    return this.requests.has(uri);
  }

  static set(uri: string, promise: Promise<ImageSourcePropType>) {
    this.requests.set(uri, promise);
  }

  static remove(uri: string) {
    this.requests.delete(uri);
  }
}
