export type TimeWindow = {
  start: number;
  width: number;
};

export type NumArray = number[];

// export type TimePoint = {
//   time: number;
//   value: number;
// };
// export type TimePoints = TimePoint[];

export const _MENTAL_STATE_CATEGORY = "mentalState" as const;
export const _BAND_POWER_CATEGORY = "bandPower" as const;
export const _RAW_CATEGORY = "raw" as const;

export const _DATA_CATEGORIES = [
  _MENTAL_STATE_CATEGORY,
  _BAND_POWER_CATEGORY,
  _RAW_CATEGORY,
] as const;

export type DataCategory = (typeof _DATA_CATEGORIES)[number];

export const _BAND_POWER_DATA_KEYS = [
  "alpha",
  "beta",
  "delta",
  "theta",
  "gamma",
] as const;
export const _MENTAL_STATE_DATA_KEYS = ["attention", "meditation"] as const;
export const _RAW_DATA_KEYS = ["eeg"] as const;
export const _BRAIN_WAVE_DATA_KEYS = [
  ..._MENTAL_STATE_DATA_KEYS,
  ..._BAND_POWER_DATA_KEYS,
  ..._RAW_DATA_KEYS,
] as const;

export type BandPowerDataKey = (typeof _BAND_POWER_DATA_KEYS)[number];
export type MentalStateDataKey = (typeof _MENTAL_STATE_DATA_KEYS)[number];
export type RawDataKey = (typeof _RAW_DATA_KEYS)[number];
export type BrainWaveDataKey = (typeof _BRAIN_WAVE_DATA_KEYS)[number];

export type BandPowerArrays = {
  [key in BandPowerDataKey]: NumArray;
};
export type MentalStateArrays = {
  [key in MentalStateDataKey]: NumArray;
};
export type RawArrays = {
  [key in RawDataKey]: NumArray;
};

export type GBFocusDatum<D, C> = {
  data: D;
  category: C;
  time: NumArray;
  fs: number;
};

export type BandPowerData = GBFocusDatum<
  BandPowerArrays,
  typeof _BAND_POWER_CATEGORY
>;
export type MentalStateData = GBFocusDatum<
  MentalStateArrays,
  typeof _MENTAL_STATE_CATEGORY
>;
export type RawData = GBFocusDatum<RawArrays, typeof _RAW_CATEGORY>;

export type GBFocusData = {
  [_MENTAL_STATE_CATEGORY]: MentalStateData;
  [_BAND_POWER_CATEGORY]: BandPowerData;
  [_RAW_CATEGORY]: RawData;
};
export type GBFocusDataKey = keyof GBFocusData;

export type DataConfig = {
  label: string;
  color: string;
  show: boolean;
};

export type BrainWaveDataConfigs<T> = {
  [category in DataCategory]: {
    [key in keyof GBFocusData[category]["data"]]: T;
  };
};

export type DataConfigs = BrainWaveDataConfigs<DataConfig>;
