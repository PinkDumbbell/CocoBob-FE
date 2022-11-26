import { useEffect, useRef } from 'react';

export default function usePrevious<T>(state: T) {
  const prevValue = useRef<T | null>();

  useEffect(() => {
    prevValue.current = state;
  }, [state]);

  return prevValue.current;
}
