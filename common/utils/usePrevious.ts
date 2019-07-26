import { useEffect, useRef } from "react";

export function usePrevious(value) {
  // Track previous props/state value
  // Ref: https://usehooks.com/usePrevious/
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
