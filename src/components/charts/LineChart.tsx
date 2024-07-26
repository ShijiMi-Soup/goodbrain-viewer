import * as d3 from "d3";
import { useEffect, useRef } from "react";

const margin = { top: 20, right: 20, bottom: 30, left: 50 };

export type LineChartProps = {
  data?: d3.DSVRowArray<string>;
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
    const _width = width - margin.left - margin.right;
    const _height = height - margin.top - margin.bottom;

    const x = d3.scaleLinear().range([0, _width]);
    const y = d3.scaleLinear().range([_height, 0]);

    if (data) {
      x.domain([0, d3.max(data, (d) => +d.time) || 1]);
      y.domain([0, d3.max(data, (d) => +d.rawwave) || 1]);

      const svg = d3.select(ref.current);
      svg.selectAll("g").remove();
      svg.selectAll("path").remove();
      svg
        .append("g")
        .attr("transform", `translate(0,${_height})`)
        .call(d3.axisBottom(x));
      svg.append("g").call(d3.axisLeft(y));

      const line = d3
        .line()
        .x((d) => x(d.time))
        .y((d) => y(d.rawwave));

      svg
        .append("path")
        .datum(data)
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
