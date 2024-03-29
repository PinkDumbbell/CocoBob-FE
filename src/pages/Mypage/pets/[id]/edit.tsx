import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { QuestionWrapper } from '@/pages/RegisterPet/index.style';
import Layout from '@/components/layout/Layout';
import { FormInput, FormButton } from '@/components/Form';
import { InputStyle, Label } from '@/components/Form/FormInput';

import { IBreeds, IPetInformation, PetSexType, PetInfoForm } from '@/@type/pet';
import { useGetPetsDetailQuery, useUpdatePetDataMutation } from '@/store/api/petApi';

import { useSelectImage, useBottomSheet, useConfirm, useToastMessage } from '@/utils/hooks';
import { getFileFromObjectURL } from '@/utils/libs/getFileFromObjectURL';
import {
  BreedBottomSheet,
  BirthdayBottomSheet,
  MonthsAgeBottomSheet,
} from '@/components/BottomSheet';
import useAgeBottomSheet from '@/components/BottomSheet/hooks/useAgeBottomSheet';
import ActivityLevelSelector, { useSelectActivityLevel } from '@/components/ActivitySelector';

import { ReactComponent as TrashIcon } from '@/assets/icon/trash_icon.svg';
import { ReactComponent as EditIcon } from '@/assets/icon/edit_icon.svg';
import { ReactComponent as CalendarIcon } from '@/assets/icon/calendar_icon.svg';
import PetDefault from '@/assets/image/pet_default.png';

import {
  AgeDescription,
  AgeSelectButton,
  EditProfileLabel,
  FlexColumn,
  FlexColumnCenter,
  Form,
  RemoveProfileButton,
  SaveButtonContainer,
  SexTypeButton,
  SexTypeContainer,
  SexTypeLabel,
} from '@/pages/Mypage/index.style';
import { concatClasses } from '@/utils/libs/concatClasses';

interface IPetEditForm {
  name: string;
  bodyWeight: number;
  sex: PetSexType;
  isSpayed: boolean;
  isPregnant: boolean;
}

function useUpdatePet() {
  const navigate = useNavigate();
  const openToast = useToastMessage();
  const [updatePet, response] = useUpdatePetDataMutation();
  const { data, isError, isSuccess } = response;

  useEffect(() => {
    if (!isSuccess) return;
    navigate('/mypage/pets', { replace: true });
    openToast('성공적으로 정보를 수정하였습니다.', 'success');
  }, [data, isSuccess]);

  useEffect(() => {
    if (!isError) return;
    openToast('반려동물 수정 중 오류가 발생하였습니다.', 'error');
  }, [isError]);

  return {
    ...response,
    updatePet,
  };
}

