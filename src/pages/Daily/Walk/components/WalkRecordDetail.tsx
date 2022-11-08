import { WalkRecordType } from '@/@type/walk';

type WalkRecordDetailProps = {
  walkRecord: WalkRecordType;
};

export default function WalkRecordDetail({ walkRecord }: WalkRecordDetailProps) {
  const { distance, totalTime, startedAt, finishedAt } = walkRecord;
  return (
    <div className="rounded bg-secondary-max border border-primary-max w-full p-4 space-y-1">
      <h4 className="font-bold">산책일지</h4>
      {startedAt && finishedAt && (
        <div className="flex text-primary-dark font-medium">
          <span>{startedAt}</span>
          <span className="px-1">~</span>
          <span>{finishedAt}</span>
        </div>
      )}
      <div className="flex space-x-3">
        <div className="flex items-baseline font-semibold">
          <span className="text-h2 text-black">{distance}</span>
          <span className="ml-1 text-primary-dark text-p">km</span>
        </div>
        <div className="flex items-baseline font-semibold">
          <span className="text-h2 text-black">{totalTime}</span>
          <span className="ml-1 text-primary-dark text-p">분</span>
        </div>
      </div>
    </div>
  );
}
