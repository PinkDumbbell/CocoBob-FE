import { useState, useRef, useEffect } from 'react';

export default function useCounter() {
  const [recordStartTime, setStartTime] = useState<Date | null>(null);
  const [status, setStatus] = useState<'reset' | 'running' | 'paused'>('reset');
  const [totalCount, setTotalCount] = useState(0);
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    setTotalCount(0);
    if (timerId.current === null) return;
    clearInterval(timerId.current);
    setStatus('reset');
    setStartTime(null);
  };
  const start = () => {
    timerId.current = setInterval(() => {
      setTotalCount((prev) => prev + 1);
    }, 1000);
    setStartTime(new Date());
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
    recordStartTime,
  };
}
