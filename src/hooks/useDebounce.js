import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debouncedValue;
};

// Trailing
export const useDebouncedCallback = (callback, wait = 100) => {
  const argsRef = useRef();
  const timeout = useRef();

  function flush() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  useEffect(() => flush, []);

  return function debouncedCallback(...args) {
    argsRef.current = args;
    flush();
    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current);
      }
    }, wait);
  };
};
