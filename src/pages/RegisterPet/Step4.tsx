import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import FormButton from '@/components/Form/FormButton';
import { selectRegisterInfo, setRegisterInfo } from '@/store/slices/registerPetSlice';
import {
  getKoreanStringDateFromDate,
  getDateDiff,
  getTotalMonthWithYearAndMonth,
} from '@/utils/libs/date';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import { ButtonWrapper, PageContainer, QuestionText, Form, PetNameHighlight } from './index.style';
import { IPrevNextStep } from './type';

type ageType = {
  months: number;
  birthday?: string;
};
type AgeModeType = 'exact' | 'ambiguous' | '';

export default function Step4({ goNextStep }: IPrevNextStep) {
  const {
    currentBottomSheet,
    isBottomSheetOpen: isExactDateBottomSheetOpen,
    openBottomSheet: openExactDateBottomSheet,
    closeBottomSheet,
  } = useBottomSheet('exact');
  const {
    isBottomSheetOpen: isAmbiguousDateBottomSheetOpen,
    openBottomSheet: openAmbiguousDateBottomSheet,
  } = useBottomSheet('ambiguous');

  const dispatch = useDispatch();
  const registerInfo = useSelector(selectRegisterInfo);

  const [age, setAge] = useState<ageType>({
    months: 0,
    birthday: '',
  });

  const [selectedMode, setSelectedMode] = useState<AgeModeType>('');
  const [ambiguousDate, setAmbiguousDate] = useState<{ year: number; month: number }>({
    year: 0,
    month: 0,
  });

  const { handleSubmit } = useForm();

  const saveAmbiguousAge = () => {
    if (ambiguousDate.year === 0 && ambiguousDate.month === 0) return;
    setSelectedMode('ambiguous');
    setAge({
      birthday: '',
      months: getTotalMonthWithYearAndMonth(ambiguousDate.year, ambiguousDate.month),
    });
    closeBottomSheet();
  };

  const saveBirthday = () => {
    if (!age.birthday) return;

    setSelectedMode('exact');
    setAge((prevAge) => ({ ...prevAge, months: getDateDiff(age.birthday!, 'month') }));
    closeBottomSheet();
  };

  const saveAgeInStore = () =>
    dispatch(
      setRegisterInfo({
        age: age.months,
        birthday: age.birthday,
      }),
    );

  const onValidSubmit = () => {
    if (!age.birthday && !age.months) {
      alert('나이를 입력해주세요');
      return;
    }
    saveAgeInStore();
    goNextStep();
  };

  const ageString = useMemo(() => {
    if (!age.birthday) return '';

    const yearDiff = getDateDiff(age.birthday, 'year');
    const monthDiff = getDateDiff(age.birthday, 'month') % 12;

    if (!yearDiff && !monthDiff) return '1개월 이하';
    if (!yearDiff) return `${monthDiff}개월`;
    return `${yearDiff}년 ${monthDiff}개월`;
  }, [age]);

  useEffect(() => {
    setAge({
      birthday: registerInfo.birthday,
      months: registerInfo.age,
    });
    if (registerInfo.birthday) setSelectedMode('exact');
    else setSelectedMode('ambiguous');
    return () => {
      closeBottomSheet();
    };
  }, []);

  return (
    <PageContainer>
      <div className="mb-2">
        <QuestionText>
          <PetNameHighlight>{registerInfo.name}!</PetNameHighlight>
        </QuestionText>
        <QuestionText>귀여운 이름이네요. 나이는요?</QuestionText>
      </div>
      <Form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <button
              className="text-left p-1 border border-primary-900 rounded-md font-semibold"
              type="button"
              onClick={openExactDateBottomSheet}
            >
              생년월일을 알고 있어요
            </button>
            {selectedMode === 'exact' && !currentBottomSheet && (
              <div className="py-2 px-3 w-full bg-primary-100 rounded-md">
                <p>{getKoreanStringDateFromDate(age.birthday ?? '')}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <button
              className="text-left p-1 border border-primary-900 rounded-md font-semibold"
              type="button"
              onClick={openAmbiguousDateBottomSheet}
            >
              대략적인 나이만 알고 있어요
            </button>
            {selectedMode === 'ambiguous' && !currentBottomSheet && (
              <div className="py-2 px-3 w-full bg-primary-100 rounded-md">
                <p>
                  {Math.floor(age.months! / 12)}년 {age.months! % 12}개월
                </p>
              </div>
            )}
          </div>
        </div>
        <ButtonWrapper>
          <FormButton name="다음으로" disabled={false} />
        </ButtonWrapper>
      </Form>
      <BottomSheet isOpen={isExactDateBottomSheetOpen}>
        <div className="p-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold">언제 태어났나요?</h4>
            <div className="py-3 w-full flex flex-col items-center justify-center gap-3">
              <input
                type="date"
                defaultValue={age.birthday}
                className="text-gray-600 relative w-full text-center bg-primary-100 rounded-md text-md py-1"
                onChange={(e) => setAge((prev) => ({ ...prev, birthday: e.target.value }))}
              />
              {age.birthday && <p className="text-sm text-primary-900">{`나이 : ${ageString}`}</p>}
            </div>
            <Button label="선택완료" onClick={saveBirthday} />
          </div>
        </div>
      </BottomSheet>
      <BottomSheet isOpen={isAmbiguousDateBottomSheetOpen}>
        <div className="p-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold">추정 나이는 몇 살인가요?</h4>
            <h6 className="text-md">맞춤형 정보를 위해 나이 정보는 꼭 필요해요</h6>
            <div className="py-3 w-full flex  items-center justify-center gap-3">
              <div className="flex gap-1">
                <select
                  name=""
                  id=""
                  defaultValue={Math.floor(age.months / 12)}
                  onChange={(e) =>
                    setAmbiguousDate((prev) => ({ ...prev, year: Number(e.target.value) }))
                  }
                >
                  {Array(51)
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
                  name=""
                  id=""
                  defaultValue={age.months % 12}
                  onChange={(e) =>
                    setAmbiguousDate((prev) => ({ ...prev, month: Number(e.target.value) }))
                  }
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
                    <option key={String(value)} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <span>개월</span>
              </div>
            </div>
            <Button label="선택완료" onClick={saveAmbiguousAge} />
          </div>
        </div>
      </BottomSheet>
    </PageContainer>
  );
}
