import { WalkHistoryItemType } from './WalkHistoryList';

export type WalkRecordType = Exclude<
  WalkHistoryItemType & {
    calcories: number;
  },
  'id'
>;

type WalkRecordDetailProps = {
  walkRecord: WalkRecordType;
};
export default function WalkRecordDetail({ walkRecord }: WalkRecordDetailProps) {
  const { distance, totalTime, startedAt, finishedAt, calcories } = walkRecord;
  return (
    <div className="rounded-[10px] bg-[#D9D9D9] w-full p-4 space-y-1">
      <h4 className="font-bold">산책일지</h4>
      <div className="flex text-primary-dark font-medium">
        <span>{startedAt}</span>
        <span className="px-1">~</span>
        <span>{finishedAt}</span>
      </div>
      <div className="flex space-x-3">
        <div className="flex items-end font-semibold">
          <span className="text-3xl text-white ">{distance}</span>
          <span className="ml-1 text-[#AAC7E9] text-md">km</span>
        </div>
        <div className="flex items-end font-semibold">
          <span className="text-3xl text-white ">{totalTime}</span>
          <span className="ml-1 text-[#AAC7E9] text-md">분</span>
        </div>
      </div>
      <div>
        <p>
          <span className="font-semibold text-primary-dark text-lg">{calcories}</span>
          <span className="text-sm ml-1">Cal</span>
        </p>
      </div>
    </div>
  );
}
