import WalkHistoryListItem from './WalkHistoryListItem';

export type WalkHistoryItemType = {
  walkId: number;
  distance: number;
  totalTime: number;
  startedAt: string;
  finishedAt: string;
};
type WalkHistoryListProps = {
  isLoading: boolean;
  walkHistory: WalkHistoryItemType[];
};
export default function WalkHistoryList({ isLoading, walkHistory }: WalkHistoryListProps) {
  return (
    <div className="flex flex-col space-y-3 w-full overflow-y-auto items-center">
      {isLoading && <h4>산책 기록을 불러오는 중이에요...</h4>}
      {!isLoading &&
        walkHistory.length > 0 &&
        walkHistory.map((walkInfo) => (
          <WalkHistoryListItem key={walkInfo.walkId} walkInfo={walkInfo} />
        ))}
    </div>
  );
}
