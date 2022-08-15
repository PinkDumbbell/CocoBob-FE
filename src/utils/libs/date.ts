import dayjs from 'dayjs';

export const getYear = (date: string) => dayjs(date).year();
export const getMonth = (date: string) => dayjs(date).month() + 1;
export const getDay = (date: string) => dayjs(date).date();

export const getKoreanStringDateFromDate = (date: string) =>
  `${getYear(date)}년 ${getMonth(date)}월 ${getDay(date)}일`;

export const getDateDiff = (targetDate: string, diffTarget: 'year' | 'month' | 'day') =>
  dayjs().diff(dayjs(targetDate), diffTarget);

export const getTotalMonthWithYearAndMonth = (year: number, month: number) => year * 12 + month;
export const getDateString = (date: Date) => dayjs(date).format('YYYY-MM-DD');
