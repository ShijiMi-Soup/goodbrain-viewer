import * as d3 from "d3";
import {
  GBFocusData,
  NumArray,
  BandPowerDataKey,
  MentalStateDataKey,
  arange,
  constants,
  MentalStateData,
  DataCategory,
  BandPowerData,
  RawData,
} from "../../global";

export const readCsvData = (file: File): Promise<string> => {
  // TODO: Set a size limit for the file?
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;
      resolve(data);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsText(file);
  });
};

const _parseElapsedTime = (timeString: string): number => {
  const [hours, minutes, secondsWithMs] = timeString.split(":");
  const [seconds, milliseconds] = secondsWithMs.split(".");

  const totalSeconds =
    parseInt(hours, 10) * 3600 + // Convert hours to seconds
    parseInt(minutes, 10) * 60 + // Convert minutes to seconds
    parseInt(seconds, 10) + // Convert seconds to seconds
    parseInt(milliseconds, 10) / 1000; // Convert milliseconds to seconds

  return totalSeconds;
};

const _parseChunk = (chunkString: string, slicer: string = ";") => {
  return chunkString.split(slicer).map((v) => +v);
};

const _toNumArray = (
  data: d3.DSVRowArray<string>,
  varname: BandPowerDataKey | MentalStateDataKey
) => {
  const numArray: NumArray = data
    .filter((d) => d[varname] !== "")
    .map((d) => +d[varname]);
  return numArray;
};

const _eegToNumArray = (data: d3.DSVRowArray<string>) => {
  const splited = data
    .filter((d) => d["eeg"] !== "")
    .map((d) => _parseChunk(d["eeg"]));

  const numArray: NumArray = [];

  splited.forEach((item) => {
    numArray.push(...item);
  });

  return numArray;
};

const _getMaxTime = (data: d3.DSVRowArray<string>) => {
  const lastRow = data[data.length - 1];
  const maxTime = _parseElapsedTime(lastRow["Elapsed Time"]);
  return Math.floor(maxTime);
};

const _getTimeArray = (category: DataCategory, maxTime: number) => {
  const fs = constants.data.SAMPLE_FREQS[category];
  return arange(0, maxTime, 1 / fs);
};

export const readGBFocusCsvData = async (file: File) => {
  const data = await readCsvData(file);

  const parsedData = d3.csvParse(data);

  const maxTime = _getMaxTime(parsedData);

  const mentalStateData = constants.data.MENTAL_STATE_DATA_KEYS.reduce(
    (acc, key) => {
      acc["data"][key] = _toNumArray(parsedData, key);
      return acc;
    },
    {
      data: {},
      category: "mentalState",
      fs: constants.data.SAMPLE_FREQS.mentalState,
      time: _getTimeArray("mentalState", maxTime),
    } as MentalStateData
  );

  const bandPowerData = constants.data.BAND_POWER_DATA_KEYS.reduce(
    (acc, key) => {
      acc["data"][key] = _toNumArray(parsedData, key);
      return acc;
    },
    {
      data: {},
      category: "bandPower",
      fs: constants.data.SAMPLE_FREQS.bandPower,
      time: _getTimeArray("bandPower", maxTime),
    } as BandPowerData
  );

  const rawData: RawData = {
    category: "raw",
    fs: constants.data.SAMPLE_FREQS.raw,
    time: _getTimeArray("raw", maxTime),
    data: { eeg: _eegToNumArray(parsedData) },
  };

  const gbFocusData: GBFocusData = {
    mentalState: mentalStateData,
    bandPower: bandPowerData,
    raw: rawData,
  };

  return gbFocusData;
};
