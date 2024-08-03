import * as d3 from "d3";
import {
  MentalStateData,
  BandPowerData,
  TimePoints,
  GBFocusData,
} from "../../global";

export const readCsvData = (file: File): Promise<string> => {
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

const _toTimePoints = (
  data: d3.DSVRowArray<string>,
  varname: keyof (BandPowerData & MentalStateData)
) => {
  const timePoints: TimePoints = data
    .filter((d) => d[varname] !== "")
    .map((d) => ({
      time: _parseElapsedTime(d["Elapsed Time"]),
      value: +d[varname],
    }));
  return timePoints;
};

const _eegToTimePoints = (data: d3.DSVRowArray<string>) => {
  const splited = data
    .filter((d) => d["eeg"] !== "")
    .map((d) => ({
      time: _parseElapsedTime(d["Elapsed Time"]),
      value: _parseChunk(d["eeg"]),
    }));

  const timePoints: TimePoints = [];

  splited.forEach((item) => {
    const timeIncrement = 1 / item.value.length;

    item.value.forEach((eegValue, index) => {
      timePoints.push({
        time: item.time + index * timeIncrement,
        value: eegValue,
      });
    });
  });

  return timePoints;
};

export const readGBFocusCsvData = async (file: File) => {
  const data = await readCsvData(file);

  const parsedData = d3.csvParse(data);

  const gbFocusData: GBFocusData = {
    meditation: _toTimePoints(parsedData, "meditation"),
    attention: _toTimePoints(parsedData, "attention"),
    alpha: _toTimePoints(parsedData, "alpha"),
    beta: _toTimePoints(parsedData, "beta"),
    delta: _toTimePoints(parsedData, "delta"),
    theta: _toTimePoints(parsedData, "theta"),
    gamma: _toTimePoints(parsedData, "gamma"),
    eeg: _eegToTimePoints(parsedData),
  };

  return gbFocusData;
};
