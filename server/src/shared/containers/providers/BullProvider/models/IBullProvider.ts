interface IJob {
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: object;
}

export interface IBullProvider {
  // eslint-disable-next-line @typescript-eslint/ban-types
  add(data: object): Promise<void>;
  process(processFunction: (job: IJob) => Promise<void>): void;
}
