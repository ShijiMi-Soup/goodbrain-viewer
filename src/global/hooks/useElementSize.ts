import { useLayoutEffect, useState, useRef } from "react";

export type Size = {
  width: number;
  height: number;
};

export const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export const useElementSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      }
    });

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return [size, elementRef] as const;
};
