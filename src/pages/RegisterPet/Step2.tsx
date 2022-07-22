/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import FormButton from '@/components/Form/FormButton';
import {
  closeBottomSheetAction,
  selectBottomSheet,
  setBottomSheetAction,
} from '@/store/slices/bottomSheetSlice';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonWrapper, PageContainer, QuestionText, Form, PetNameHighlight } from './index.style';
import { IPrevNextStep } from './type';

type PetAgeType = {
  years: number | null;
  months: number | null;
};
type AgeModeType = 'exact' | 'ambiguos' | '';

export default function Step2({ goPrevStep, goNextStep }: IPrevNextStep) {
  const dispatch = useDispatch();
  const currentSelectMode = useSelector(selectBottomSheet);
  const [petAge, setPetAge] = useState<PetAgeType>({
    years: null,
    months: null,
  });

  const [selectedMode, setSelectedMode] = useState<AgeModeType>('');

  const { register, handleSubmit } = useForm();

  const onValidSubmit = (data: any) => {
    console.log(data);
    goNextStep();
  };

  const onSelectAgeMode = (mode: AgeModeType) => dispatch(setBottomSheetAction(mode));

  useEffect(
    () => () => {
      dispatch(closeBottomSheetAction);
    },
    [],
  );
  return (
    <PageContainer>
      <div>
        <PetNameHighlight>코코!</PetNameHighlight>
        <QuestionText>귀여운 이름이네요. 나이는요?</QuestionText>
      </div>
      <Form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <button className="text-left" type="button" onClick={() => onSelectAgeMode('exact')}>
              생년월일을 알고 있어요
            </button>
            {selectedMode === 'exact' && (
              <div className="pl-5">
                <p>2022년 07월 12일</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <button className="text-left" type="button" onClick={() => onSelectAgeMode('ambiguos')}>
              대략적인 나이만 알고 있어요
            </button>
            {selectedMode === 'ambiguos' && (
              <div className="pl-5">
                <p>5년 8개월</p>
              </div>
            )}
          </div>
        </div>
        <ButtonWrapper>
          <FormButton name="다음으로" disabled={false} />
        </ButtonWrapper>
      </Form>
      <BottomSheet isOpen={currentSelectMode === 'exact' || currentSelectMode === 'ambiguos'}>
        <div className="p-4">
          {currentSelectMode === 'exact' && (
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-bold">언제 태어났나요?</h4>
              <div className="py-3 w-full flex flex-col items-center justify-center gap-3">
                <input
                  type="date"
                  className="text-gray-600 relative w-full text-center bg-primary-100 rounded-md text-md py-1"
                />
                <p className="text-sm text-primary-900">나이 : 3년 8개월</p>
              </div>
              <Button label="선택완료" />
            </div>
          )}
          {currentSelectMode === 'ambiguos' && (
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-bold">추정 나이는 몇 살인가요?</h4>
              <h6 className="text-md">맞춤형 정보를 위해 나이 정보는 꼭 필요해요</h6>
              <div className="py-3 w-full flex flex-col items-center justify-center gap-3">
                <input
                  type="date"
                  className="text-gray-600 relative w-full text-center bg-primary-100 rounded-md text-md py-1"
                />
                <p className="text-sm text-primary-900">나이 : 3년 8개월</p>
              </div>
              <Button label="선택완료" />
            </div>
          )}
        </div>
      </BottomSheet>
    </PageContainer>
  );
}
