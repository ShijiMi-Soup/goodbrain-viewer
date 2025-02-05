import { useLinePlot } from "../../lib/plot";

const margin = { top: 20, right: 20, bottom: 30, left: 50 };

export type LineChartProps = {
  timeWindow?: { start: number; width: number };
  width?: number;
  height?: number;
};
export const LineChart = ({
  timeWindow,
  width = 800,
  height = 600,
}: LineChartProps) => {
  const { svgRef } = useLinePlot(timeWindow, width, height);

  return (
    <svg width="100%" height="100%">
      <g
        ref={svgRef}
        id="linechart-container"
        transform={`translate(${margin.left}, ${margin.top})`}
      ></g>
    </svg>
  );
};
