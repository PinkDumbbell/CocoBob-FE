import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useGetPetsQuery } from '@/store/api/petApi';

import AddPetButton from '../components/AddPetButton';
import PetSimpleCard from '../components/PetSimpleInfo';
import { FlexColumn, MainContentsContainer } from '../index.style';

export default function PetsPage() {
  const { data: pets, isSuccess } = useGetPetsQuery();

  const navigate = useNavigate();
  const goMypage = () => {
    navigate('/mypage');
  };

  return (
    <Layout
      header
      title="우리 아이 목록"
      canGoBack
      onClickGoBack={goMypage}
      customRightChild={<AddPetButton />}
    >
      <MainContentsContainer className="px-2">
        <FlexColumn className="gap-4">
          {isSuccess &&
            pets.map((pet) => (
              <Link
                key={pet.id}
                to={`/mypage/pets/${pet.id}`}
                className="w-full flex gap-5 p-5 bg-white rounded-lg shadow-md shadow-gray-300"
              >
                <PetSimpleCard
                  id={pet.id}
                  birthday={pet.birthday}
                  name={pet.name}
                  age={pet.age}
                  bodyWeight={pet.bodyWeight}
                  breedName={pet.breedName}
                  sex={pet.sex}
                  thumbnailPath={pet.thumbnailPath}
                />
              </Link>
            ))}
        </FlexColumn>
      </MainContentsContainer>
    </Layout>
  );
}
