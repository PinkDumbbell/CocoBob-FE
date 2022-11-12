import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import { Button } from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import FormButton from '@/components/Form/FormButton';
import {
  getKoreanStringDateFromDate,
  getDateDiff,
  getTotalMonthWithYearAndMonth,
  getDateString,
} from '@/utils/libs/date';
import { useBottomSheet, useToastMessage } from '@/utils/hooks';
import { ButtonWrapper, PageContainer, QuestionText, Form, PetNameHighlight } from './index.style';
import { StepPageProps } from './type';

type ageType = {
  months: number;
  birthday?: string;
};
type AgeModeType = 'birthday' | 'monthsAge' | '';

export default function Step4({ goNextStep, enrollPetData, setEnrollData }: StepPageProps) {
  const {
    isBottomSheetOpen: isBirthdayBottomSheetOpen,
    openBottomSheet: openBirthdayBottomSheet,
    closeBottomSheet,
  } = useBottomSheet('birthday');
  const {
    isBottomSheetOpen: isMonthsAgeBottomSheetOpen,
    openBottomSheet: openMonthsAgeBottomSheet,
  } = useBottomSheet('monthsAge');
  const openToast = useToastMessage();

  const [age, setAge] = useState<ageType>({
    months: 0,
    birthday: '',
  });

  const [selectedMode, setSelectedMode] = useState<AgeModeType>('');
  const [monthsAge, setMonthsAge] = useState<{ year: number; month: number }>({
    year: 0,
    month: 0,
  });

  const { handleSubmit } = useForm();

  const saveMonthsAge = () => {
    if (monthsAge.year === 0 && monthsAge.month === 0) return;
    setSelectedMode('monthsAge');
    setAge({
      birthday: '',
      months: getTotalMonthWithYearAndMonth(monthsAge.year, monthsAge.month),
    });
    closeBottomSheet();
  };

  const saveBirthday = () => {
    if (!age.birthday) return;

    setSelectedMode('birthday');
    setAge((prevAge) => ({ ...prevAge, months: getDateDiff(age.birthday!, 'month') }));
    closeBottomSheet();
  };

  const saveAge = () => {
    setEnrollData('age', age.months);
    setEnrollData('birthday', age.birthday);
  };

  const onValidSubmit = () => {
    if (!age.birthday && !age.months) {
      openToast('나이를 입력해주세요');
      return;
    }
    saveAge();
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
      birthday: enrollPetData.birthday,
      months: enrollPetData.age,
    });
    if (enrollPetData.birthday) setSelectedMode('birthday');
    else if (enrollPetData.age) setSelectedMode('monthsAge');
    else setSelectedMode('');
    return () => {
      closeBottomSheet();
    };
  }, []);

  return (
    <PageContainer>
      <div className="mb-6">
        <QuestionText>
          <PetNameHighlight>{enrollPetData.name}!</PetNameHighlight>
        </QuestionText>
        <QuestionText>귀여운 이름이네요. 나이는요?</QuestionText>
      </div>
      <Form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Button
              label="생년월일을 알고 있어요"
              primary={selectedMode === 'birthday' ? 'third' : 'fourth'}
              onClick={openBirthdayBottomSheet}
            />
            {selectedMode === 'birthday' && (
              <div className="p-3 w-full bg-primary-max rounded">
                <p>{getKoreanStringDateFromDate(age.birthday ?? '')}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Button
              label="대략적인 나이만 알고 있어요"
              primary={selectedMode === 'monthsAge' ? 'third' : 'fourth'}
              onClick={openMonthsAgeBottomSheet}
            />
            {selectedMode === 'monthsAge' && age.months > 0 && (
              <div className="p-3 w-full bg-primary-max rounded">
                <p>
                  {Math.floor(age.months / 12)}년 {age.months % 12}개월
                </p>
              </div>
            )}
          </div>
        </div>
        <ButtonWrapper>
          <FormButton name="다음으로" disabled={!age.birthday && !age.months} />
        </ButtonWrapper>
      </Form>
      <BottomSheet isOpen={isBirthdayBottomSheetOpen}>
        <div className="p-5">
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-medium">언제 태어났나요?</h4>
            <div className="py-3 w-full flex flex-col items-center justify-center gap-3">
              <DatePicker
                currentDate={age.birthday ? new Date(age.birthday) : new Date()}
                onChangeDate={(date: Date | null) => {
                  if (date) setAge((prev) => ({ ...prev, birthday: getDateString(date) }));
                }}
              />
              {age.birthday && <p className="text-label text-primary">{`나이 : ${ageString}`}</p>}
            </div>
            <Button label="선택완료" onClick={saveBirthday} />
          </div>
        </div>
      </BottomSheet>
      <BottomSheet isOpen={isMonthsAgeBottomSheetOpen}>
        <div className="p-5">
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-medium">추정 나이는 몇 살인가요?</h4>
            <h6 className="text-md">맞춤형 정보를 위해 나이 정보는 꼭 필요해요</h6>
            <div className="py-3 w-full flex  items-center justify-center gap-3">
              <div className="flex gap-1">
                <select
                  name=""
                  id=""
                  defaultValue={Math.floor(age.months / 12)}
                  onChange={(e) =>
                    setMonthsAge((prev) => ({ ...prev, year: Number(e.target.value) }))
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
                    setMonthsAge((prev) => ({ ...prev, month: Number(e.target.value) }))
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
            <Button label="선택완료" onClick={saveMonthsAge} />
          </div>
        </div>
      </BottomSheet>
    </PageContainer>
  );
}
