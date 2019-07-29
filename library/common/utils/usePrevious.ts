import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T {
  // Track previous props/state value
  // Ref: https://usehooks.com/usePrevious/
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
