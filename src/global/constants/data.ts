import {
  _DATA_CATEGORIES,
  BrainWaveData,
  DataCategory,
  DataLabels,
  DataSelection,
  GBFocusData,
} from "../types";

export const INIT_GBFOCUS_DATA: GBFocusData = {
  meditation: [],
  attention: [],
  alpha: [],
  beta: [],
  delta: [],
  theta: [],
  gamma: [],
  eeg: [],
  maxTime: 30,
};

export const INIT_DATA_SELECTION: DataSelection = {
  attention: true,
  meditation: true,
  alpha: true,
  beta: true,
  delta: true,
  theta: true,
  gamma: true,
  eeg: true,
};

export const DATA_CATEGORIES = _DATA_CATEGORIES;

export const INIT_DATA_CATEGORY: DataCategory = "mentalState";

export const DATA_CATEGORY_LABELS = {
  mentalState: "状態指数",
  bandPower: "周波数",
  raw: "生波形",
};

export const DATA_CATEGORY_ITEMS: {
  [key in DataCategory]: (keyof BrainWaveData)[];
} = {
  mentalState: ["attention", "meditation"],
  bandPower: ["alpha", "beta", "delta", "theta", "gamma"],
  raw: ["eeg"],
};

export const DATA_LABELS: DataLabels = {
  attention: {
    text: "集中度",
    color: "red",
  },
  meditation: {
    text: "リラックス度",
    color: "orange",
  },
  alpha: {
    text: "α波",
    color: "teal",
  },
  beta: {
    text: "β波",
    color: "blue",
  },
  delta: {
    text: "δ波",
    color: "yellow",
  },
  theta: {
    text: "θ波",
    color: "green",
  },
  gamma: {
    text: "γ波",
    color: "purple",
  },
  eeg: {
    text: "生波形",
    color: "gray",
  },
};
