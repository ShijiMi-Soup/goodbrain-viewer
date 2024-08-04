import * as d3 from "d3";
import {
  BrainWaveData,
  constants,
  isInTimeWindow,
  TimePoint,
  TimePoints,
} from "../../global";
import { useEffect, useRef } from "react";
import {
  useGBFocusDataContext,
  useTimeStartContext,
  useTimeWidthContext,
} from "../../global/contexts";
import { MARGIN } from "../../global/constants/plot";
import { DATA_LABELS } from "../../global/constants/data";

// TODO: category と selection を渡して、こちら側でデータを絞り込む

type PlotDatum = {
  timePoints: TimePoints;
  minValue: number;
  maxValue: number;
  color: string;
};

export const useLinePlot = (
  selectedDataKeys: (keyof BrainWaveData)[],
  timeWindow: { start: number; width: number } = {
    start: constants.controls.INIT_TIME_START,
    width: constants.controls.INIT_TIME_WIDTH,
  },
  width: number = 800,
  height: number = 600
) => {
  const [timeStart] = useTimeStartContext();
  const [timeWidth] = useTimeWidthContext();
  const [gbFocusData] = useGBFocusDataContext();

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const _width = width - MARGIN.left - MARGIN.right;
    const _height = height - MARGIN.top - MARGIN.bottom;

    // Get the SVG element
    const svg = d3.select(svgRef.current);

    // Clear
    svg.selectAll("*").remove();

    const x = d3
      .scaleLinear()
      .range([0, _width])
      .domain([timeStart, timeStart + timeWidth]);

    const plotData: PlotDatum[] = selectedDataKeys.map((dataKey) => {
      const timePoints = gbFocusData[dataKey].filter((d) =>
        isInTimeWindow(d.time, timeWindow)
      );
      const color = DATA_LABELS[dataKey].color;
      const minValue = d3.min(timePoints, (d) => d.value) || 0;
      const maxValue = d3.max(timePoints, (d) => d.value) || 0;

      return { timePoints, minValue, maxValue, color };
    });

    const y = d3
      .scaleLinear()
      .range([_height, 0])
      .domain([
        d3.min(plotData, (d) => d.minValue) || 0,
        d3.max(plotData, (d) => d.maxValue) || 0,
      ]);

    // Add the X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${_height})`)
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g").call(d3.axisLeft(y));

    // Create a line generator
    const line = d3
      .line<TimePoint>()
      .x((d) => x(d.time))
      .y((d) => y(d.value));

    plotData.forEach((plotDatum) => {
      const { timePoints, color } = plotDatum;

      svg
        .append("path")
        .datum(timePoints)
        // TODO: Add gradient fill
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", constants.plot.STROKE_WIDTH)
        .attr("d", line);
    });
  }, [
    width,
    height,
    timeStart,
    timeWidth,
    selectedDataKeys,
    gbFocusData,
    timeWindow,
  ]);

  return { svgRef };
};
