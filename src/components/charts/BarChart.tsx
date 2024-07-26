import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../global";

const VIEWBOX = { x: 0, y: 0, width: 500, height: 500 };

const margin = { top: 30, right: 30, bottom: 70, left: 60 };

export type BarChartProps = {};
export const BarChart = ({}: BarChartProps) => {
  const windowSize = useWindowSize();
  const ref = useRef(null);
  const [data, setData] = useState<d3.DSVRowArray<string>>();

  useEffect(() => {
    // append the svg object to the body of the page
    d3.select(ref.current)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv"
    ).then((d) => {
      setData(d);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const width = VIEWBOX.width - margin.left - margin.right;
    const height = VIEWBOX.height - margin.top - margin.bottom;
    const svg = d3.select(ref.current);

    // Update width and height
    // svg
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom);

    // Parse the Data

    if (data) {
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.Country))
        .padding(0.2);

      svg.selectAll("*").remove();
      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(y));

      // Bars
      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.Country) || "")
        .attr("y", (d) => y(d.Value) || "")
        .attr("width", x.bandwidth())
        .attr("height", ((d) => height - y(d.Value)) || "")
        .attr("fill", "#5f0f40");
    }
  }, [data]);

  return (
    <>
      <svg
        preserveAspectRatio="xMinYMin meet"
        viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${windowSize.width} ${windowSize.height}`}
        style={{
          width: "100%",
          height: "100%",
        }}
        ref={ref}
      />
    </>
  );
};
