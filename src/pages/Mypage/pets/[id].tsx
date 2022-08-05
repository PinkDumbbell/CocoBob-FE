/* eslint-disable no-unused-vars */
import { ChangeEvent, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { QuestionWrapper } from '@/pages/RegisterPet/index.style';
import ContentsContainer from '@/components/ContentsContainer';
import Layout from '@/components/layout/Layout';
import FormInput, { InputStyle, Label } from '@/components/Form/FormInput';
import FormButton from '@/components/Form/FormButton';
import BottomSheet from '@/components/BottomSheet';

import { ActivityLevelType, IBreeds, PetSexType } from '@/@type/pet';
import { useGetPetsDetailQuery, useUpdatePetDataMutation } from '@/store/api/petApi';
import { concatClasses } from '@/utils/libs/concatClasses';
import useSelectImage from '@/utils/hooks/useSelectImage';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import BreedBottomSheet from '@/components/BottomSheet/BreedBottomSheet';
import BirthdayBottomSheet from '@/components/BottomSheet/BirthdayBottomSheet';
import MonthsAgeBottomSheet from '@/components/BottomSheet/MonthsAgeBottomSheet';
import useAgeBottomSheet from '@/components/BottomSheet/hooks/useAgeBottomSheet';

interface IPetEditForm {
  name: string;
  bodyWeight: number;
  sex: PetSexType;
  isSpayed: boolean;
  isPregnant: boolean;
  age: number;
  birthday?: string;
  activityLevel: ActivityLevelType;
}
const activityLevels: ActivityLevelType[] = [1, 2, 3, 4, 5];
export default function PetDetail() {
  const { id } = useParams();
  if (!id) return <Navigate to="/404" replace />;

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<IPetEditForm>();
  const [updatePetData] = useUpdatePetDataMutation();
  const { isSuccess, isLoading, data: petData } = useGetPetsDetailQuery(+id);
  const { imageFile, previewUrl, handleChangeImage } = useSelectImage({
    initPreviewUrl: petData?.thumbnailPath,
  });
  const {
    openBottomSheet: openBreedBottomSheet,
    isBottomSheetOpen: isBreedBottomSheetOpen,
    closeBottomSheet,
  } = useBottomSheet('findBreed');

  const [selectedActivityLevel, setSelectedActivityLevel] = useState<ActivityLevelType>(3);
  const [breed, setBreed] = useState<IBreeds | undefined>();

  useEffect(() => {
    console.log(petData);
    if (petData) {
      setValue('name', petData.name);
      setValue('bodyWeight', petData.bodyWeight);
      setValue('sex', petData.sex);
      setValue('isPregnant', petData.isPregnant);
      setValue('isSpayed', petData.isSpayed);
      setValue('age', petData.age);
      setValue('birthday', petData.birthday);
      setSelectedActivityLevel(petData.activityLevel);
      setBreed(petData.breedInfo);
    }
  }, [petData]);

  const onSubmit = (data: IPetEditForm) => {
    console.log(data);
  };

  const {
    months,
    birthday,
    onSaveMonths,
    onSaveBirthday,
    isMonthsAgeBottomSheetOpen,
    openMonthsAgeBottomSheet,
    isBirthdayBottomSheetOpen,
    openBirthdayBottomSheet,
  } = useAgeBottomSheet({ petAge: petData?.age ?? 0, petBirthday: petData?.birthday ?? '' });

  useEffect(() => {
    console.log('나이 변경', months, '개월 또는', birthday);
  }, [months, birthday]);
  return (
    <Layout header title="우리아이 정보 수정" canGoBack>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <>
          <div className="p-2 px-3 relative">
            <form
              className="pb-16 flex flex-col gap-4 relative w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <ContentsContainer>
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="w-32 h-32 rounded-full bg-slate-100 overflow-hidden">
                    <img src={previewUrl} alt="" />
                  </div>
                </div>
              </ContentsContainer>
              <ContentsContainer>
                <div className="w-full flex flex-col p-2 gap-5">
                  <FormInput
                    label="이름"
                    name="pet-name"
                    placeholder="반려동물의 이름을 입력해주세요"
                    rules={register('name', {
                      required: '이름을 입력해주세요',
                      maxLength: 20,
                    })}
                    type="text"
                    isError={!!errors.name?.message}
                    errorMessage={errors.name?.message}
                  />
                  <div className="space-y-2">
                    <Label isError={false}>견종</Label>
                    <InputStyle
                      isError={false}
                      onChange={(e) => e.preventDefault()}
                      className="text-gray-400 text-left p-2 border-b border-b-gray-400"
                      onClick={openBreedBottomSheet}
                      placeholder={breed?.id ? breed?.name : '품종을 검색해보세요'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label isError={false}>나이</Label>
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-col">
                        <button
                          className="text-left p-1 border border-primary-main rounded-md text-sm"
                          type="button"
                          onClick={openBirthdayBottomSheet}
                        >
                          생년월일을 알고 있어요
                        </button>
                      </div>
                      <div className="flex flex-col">
                        <button
                          className="text-left p-1 border border-primary-main rounded-md text-sm"
                          type="button"
                          onClick={openMonthsAgeBottomSheet}
                        >
                          대략적인 나이만 알고 있어요
                        </button>
                      </div>
                    </div>
                  </div>
                  <FormInput
                    label="몸무게"
                    name="bodyWeight"
                    placeholder="몸무게를 입력해주세요"
                    rules={register('bodyWeight', {
                      required: true,
                      valueAsNumber: true,
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        message: '숫자를 입력해주세요',
                      },
                    })}
                    type="text"
                  />
                  <div className="space-y-2">
                    <Label isError={false}>성별</Label>
                    <div className="flex gap-1 items-center mb-2">
                      <div className="flex-1 text-center w-1/2">
                        <input
                          type="radio"
                          className="hidden"
                          value="MALE"
                          id="pet-sex-man"
                          {...register('sex', { required: '성별을 선택해주세요' })}
                        />
                        <label
                          htmlFor="pet-sex-man"
                          className={concatClasses(
                            'border border-primary-main rounded-md w-full block',
                            watch('sex') === 'MALE' ? 'bg-primary-light text-primary-main' : '',
                          )}
                        >
                          남자
                        </label>
                      </div>
                      <div className="flex-1 text-center w-1/2">
                        <input
                          type="radio"
                          className="hidden"
                          value="FEMALE"
                          id="pet-sex-woman"
                          {...register('sex', { required: '성별을 선택해주세요' })}
                        />
                        <label
                          htmlFor="pet-sex-woman"
                          className={concatClasses(
                            'border border-primary-main rounded-md w-full block',
                            watch('sex') === 'FEMALE' ? 'bg-primary-light text-primary-main' : '',
                          )}
                        >
                          여자
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <QuestionWrapper>
                      <input type="checkbox" id="spayed" {...register('isSpayed')} />
                      <label htmlFor="spayed">중성화를 했나요?</label>
                    </QuestionWrapper>
                    <QuestionWrapper>
                      <input type="checkbox" id="pregnant" {...register('isPregnant')} />
                      <label htmlFor="pregnant">임신/수유 중인가요?</label>
                    </QuestionWrapper>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>활동수준</p>
                    <div className="flex gap-4">
                      {activityLevels.map((value) => (
                        <input
                          key={value}
                          type="radio"
                          name={String(value)}
                          id={`activity-level-${value}`}
                          value={value}
                          checked={value === selectedActivityLevel}
                          onChange={() => setSelectedActivityLevel(value)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </ContentsContainer>

              <div className="p-3 fixed mx-auto bottom-0 w-full max-w-[425px] bg-white rounded-t-lg left-1/2 -translate-x-[50%]">
                <FormButton name="저장" />
              </div>
            </form>
          </div>
          <BreedBottomSheet isOpen={isBreedBottomSheetOpen} setBreed={setBreed} />
          <BirthdayBottomSheet
            isOpen={isBirthdayBottomSheetOpen}
            birthday={birthday}
            onSave={onSaveBirthday}
          />
          <MonthsAgeBottomSheet
            isOpen={isMonthsAgeBottomSheetOpen}
            months={months}
            onSave={onSaveMonths}
          />
        </>
      )}
    </Layout>
  );
}
