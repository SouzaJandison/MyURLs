import Bull, { ProcessPromiseFunction, Queue, QueueOptions } from 'bull';

import { IBullProvider } from '../models/IBullProvider';

const queueConfig = {
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  },
  limiter: {
    max: 150,
    duration: 1000,
  },
} as QueueOptions;

export class BullProvider implements IBullProvider {
  private queue: Queue;

  constructor() {
    this.queue = new Bull('RegistrationMail', queueConfig);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async add(data: object | object[]): Promise<void> {
    if (Array.isArray(data)) {
      const parsedJobs = data.map(jobData => ({
        data: jobData,
      }));

      await this.queue.addBulk(parsedJobs);

      return;
    }

    await this.queue.add(data);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  process(processFunction: ProcessPromiseFunction<object>): void {
    this.queue.process(150, processFunction);
  }
}
