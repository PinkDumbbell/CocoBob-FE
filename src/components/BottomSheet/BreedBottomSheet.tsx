import { IBreeds } from '@/@type/pet';
import useSearchBreed from '@/utils/hooks/useSearchBreed';
import { useGetBreedsQuery } from '@/store/api/petApi';
import { Dispatch, SetStateAction } from 'react';
import { concatClasses } from '@/utils/libs/concatClasses';
import { InputStyle } from '../Form/FormInput';
import BottomSheet from '.';
import Button from '../Button';

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
            selectedBreed?.id === breed.id ? 'bg-primary-light' : '',
            'py-2',
          )}
        >
          <span className="inline-block text-primary-main w-14">{breed.size}</span>
          <span>{breed.name}</span>
        </p>
      </div>
    ))}
  </>
);

export default function BreedBottomSheet({
  isOpen,
  setBreed,
}: {
  isOpen: boolean;
  setBreed: Dispatch<SetStateAction<IBreeds | undefined>>;
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
  } = useSearchBreed(breeds);

  const onClickSelectButton = () => {
    setBreed(selectedBreed);
    closeBreedBottomSheet();
  };

  return (
    <BottomSheet isOpen={isOpen}>
      <div className="p-4 flex flex-col gap-2">
        <InputStyle
          isError={false}
          value={searchKeyword}
          onChange={onChangeSearchKeyword}
          placeholder="품종을 검색해보세요"
        />
        {isLoading && <div className="h-[50vh] px-2 py-3 overflow-y-scroll">로딩중...</div>}
        {isSuccess && (
          <div className="h-[50vh] px-2 py-3 overflow-y-scroll">
            {
              <BreedList
                breeds={!searchKeyword ? breeds : foundBreeds}
                selectedBreed={selectedBreed}
                setBreed={setSelectedBreed}
              />
            }
          </div>
        )}
        <Button label="선택" onClick={onClickSelectButton} />
      </div>
    </BottomSheet>
  );
}
