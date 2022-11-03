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
  return (
    <div className="fixed top-0 w-full max-w-[425px] h-full bg-white z-[9999] pt-[50px] pb-[80px]">
      <Header canGoBack onClickGoBack={close} title="산책저장" />
      <div className=" bg-white w-full h-full max-w-[425px] p-4">
        <WalkRecordDetail walkRecord={walkData} />
      </div>
      <div className="w-full flex p-4 items-center justify-around">
        <Button width="full" label="저장하기" onClick={save} />
      </div>
    </div>
  );
}
