import { useEffect, useState } from 'react';

export type PlatformType = 'ios' | 'android' | 'windows' | 'mac' | 'os';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    flutter_inappwebview: {
      // eslint-disable-next-line no-unused-vars
      callHandler: (handlerName: string, args?: any[]) => any;
    };
  }
}

export default function usePlatform() {
  const [currentPlatform, setCurrentPlatform] = useState<PlatformType>('os');

  const getPlatform = async () => {
    if (window?.flutter_inappwebview) {
      const { platform }: { platform: PlatformType } =
        await window.flutter_inappwebview.callHandler('platformHandler');
      setCurrentPlatform(platform);
    }
  };
  useEffect(() => {
    getPlatform();
  }, []);

  return currentPlatform;
}
