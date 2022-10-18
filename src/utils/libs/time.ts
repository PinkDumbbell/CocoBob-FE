const pipe =
  (...funcs: any[]) =>
  (v: any) => {
    return funcs.reduce((res, func) => {
      return func(res);
    }, v);
  };

const splitHHmm = (time: string) => {
  const [hh, mm] = time.split(':');
  if (hh === '00') {
    return ['24', mm];
  }
  return [hh, mm];
};
const transformStringToNumber = (strings: string[]) => strings.map((str) => Number(str));
const getTotalMinutes = ([hour, minute]: number[]) => hour * 60 + minute;

export const getTimeDiff = (fromHhMm: string, toHhMm: string) => {
  // hh:mm 형식의 시간(string)의 차이를 mm형식(number)으로 반환

  const fromTotalMinutes = pipe(splitHHmm, transformStringToNumber, getTotalMinutes)(fromHhMm);
  const toTotalMinutes = pipe(splitHHmm, transformStringToNumber, getTotalMinutes)(toHhMm);

  return Math.abs(toTotalMinutes - fromTotalMinutes);
};
