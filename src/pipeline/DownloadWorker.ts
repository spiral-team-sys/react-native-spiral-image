import type { RequestTask, WorkerResult } from './types';

export class DownloadWorker {
  async execute(task: RequestTask): Promise<WorkerResult> {
    return {
      source: task.source,
    };
  }
}
