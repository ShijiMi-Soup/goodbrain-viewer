import * as d3 from "d3";
import { BrainwaveDataRow } from "../../global";

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

const _parseEeg = (eegString: string) => {
  return eegString.split(";").map((v) => +v);
};

const _parseGBFocusCsvData = (data: string) => {
  const parsedData = d3.csvParse(data);
  const brainWaveData: BrainwaveDataRow[] = parsedData.map((d) => {
    return {
      timeStamp: new Date(d.TimeStamps),
      elapsedTime: _parseElapsedTime(d["Elapsed Time"]),
      alpha: +d.alpha,
      beta: +d.beta,
      delta: +d.delta,
      theta: +d.theta,
      gamma: +d.gamma,
      eeg: _parseEeg(d.eeg),
      attention: +d.attention,
      meditation: +d.meditation,
    };
  });

  return brainWaveData;
};

export const readGBFocusCsvData = async (
  file: File
): Promise<BrainwaveDataRow[]> => {
  const data = await readCsvData(file);
  return _parseGBFocusCsvData(data);
};
