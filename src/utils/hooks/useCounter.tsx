import { useState, useRef, useEffect } from 'react';

export default function useCounter() {
  const [status, setStatus] = useState<'reset' | 'running' | 'paused'>('reset');
  const [totalCount, setTotalCount] = useState(0);
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    setTotalCount(0);
    if (timerId.current === null) return;
    clearInterval(timerId.current);
    setStatus('reset');
  };
  const start = () => {
    timerId.current = setInterval(() => {
      setTotalCount((prev) => prev + 1);
    }, 1000);
    setStatus('running');
  };
  const pause = () => {
    if (timerId.current === null) return;
    clearInterval(timerId.current);
    setStatus('paused');
  };

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);

  return {
    status,
    totalCount,
    start,
    pause,
    reset,
  };
}
