import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/config';
import { setPlatform } from '@/store/slices/platformSlice';

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
  const dispatch = useAppDispatch();
  const [isInAppWebViewHandlerReady, setIsInAppWebViewReady] = useState(false);

  const getPlatformInfo = async () => {
    const { platform }: { platform: PlatformType } = await window.flutter_inappwebview.callHandler(
      'platformHandler',
    );
    return platform;
  };
  const setPlatformHandler = (platform: PlatformType) => {
    dispatch(setPlatform(platform));
  };
  const inAppWebViewReadyHandler = () => {
    setIsInAppWebViewReady(true);
  };

  useEffect(() => {
    window.addEventListener('flutterInAppWebViewPlatformReady', inAppWebViewReadyHandler);
    return () => {
      window.removeEventListener('flutterInAppWebViewPlatformReady', inAppWebViewReadyHandler);
    };
  }, []);

  useEffect(() => {
    if (!isInAppWebViewHandlerReady) return;
    (async function () {
      const platform = await getPlatformInfo();
      setPlatformHandler(platform);
    })();
  }, [isInAppWebViewHandlerReady]);
}
