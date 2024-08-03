import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { MentalStateData, TimePoint } from "../../global";
import * as plot from "../../lib/plot";

const margin = { top: 20, right: 20, bottom: 30, left: 50 };

export type LineChartProps = {
  data?: MentalStateData;
  width?: number;
  height?: number;
};
export const LineChart = ({
  data,
  width = 800,
  height = 600,
}: LineChartProps) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Define the dimensions and margins of the graph
    const _width = width - margin.left - margin.right;
    const _height = height - margin.top - margin.bottom;

    // Set the ranges
    const x = d3.scaleLinear().range([0, _width]);
    const y = d3.scaleLinear().range([_height, 0]);

    // If the data is available, update the scales and draw the line
    const plotData = data?.meditation;
    if (plotData) {
      // Scale the range of the data
      x.domain([0, d3.max(plotData, (d) => d.time) || 1]);
      y.domain([0, d3.max(plotData, (d) => d.value) || 1]);

      // Remove any existing elements
      const svg = plot.selectSvg(ref.current);
      plot.removeExistingElements(svg);

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
        .datum(plotData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    }
  }, [width, height, data]);

  return (
    <svg width="100%" height="100%">
      <g
        ref={ref}
        id="linechart-container"
        transform={`translate(${margin.left}, ${margin.top})`}
      ></g>
    </svg>
  );
};
