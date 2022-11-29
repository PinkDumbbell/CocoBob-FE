import { useEffect, useMemo, useState } from 'react';

import DatePicker from '@/components/DatePicker';
import { getDateDiff, getDateString } from '@/utils/libs/date';

import BottomSheet from './BottomSheet';
import { BottomSheetContentWrapper, Title } from './BottomSheet.style';
import Button from '../Button';

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
  const [date, setDate] = useState<string | undefined>(birthday);

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
        <div className="flex flex-col gap-1">
          <Title>언제 태어났나요?</Title>
          <div className="py-3 w-full flex flex-col items-center justify-center gap-3">
            <DatePicker
              currentDate={date ? new Date(date) : new Date()}
              onChangeDate={(selectedDate) => {
                if (selectedDate) {
                  setDate(getDateString(selectedDate));
                }
              }}
            />
            {date && <p className="text-label text-primary">{`나이 : ${ageString}`}</p>}
          </div>
          <Button label="선택완료" onClick={saveDate} />
        </div>
      </BottomSheetContentWrapper>
    </BottomSheet>
  );
}
