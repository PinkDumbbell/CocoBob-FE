/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import FormButton from '@/components/Form/FormButton';
import { InputStyle } from '@/components/Form/FormInput';
import { concatClasses } from '@/utils/libs/concatClasses';
import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import { setRegisterInfo } from '@/store/slices/registerPetSlice';
import { IBreeds } from '@/@type/pet';
import { favBreedfsMock } from '@/utils/constants/enrollment';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import { ButtonWrapper, PageContainer, QuestionText, Form, PetNameHighlight } from './index.style';
import { IPrevNextStep } from './type';
import useSearchBreed from './hooks/useSearchBreed';

interface IBreedList {
  breeds: IBreeds[];
  onSelectBreed: (breed: IBreeds) => void;
}
const BreedList = ({ breeds, onSelectBreed }: IBreedList) => (
  <>
    {breeds.map((breed) => (
      <div key={breed.breedId} onClick={() => onSelectBreed(breed)}>
        <p className="py-2">
          <span className="pr-2 text-primary-900">{breed.breedSize}</span>
          {breed.breedName}
        </p>
      </div>
    ))}
  </>
);

export default function Step3({ goPrevStep, goNextStep }: IPrevNextStep) {
  const { isBottomSheetOpen, openBottomSheet } = useBottomSheet('findBreed');
  const {
    breeds,
    searchKeyword,
    onChangeSearchKeyword,
    selectedBreed,
    foundBreeds,
    onSelectBreed,
  } = useSearchBreed();

  const dispatch = useDispatch();
  const { handleSubmit } = useForm();

  const onValidSubmit = (data: any) => {
    if (!selectedBreed) {
      alert('견종을 선택해주세요');
      return;
    }
    dispatch(
      setRegisterInfo({
        breedId: selectedBreed.breedId,
      }),
    );
    goNextStep();
  };

  return (
    <PageContainer>
      <div>
        <QuestionText>
          <PetNameHighlight>코코</PetNameHighlight>는 어떤 아이인가요?
        </QuestionText>
      </div>
      <Form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="text-gray-400 text-left p-2 border-b border-b-gray-400"
            onClick={openBottomSheet}
          >
            {selectedBreed?.breedId ? selectedBreed.breedName : '품종을 검색해보세요'}
          </button>
          <div className="flex flex-wrap gap-2 items-center">
            {favBreedfsMock.map((breed: IBreeds) => (
              <span
                className={concatClasses(
                  'py-1 px-2 text-sm rounded-lg',
                  breed.breedId === selectedBreed?.breedId
                    ? 'border border-primary-900 bg-primary-100 text-primary-900'
                    : 'border',
                )}
                onClick={() => onSelectBreed(breed)}
                key={breed.breedId}
              >
                {breed.breedName}
              </span>
            ))}
          </div>
        </div>
        <ButtonWrapper>
          <FormButton name="다음으로" disabled={false} />
        </ButtonWrapper>
      </Form>
      <BottomSheet isOpen={isBottomSheetOpen}>
        <div className="p-4 flex flex-col gap-2">
          <InputStyle
            isError={false}
            value={searchKeyword}
            onChange={onChangeSearchKeyword}
            placeholder="품종을 검색해보세요"
          />
          <div className="h-[50vh] px-2 py-3 overflow-y-scroll">
            {!searchKeyword ? (
              <BreedList breeds={breeds} onSelectBreed={onSelectBreed} />
            ) : (
              <BreedList breeds={foundBreeds} onSelectBreed={onSelectBreed} />
            )}
          </div>
          <Button label="선택 완료" />
        </div>
      </BottomSheet>
    </PageContainer>
  );
}
