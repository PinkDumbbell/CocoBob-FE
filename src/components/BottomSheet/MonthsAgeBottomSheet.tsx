import { useEffect, useState } from 'react';
import BottomSheet from './BottomSheet';
import { Button } from '../Button';
import {
  BottomSheetContentWrapper,
  Description,
  SelectDateWrapper,
  Title,
} from './BottomSheet.style';

interface MonthsAgeBottomSheetProps {
  isOpen: boolean;
  months: number;
  // eslint-disable-next-line no-unused-vars
  onSave: (months: number) => void;
}

const monthsData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export default function MonthsAgeBottomSheet({
  isOpen,
  months,
  onSave,
}: MonthsAgeBottomSheetProps) {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  const onSaveAge = () => onSave(12 * year + month);

  const initAge = () => {
    setYear(Math.floor(months / 12));
    setMonth(months % 12);
  };

  useEffect(() => {
    initAge();
  }, [months]);
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      initAge();
    };
  }, [isOpen]);
  return (
    <BottomSheet isOpen={isOpen}>
      <BottomSheetContentWrapper>
        <Title>추정 나이는 몇 살인가요?</Title>
        <Description>맞춤형 정보를 위해 나이 정보는 꼭 필요해요</Description>
        <SelectDateWrapper>
          <div className="flex gap-1">
            <select
              name="year-picker"
              defaultValue={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {Array(31)
                .fill(0)
                .map((_, idx) => (
                  <option key={String(idx)} value={idx}>
                    {idx}
                  </option>
                ))}
            </select>
            <span>년</span>
          </div>
          <div className="flex gap-1">
            <select
              name="month-picker"
              defaultValue={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {monthsData.map((value) => (
                <option key={String(value)} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <span>개월</span>
          </div>
        </SelectDateWrapper>
        <Button label="선택완료" onClick={onSaveAge} />
      </BottomSheetContentWrapper>
    </BottomSheet>
  );
}
