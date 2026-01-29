import { DependencyList, EffectCallback, useEffect } from "react";

export const useDebounce = (
  callback: EffectCallback,
  deps: DependencyList = [],
  delay: number = 500,
) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
};
