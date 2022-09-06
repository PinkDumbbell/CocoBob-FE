import { getDateDiff } from '@/utils/libs/date';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import BottomSheet from './BottomSheet';
import Button from '../Button';
import {
  BottomSheetContentWrapper,
  DatePicker,
  SelectDateWrapper,
  Title,
} from './BottomSheet.style';

interface BirthdayBottomSheetProps {
  isOpen: boolean;
  birthday?: string;
  // eslint-disable-next-line no-unused-vars
  onSave: (date: string) => void;
}
export default function BirthdayBottomSheet({
  isOpen,
  birthday,
  onSave,
}: BirthdayBottomSheetProps) {
  const [date, setDate] = useState(birthday);

  const ageString = useMemo(() => {
    if (!date) return '';

    const yearDiff = getDateDiff(date, 'year');
    const monthDiff = getDateDiff(date, 'month') % 12;

    if (!yearDiff && !monthDiff) return '1개월 이하';
    if (!yearDiff) return `${monthDiff}개월`;
    return `${yearDiff}년 ${monthDiff}개월`;
  }, [date]);

  const saveDate = () => {
    if (!date) return;
    onSave(date);
  };
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    setDate(birthday);
    return () => {
      setDate('');
    };
  }, [isOpen]);

  return (
    <BottomSheet isOpen={isOpen}>
      <BottomSheetContentWrapper>
        <Title>언제 태어났나요?</Title>
        <SelectDateWrapper className="flex-col">
          <DatePicker
            type="date"
            defaultValue={date}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          />
          {ageString && <p className="text-sm text-primary-main">{`나이 : ${ageString}`}</p>}
        </SelectDateWrapper>
        <Button label="선택완료" onClick={saveDate} />
      </BottomSheetContentWrapper>
    </BottomSheet>
  );
}
