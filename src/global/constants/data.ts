import {
  _BAND_POWER_CATEGORY,
  _BAND_POWER_DATA_KEYS,
  _BRAIN_WAVE_DATA_KEYS,
  _DATA_CATEGORIES,
  _MENTAL_STATE_CATEGORY,
  _MENTAL_STATE_DATA_KEYS,
  _RAW_CATEGORY,
  _RAW_DATA_KEYS,
  DataCategory,
  DataConfigs,
  GBFocusData,
} from "../types";

export const MENTAL_STATE_DATA_KEYS = _MENTAL_STATE_DATA_KEYS;
export const BAND_POWER_DATA_KEYS = _BAND_POWER_DATA_KEYS;
export const RAW_DATA_KEYS = _RAW_DATA_KEYS;
export const BRAIN_WAVE_DATA_KEYS = _BRAIN_WAVE_DATA_KEYS;

export const DATA_CATEGORIES = _DATA_CATEGORIES;

export const SAMPLE_FREQS: { [key in DataCategory]: number } = {
  mentalState: 1,
  bandPower: 5,
  raw: 250,
};

export const INIT_GBFOCUS_DATA: GBFocusData = {
  mentalState: {
    category: "mentalState",
    time: [],
    fs: SAMPLE_FREQS.mentalState,
    data: {
      attention: [],
      meditation: [],
    },
  },
  bandPower: {
    category: "bandPower",
    time: [],
    fs: SAMPLE_FREQS.bandPower,
    data: {
      alpha: [],
      beta: [],
      delta: [],
      theta: [],
      gamma: [],
    },
  },
  raw: {
    category: "raw",
    time: [],
    fs: SAMPLE_FREQS.raw,
    data: {
      eeg: [],
    },
  },
};

export const INIT_DATA_CATEGORY: DataCategory = "mentalState";

export const DATA_CATEGORY_LABELS = {
  mentalState: "状態指数",
  bandPower: "周波数",
  raw: "生波形",
};

export const DATA_CATEGORY_ITEMS = {
  [_MENTAL_STATE_CATEGORY]: MENTAL_STATE_DATA_KEYS,
  [_BAND_POWER_CATEGORY]: _BAND_POWER_DATA_KEYS,
  [_RAW_CATEGORY]: _RAW_DATA_KEYS,
};

export const INIT_DATA_CONFIGS: DataConfigs = {
  mentalState: {
    attention: {
      label: "集中度",
      color: "red",
      show: true,
    },
    meditation: {
      label: "リラックス度",
      color: "orange",
      show: true,
    },
  },
  bandPower: {
    alpha: {
      label: "α波",
      color: "teal",
      show: true,
    },
    beta: {
      label: "β波",
      color: "blue",
      show: true,
    },
    delta: {
      label: "δ波",
      color: "yellow",
      show: true,
    },
    theta: {
      label: "θ波",
      color: "green",
      show: true,
    },
    gamma: {
      label: "γ波",
      color: "purple",
      show: true,
    },
  },
  raw: {
    eeg: {
      label: "生波形",
      color: "gray",
      show: true,
    },
  },
};
