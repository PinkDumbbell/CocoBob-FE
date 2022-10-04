import React from 'react';
import { Link } from 'react-router-dom';
import { WalkHistoryItemType } from './WalkHistoryList';

type WalkHistoryListItemProps = {
  walkInfo: WalkHistoryItemType;
};
function WalkHistoryListItem({ walkInfo }: WalkHistoryListItemProps) {
  const { walkId, distance, totalTime, startedAt, finishedAt } = walkInfo;

  return (
    <Link
      to={`/daily/walk/record/${walkId}`}
      className="rounded-[10px] overflow-hidden w-full flex"
    >
      <div className="flex flex-col flex-1 bg-[#D9D9D9] text-white p-4 space-y-1">
        <div className="flex space-x-2">
          <div className="flex items-end">
            <span className="text-lg font-semibold">{distance}</span>
            <span className="ml-1 text-primary-bright">km</span>
          </div>
          <div className="flex items-end">
            <span className="text-lg font-semibold">{totalTime}</span>
            <span className="ml-1 text-primary-bright">분</span>
          </div>
        </div>
        {startedAt && finishedAt && (
          <div className="flex font-medium text-primary-dark">
            <span>{startedAt.substring(0, startedAt.length - 3)}</span>
            <span className="px-1">~</span>
            <span>{finishedAt.substring(0, finishedAt.length - 3)}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default React.memo(WalkHistoryListItem);