/* global kakao */
import { useRef, useEffect } from 'react';
import { WalkRecordType } from '@/@type/walk';
import Button from '@/components/Button';
import Header from '@/components/layout/Header';

import WalkRecordDetail from './WalkRecordDetail';

type SaveWalkModalProps = {
  close: () => void;
  save: () => void;
  walkData: WalkRecordType;
};
export default function SaveWalkModal({ close, save, walkData }: SaveWalkModalProps) {
  const staticMap = useRef(null);

  useEffect(() => {
    if (!staticMap.current) {
      return;
    }
    // eslint-disable-next-line
    new kakao.maps.StaticMap(staticMap.current, {
      center: new kakao.maps.LatLng(33.45071, 126.570667),
      level: 3,
      marker: false,
    });
  }, [staticMap.current]);

  return (
    <div className="fixed top-0 w-full max-w-[425px] h-full bg-white z-[9999] pt-[50px] flex flex-col">
      <Header canGoBack onClickGoBack={close} title="산책저장" />
      <div className="p-4 flex-1">
        <div className="rounded-[10px] overflow-hidden w-full h-auto">
          <div
            ref={staticMap}
            onClickCapture={(e) => {
              e.stopPropagation();
            }}
            className="w-full h-full"
          ></div>
        </div>

        <WalkRecordDetail walkRecord={walkData} />
      </div>
      <div className="w-full p-4">
        <Button width="full" label="저장하기" onClick={save} />
      </div>
    </div>
  );
}
