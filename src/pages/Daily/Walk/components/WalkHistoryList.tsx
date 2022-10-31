import WalkHistoryListItem from './WalkHistoryListItem';

export type WalkHistoryItemType = {
  walkId: number;
  distance: number;
  totalTime: number;
  startedAt: string;
  finishedAt: string;
};
type WalkHistoryListProps = {
  walkHistory: WalkHistoryItemType[];
};
export default function WalkHistoryList({ walkHistory }: WalkHistoryListProps) {
  return (
    <div className="flex flex-col space-y-3 w-full overflow-y-auto items-center">
      {walkHistory.map((walkInfo) => (
        <WalkHistoryListItem key={walkInfo.walkId} walkInfo={walkInfo} />
      ))}
    </div>
  );
}
