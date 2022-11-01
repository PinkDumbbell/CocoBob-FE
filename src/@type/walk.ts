export type WalkRecordType = {
  distance: number;
  totalTime: number;
  startedAt: string;
  finishedAt: string;
};
export type WalkHistoryItemType = WalkRecordType & {
  walkId: number;
};
export type RecordOverviewType = {
  dailyId: number;
  dailyTitle: string;
  healthRecordId: number;
  isAbnormal: boolean;
  mealCount: number;
  walkTotalDistance: number;
  walkTotalTime: number;
};
