import { useEffect, useRef } from 'react';

function usePrevious<T>(value: any): T {
  const previous = useRef<any>(null);

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return previous.current;
}

export default usePrevious;
