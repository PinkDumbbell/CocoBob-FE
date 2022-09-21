import WalkHistoryListItem from './WalkHistoryListItem';

export type WalkHistoryItemType = {
  id: number;
  date: Date;
  walkDistance: number;
  walkTime: number;
  startTime: string;
  endTime: string;
};
type WalkHistoryListProps = {
  walkHistory: WalkHistoryItemType[];
};
export default function WalkHistoryList({ walkHistory }: WalkHistoryListProps) {
  return (
    <div className="flex flex-col space-y-3 w-full overflow-y-auto">
      {walkHistory.map((walkInfo) => (
        <WalkHistoryListItem key={walkInfo.id} walkInfo={walkInfo} />
      ))}
    </div>
  );
}
