import type { RequestTask } from './types';

export function createRequestTask(uri: string): RequestTask {
  return {
    id: uri,
    uri,
    source: { uri },
  };
}
