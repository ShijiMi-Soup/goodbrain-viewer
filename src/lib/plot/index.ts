import * as d3 from "d3";
import { constants, TimePoint, TimePoints } from "../../global";
import { useEffect, useRef, useState } from "react";

export const selectSvg = (svg_elm: SVGSVGElement | null) => {
  return d3.select(svg_elm);
};

export const removeExistingElements = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>
) => {
  svg.selectAll("g").remove();
  svg.selectAll("path").remove();
};

const MARGIN = { top: 20, right: 20, bottom: 30, left: 50 };

const isInTimeWindow = (
  d: TimePoint,
  timeWindow: { start: number; width: number }
) => {
  return (
    d.time >= timeWindow.start && d.time <= timeWindow.start + timeWindow.width
  );
};

export const useLinePlot = (
  timePoints: TimePoints = [],
  timeWindow: { start: number; width: number } = {
    start: constants.controls.INIT_TIME_START,
    width: constants.controls.INIT_TIME_WIDTH,
  },
  width: number = 800,
  height: number = 600
) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [_timePoints, _setTimePoints] = useState<TimePoints>(timePoints);

  useEffect(() => {
    const newTimePoints = timePoints.filter((d) => {
      return isInTimeWindow(d, timeWindow);
    });
    _setTimePoints(newTimePoints);
  }, [timePoints, timeWindow]);

  useEffect(() => {
    const _width = width - MARGIN.left - MARGIN.right;
    const _height = height - MARGIN.top - MARGIN.bottom;

    const x = d3
      .scaleLinear()
      .range([0, _width])
      .domain([
        d3.min(_timePoints, (d) => d.time) || 0,
        d3.max(_timePoints, (d) => d.time) || 1,
      ]);
    const y = d3
      .scaleLinear()
      .range([_height, 0])
      .domain([
        d3.min(_timePoints, (d) => d.value) || 0,
        d3.max(_timePoints, (d) => d.value) || 1,
      ]);

    // Get the SVG element
    const svg = selectSvg(svgRef.current);

    // Remove any existing elements
    removeExistingElements(svg);

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
    svg
      .append("path")
      .datum(_timePoints)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, [_timePoints, width, height]);

  return { svgRef };
};
