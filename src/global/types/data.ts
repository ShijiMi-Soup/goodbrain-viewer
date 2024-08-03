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

export type EEGData = {
  eeg: TimePoints;
};

export type GBFocusData = EEGData & MentalStateData & BandPowerData;
