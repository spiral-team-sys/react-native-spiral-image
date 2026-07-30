import { DownloadWorker } from './DownloadWorker';
import { PendingRequests } from './PendingRequests';

import type { ImageSourcePropType } from 'react-native';

export class RequestQueue {
  private static worker = new DownloadWorker();

  static async load(source: ImageSourcePropType): Promise<ImageSourcePropType> {
    if (
      typeof source !== 'object' ||
      !source ||
      !('uri' in source) ||
      !source.uri
    ) {
      return source;
    }

    const uri = source.uri;

    const pending = PendingRequests.get(uri);

    if (pending) {
      return pending;
    }

    const promise = this.worker
      .execute({
        id: uri,
        uri,
        source,
      })
      .then((result) => result.source)
      .finally(() => {
        PendingRequests.remove(uri);
      });

    PendingRequests.set(uri, promise);

    return promise;
  }
}
