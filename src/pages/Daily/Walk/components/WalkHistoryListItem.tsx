import React from 'react';
import { Link } from 'react-router-dom';
import { WalkHistoryItemType } from './WalkHistoryList';

type WalkHistoryListItemProps = {
  walkInfo: WalkHistoryItemType;
};
function WalkHistoryListItem({ walkInfo }: WalkHistoryListItemProps) {
  const { id, date, walkDistance, walkTime, startTime, endTime } = walkInfo;
  const month = date.getMonth();
  const dateOfMonth = date.getDate();

  return (
    <Link
      to={`/daily/walk/record/${id}`}
      className="rounded-[10px] overflow-hidden h-20 w-full flex"
    >
      <div className="h-full w-20 flex flex-col items-center justify-center bg-[#737373] text-white space-y-1">
        <span className="text-sm">{month}월</span>
        <span>{dateOfMonth}일</span>
      </div>
      <div className="flex flex-col flex-1 bg-[#D9D9D9] text-white p-4">
        <div className="flex space-x-2">
          <div className="flex items-end">
            <span className="text-lg font-semibold">{walkDistance}</span>
            <span className="ml-1 text-[#AAC7E9]">km</span>
          </div>
          <div className="flex items-end">
            <span className="text-lg font-semibold">{walkTime}</span>
            <span className="ml-1 text-[#AAC7E9]">분</span>
          </div>
        </div>
        <div className="flex font-medium text-primary-dark">
          <span>{startTime}</span>
          <span className="px-1">~</span>
          <span>{endTime}</span>
        </div>
      </div>
    </Link>
  );
}

export default React.memo(WalkHistoryListItem);
