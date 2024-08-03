import * as d3 from "d3";
import { constants, isInTimeWindow, TimePoint, TimePoints } from "../../global";
import { useEffect, useRef, useState } from "react";
import {
  useTimeStartContext,
  useTimeWidthContext,
} from "../../global/contexts";
import { MARGIN } from "../../global/constants/plot";

export const useLinePlot = (
  plotData: TimePoints[] = [],
  timeWindow: { start: number; width: number } = {
    start: constants.controls.INIT_TIME_START,
    width: constants.controls.INIT_TIME_WIDTH,
  },
  width: number = 800,
  height: number = 600
) => {
  const [timeStart] = useTimeStartContext();
  const [timeWidth] = useTimeWidthContext();

  const svgRef = useRef<SVGSVGElement>(null);
  const [_plotData, _setPlotData] = useState<TimePoints[]>(plotData);

  useEffect(() => {
    const newPlotData = plotData.map((timePoints) =>
      timePoints.filter((d) => isInTimeWindow(d.time, timeWindow))
    );
    _setPlotData(newPlotData);
  }, [plotData, timeWindow]);

  useEffect(() => {
    const _width = width - MARGIN.left - MARGIN.right;
    const _height = height - MARGIN.top - MARGIN.bottom;

    const x = d3
      .scaleLinear()
      .range([0, _width])
      .domain([timeStart, timeStart + timeWidth]);
    const y = d3
      .scaleLinear()
      .range([_height, 0])
      .domain([
        d3.min(_plotData, (timePoints) => d3.min(timePoints, (d) => d.value)) ||
          0,
        d3.max(_plotData, (timePoints) => d3.max(timePoints, (d) => d.value)) ||
          0,
      ]);

    // Get the SVG element
    const svg = d3.select(svgRef.current);

    // Clear
    svg.selectAll("*").remove();

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

    // Add the line
    _plotData.forEach((timePoints) => {
      svg
        .append("path")
        .datum(timePoints)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    });
  }, [_plotData, width, height]);

  return { svgRef };
};
