import { useEffect } from 'react';

export default function useVh() {
  const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
  };
  useEffect(() => {
    window.addEventListener('resize', setVh);
    setVh();
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  return {
    setVh,
  };
}
