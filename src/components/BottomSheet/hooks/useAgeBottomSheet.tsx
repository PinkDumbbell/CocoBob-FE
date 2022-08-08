/* eslint-disable arrow-body-style */
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import { getDateDiff } from '@/utils/libs/date';
import { useEffect, useState } from 'react';

export default function useAgeBottomSheet({
  petAge,
  petBirthday,
}: {
  petAge: number;
  petBirthday: string;
}) {
  const {
    isBottomSheetOpen: isMonthsAgeBottomSheetOpen,
    openBottomSheet: openMonthsAgeBottomSheet,
    closeBottomSheet,
  } = useBottomSheet('monthsAge');
  const { isBottomSheetOpen: isBirthdayBottomSheetOpen, openBottomSheet: openBirthdayBottomSheet } =
    useBottomSheet('birthday');

  const [months, setMonths] = useState(petAge);
  const [birthday, setBirthday] = useState(petBirthday);

  useEffect(() => {
    return () => {
      closeBottomSheet();
    };
  }, []);

  useEffect(() => {
    setMonths(petAge);
    setBirthday(petBirthday);
  }, [petAge, petBirthday]);

  const onSaveBirthday = (date: string) => {
    setBirthday(date);
    setMonths(getDateDiff(date, 'month'));
    closeBottomSheet();
  };
  const onSaveMonths = (monthsValue: number) => {
    setMonths(monthsValue);
    setBirthday('');
    closeBottomSheet();
  };

  return {
    months,
    birthday,
    onSaveMonths,
    onSaveBirthday,
    isMonthsAgeBottomSheetOpen,
    openMonthsAgeBottomSheet,
    isBirthdayBottomSheetOpen,
    openBirthdayBottomSheet,
  };
}
