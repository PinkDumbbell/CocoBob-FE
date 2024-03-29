import { IBreeds } from '@/@type/pet';
import useSearchBreed from '@/utils/hooks/useSearchBreed';
import { useGetBreedsQuery } from '@/store/api/petApi';
import { Dispatch, SetStateAction } from 'react';
import { concatClasses } from '@/utils/libs/concatClasses';
import { DotLoader } from '@/Animation';
import { InputStyle } from '../Form/FormInput';
import BottomSheet from './BottomSheet';
import { Button } from '../Button';
import {
  BottomSheetContentWrapper,
  BreedListContainer,
  LoadingContainer,
} from './BottomSheet.style';

interface IBreedList {
  breeds: IBreeds[];
  selectedBreed?: IBreeds;
  setBreed: Dispatch<SetStateAction<IBreeds | undefined>>;
}
const BreedList = ({ breeds, selectedBreed, setBreed }: IBreedList) => (
  <>
    {breeds.map((breed) => (
      <div key={breed.id} onClick={() => setBreed(breed)}>
        <p
          className={concatClasses(
            selectedBreed?.id === breed.id ? 'bg-primary-brightest' : '',
            'px-2 py-2 cursor-pointer',
          )}
        >
          <span className="inline-block text-primary w-14">{breed.size}</span>
          <span>{breed.name}</span>
        </p>
      </div>
    ))}
  </>
);

export default function BreedBottomSheet({
  isOpen,
  setBreed,
  currentBreedId,
}: {
  isOpen: boolean;
  setBreed: Dispatch<SetStateAction<IBreeds | undefined>>;
  currentBreedId?: number;
}) {
  const { isLoading, isSuccess, data } = useGetBreedsQuery();
  const breeds = data ?? ([] as IBreeds[]);

  const {
    closeBreedBottomSheet,
    foundBreeds,
    onChangeSearchKeyword,
    searchKeyword,
    selectedBreed,
    setSelectedBreed,
  } = useSearchBreed(breeds, currentBreedId);

  const onClickSelectButton = () => {
    setBreed(selectedBreed);
    closeBreedBottomSheet();
  };

  return (
    <BottomSheet isOpen={isOpen}>
      <BottomSheetContentWrapper>
        <InputStyle
          isError={false}
          value={searchKeyword}
          onChange={onChangeSearchKeyword}
          placeholder="품종을 검색해보세요"
        />
        {isLoading && (
          <LoadingContainer>
            <DotLoader />
          </LoadingContainer>
        )}
        {isSuccess && (
          <BreedListContainer>
            {
              <BreedList
                breeds={!searchKeyword ? breeds : foundBreeds}
                selectedBreed={selectedBreed}
                setBreed={setSelectedBreed}
              />
            }
          </BreedListContainer>
        )}
        <Button label="선택" primary="first" onClick={onClickSelectButton} />
      </BottomSheetContentWrapper>
    </BottomSheet>
  );
}
