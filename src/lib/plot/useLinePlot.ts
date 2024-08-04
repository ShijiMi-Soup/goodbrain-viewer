import * as d3 from "d3";
import { arange, constants, NumArray } from "../../global";
import { useEffect, useRef } from "react";
import {
  useDataCategoryContext,
  useDataConfigsContext,
  useGBFocusDataContext,
  useTimeStartContext,
  useTimeWidthContext,
} from "../../global/contexts";
import { MARGIN } from "../../global/constants/plot";

type PlotDatum = {
  values: NumArray;
  minValue: number;
  maxValue: number;
  color: string;
};

export const useLinePlot = (
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
  const [dataCategory] = useDataCategoryContext();
  const [dataConfigs] = useDataConfigsContext();

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const configs = dataConfigs[dataCategory];
    const selectedDataKeys = Object.entries(configs)
      .filter(([, value]) => value.show)
      .map(([key]) => key);

    const categoryData = gbFocusData[dataCategory];
    const sample_start = Math.floor(timeStart * categoryData.fs);
    const sample_end = Math.floor((timeStart + timeWidth) * categoryData.fs);
    const time = categoryData.time.slice(sample_start, sample_end);

    const plotData: PlotDatum[] = Object.entries(categoryData.data)
      .filter(([key]) => selectedDataKeys.includes(key))
      .map(([key, numArray]) => {
        const values = numArray.slice(sample_start, sample_end);

        // @ts-expect-error dataConfigs
        const color = dataConfigs[dataCategory][key].color;

        const minValue = d3.min(values) || 0;
        const maxValue = d3.max(values) || 0;

        return { values, minValue, maxValue, color };
      });

    const _width = width - MARGIN.left - MARGIN.right;
    const _height = height - MARGIN.top - MARGIN.bottom;

    // Get the SVG element
    const svg = d3.select(svgRef.current);

    // Clear
    svg.selectAll("*").remove();

    const x = d3
      .scaleLinear()
      .range([0, _width])
      .domain([timeStart, timeStart + timeWidth - 1 / categoryData.fs]);

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

    plotData.forEach((plotDatum) => {
      const { values, color } = plotDatum;

      // Create a line generator
      const line = d3
        .line<number>()
        .x((idx) => x(time[idx]))
        .y((idx) => y(values[idx]));

      const indices = arange(0, Math.min(time.length, values.length), 1);

      if (indices.length === 0) return;
      svg
        .append("path")
        .datum(indices)
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
    gbFocusData,
    timeWindow,
    dataCategory,
    dataConfigs,
  ]);

  return { svgRef };
};
