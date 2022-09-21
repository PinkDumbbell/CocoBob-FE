import Button from '@/components/Button';
import Header from '@/components/layout/Header';
import WalkRecordDetail, { WalkRecordType } from './WalkRecordDetail';

const mockSaveWalkData: WalkRecordType = {
  id: 1,
  startTime: '15:48',
  endTime: '16:12',
  walkTime: 24,
  walkDistance: 1.1,
  calcories: 108,
  date: new Date(),
};
type SaveWalkModalProps = {
  close: () => void;
  save: () => void;
};
export default function SaveWalkModal({ close, save }: SaveWalkModalProps) {
  return (
    <div className="fixed top-0 w-full max-w-[425px] h-full bg-white z-[9999] pt-[50px] pb-[80px]">
      <Header canGoBack onClickGoBack={close} title="산책저장" />
      <div className=" bg-white w-full h-full max-w-[425px] p-4">
        <WalkRecordDetail walkRecord={mockSaveWalkData} />
      </div>
      <div className="w-full flex p-4 items-center justify-around">
        <Button width="full" label="저장하기" onClick={save} />
      </div>
    </div>
  );
}
