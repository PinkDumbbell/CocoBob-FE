import { useEffect } from 'react';

export default function useVh() {
  const setVh = () => {
    setTimeout(() => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    }, 100);
  };
  useEffect(() => {
    window.addEventListener('resize', setVh);
    window.addEventListener('click', setVh, { capture: true });
    setVh();
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('click', setVh, { capture: true });
    };
  }, []);

  return {
    setVh,
  };
}
