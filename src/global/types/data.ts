export type BrainwaveDataRow = {
  timeStamp: Date;
  elapsedTime: number;
  alpha: number;
  beta: number;
  delta: number;
  theta: number;
  gamma: number;
  eeg: number[];
  attention: number;
  meditation: number;
};
