// arange function like python
export const arange = (start: number, stop: number, step: number): number[] => {
  const arr = [];
  for (let i = start; i < stop; i += step) {
    arr.push(i);
  }
  return arr;
};

// linspace function like python
export const linspace = (
  start: number,
  stop: number,
  num: number
): number[] => {
  const step = (stop - start) / (num - 1);
  return arange(start, stop + step, step);
};
