import * as d3 from "d3";

export const selectSvg = (svg_elm: SVGSVGElement | null) => {
  return d3.select(svg_elm);
};

export const removeExistingElements = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>
) => {
  svg.selectAll("g").remove();
  svg.selectAll("path").remove();
};
