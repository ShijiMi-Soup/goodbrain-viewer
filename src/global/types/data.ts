export type TimePoint = {
  time: number;
  value: number;
};
export type TimePoints = TimePoint[];

export type BandPowerData = {
  alpha: TimePoints;
  beta: TimePoints;
  delta: TimePoints;
  theta: TimePoints;
  gamma: TimePoints;
};

export type MentalStateData = {
  attention: TimePoints;
  meditation: TimePoints;
};

export type RawData = {
  eeg: TimePoints;
};

export type BrainWaveData = BandPowerData & RawData & MentalStateData;

export type GBFocusData = BrainWaveData & {
  maxTime: number;
};

export type DataSelection = {
  [key in keyof BrainWaveData]: boolean;
};

export const _DATA_CATEGORIES = ["mentalState", "bandPower", "raw"] as const;

export type DataCategory = (typeof _DATA_CATEGORIES)[number];

export type DataLabel = {
  text: string;
  color: string;
};

export type DataLabels = {
  [key in keyof BrainWaveData]: DataLabel;
};
