import { getDateDiff } from '@/utils/libs/date';
import { useEffect, useMemo, useState } from 'react';
import BottomSheet from '.';
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
    return () => {
      setDate('');
    };
  }, [isOpen]);
  return (
    <BottomSheet isOpen={isOpen}>
      <div className="p-4">
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold">언제 태어났나요?</h4>
          <div className="py-3 w-full flex flex-col items-center justify-center gap-3">
            <input
              type="date"
              defaultValue={date}
              className="text-gray-600 relative w-full text-center bg-primary-light rounded-md text-md py-1"
              onChange={(e) => setDate(e.target.value)}
            />
            {ageString && <p className="text-sm text-primary-main">{`나이 : ${ageString}`}</p>}
          </div>
          <Button label="선택완료" onClick={saveDate} />
        </div>
      </div>
    </BottomSheet>
  );
}
