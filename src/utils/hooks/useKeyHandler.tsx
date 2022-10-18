import { useEffect } from 'react';

export default function useKeyHandler(key: string, callback: () => void) {
  const handler = (e: KeyboardEvent) => {
    if (e.key === key) callback();
  };
  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);
}