export default function EditPet() {
  const { id } = useParams();
  if (!id) return <Navigate to="/404" replace />;

  const [openPopup] = useConfirm();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<IPetEditForm>();

  const { updatePet } = useUpdatePet();
  const { isSuccess, isLoading, data: petData } = useGetPetsDetailQuery(+id);
  const { imageFile, previewUrl, handleChangeImage, setPreviewUrl } = useSelectImage({
    initPreviewUrl: petData?.thumbnailPath,
  });

  const { openBottomSheet: openBreedBottomSheet, isBottomSheetOpen: isBreedBottomSheetOpen } =
    useBottomSheet('findBreed');
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

  const { selectedActivityLevel, setSelectedActivityLevel, handleSelectActivityLevel } =
    useSelectActivityLevel();
  const [breed, setBreed] = useState<IBreeds | undefined>();
  const [isImageDeleted, setIsImageDeleted] = useState(false); // 사진을 삭제했을 때 true, 변경하거나 그대로 유지 : false

  const initProfileImage = () => {
    setPreviewUrl('');
    setIsImageDeleted(true);
  };

  const deleteProfileImage = async () => {
    if (!previewUrl) return;
    const confirm = await openPopup({
      contents: <p className="py-10">프로필 사진을 삭제하시겠습니까?</p>,
    });
    if (confirm) {
      initProfileImage();
    }
  };

  const onSubmit = async (data: IPetEditForm) => {
    if ((!months && !birthday) || !breed?.id) return;
    const updateParams = {
      petId: +id,
      isImageJustDeleted: isImageDeleted,
      formInput: {
        ...data,
        age: months,
        birthday,
        activityLevel: selectedActivityLevel,
        breedId: breed?.id,
      } as PetInfoForm<File>,
    };
    if (imageFile) {
      updateParams.formInput.petImage = await getFileFromObjectURL(imageFile);
    }
    updatePet(updateParams);
  };

  const initForm = (data: IPetInformation) => {
    setValue('name', data.name);
    setValue('bodyWeight', data.bodyWeight);
    setValue('sex', data.sex);
    setValue('isPregnant', data.isPregnant);
    setValue('isSpayed', data.isSpayed);
    setSelectedActivityLevel(data.activityLevel);
    setBreed(data.breedInfo);
    setPreviewUrl(data.thumbnailPath);
  };

  useEffect(() => {
    if (petData) {
      initForm(petData);
    }
  }, [petData]);

  useEffect(() => {
    if (imageFile) {
      setIsImageDeleted(false);
    }
  }, [imageFile]);

  return (
    <Layout header title="우리아이 정보 수정" canGoBack>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <>
          <div className="p-2 px-3 relative">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FlexColumnCenter className="w-full py-4">
                <div className="relative w-32 h-32 bg-white flex items-center justify-center p-1">
                  <EditProfileLabel htmlFor="pet-thumbnail">
                    <EditIcon />
                  </EditProfileLabel>
                  <input
                    type="file"
                    id="pet-thumbnail"
                    className="hidden"
                    accept="image/jpg, image/png, image/jpeg"
                    onChange={handleChangeImage}
                  />
                  {previewUrl && (
                    <RemoveProfileButton onClick={deleteProfileImage} type="button">
                      <TrashIcon />
                    </RemoveProfileButton>
                  )}
                  <div className="rounded-full overflow-hidden h-full w-full shadow-lg">
                    <img src={previewUrl || PetDefault} alt="" className="w-full h-full" />
                  </div>
                </div>
              </FlexColumnCenter>

              <div>
                <FlexColumn className="w-full p-2 gap-5">
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
                      className="text-gray text-left p-2 border-b border-b-gray-400"
                      onClick={openBreedBottomSheet}
                      placeholder={breed?.id ? breed?.name : '품종을 검색해보세요'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label isError={false}>나이</Label>
                    <FlexColumn className="gap-2">
                      <FlexColumn className="gap-1">
                        <AgeSelectButton
                          className={birthday ? 'border-primary' : 'border-gray-300'}
                          type="button"
                          onClick={openBirthdayBottomSheet}
                        >
                          생년월일을 알고 있어요
                        </AgeSelectButton>
                        {birthday && (
                          <AgeDescription>
                            <CalendarIcon className="w-5 h-5" />
                            {birthday}
                          </AgeDescription>
                        )}
                      </FlexColumn>
                      <div className="flex flex-col gap-1">
                        <AgeSelectButton
                          className={birthday ? 'border-gray-300' : 'border-primary'}
                          type="button"
                          onClick={openMonthsAgeBottomSheet}
                        >
                          대략적인 나이만 알고 있어요
                        </AgeSelectButton>
                        {!birthday && (
                          <AgeDescription>
                            <CalendarIcon className="w-5 h-5" />
                            {months >= 12
                              ? `${Math.floor(months / 12)}년 ${months % 12}개월`
                              : `${months}개월`}
                          </AgeDescription>
                        )}
                      </div>
                    </FlexColumn>
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
                    unit="KG"
                    type="text"
                  />
                  <div className="space-y-2">
                    <Label isError={false}>성별</Label>
                    <SexTypeContainer>
                      <SexTypeButton>
                        <input
                          type="radio"
                          className="hidden"
                          value="MALE"
                          id="pet-sex-man"
                          {...register('sex', { required: '성별을 선택해주세요' })}
                        />
                        <SexTypeLabel
                          htmlFor="pet-sex-man"
                          className={concatClasses(
                            'p-1 text-label',
                            watch('sex') === 'MALE' ? 'bg-primary-light text-primary' : '',
                          )}
                        >
                          남아
                        </SexTypeLabel>
                      </SexTypeButton>
                      <SexTypeButton>
                        <input
                          type="radio"
                          className="hidden"
                          value="FEMALE"
                          id="pet-sex-woman"
                          {...register('sex', { required: '성별을 선택해주세요' })}
                        />
                        <SexTypeLabel
                          htmlFor="pet-sex-woman"
                          className={concatClasses(
                            'p-1 text-label',
                            watch('sex') === 'FEMALE' ? 'bg-primary-light text-primary' : '',
                          )}
                        >
                          여아
                        </SexTypeLabel>
                      </SexTypeButton>
                    </SexTypeContainer>
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
                  <FlexColumn className="gap-2">
                    <p>활동수준</p>
                    <ActivityLevelSelector
                      activityLevel={selectedActivityLevel}
                      handleSelectLevel={handleSelectActivityLevel}
                    />
                  </FlexColumn>
                </FlexColumn>
              </div>
              <SaveButtonContainer>
                <FormButton name="저장" />
              </SaveButtonContainer>
            </Form>
          </div>
          <BreedBottomSheet
            isOpen={isBreedBottomSheetOpen}
            setBreed={setBreed}
            currentBreedId={petData.breedInfo.id}
          />
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
