import { IBreeds, PetSexType } from '@/@type/pet';
import { concatClasses } from '@/utils/libs/concatClasses';
import { Link } from 'react-router-dom';
import PetSimpleInfo from './components/PetSimpleInfo';

const mockPets = [
  {
    profilePath: 'https://blog.kakaocdn.net/dn/QdxpO/btrlDxijNFW/5aOuaUHFOfrzjohKUnynu1/img.jpg',
    id: 1,
    name: '코코',
    breed: {
      id: 20,
      name: '골든 리트리버',
      type: '대형',
    } as unknown as IBreeds,
    age: 40,
    sex: 'FEMALE' as PetSexType,
    bodyWeight: 17.2,
  },
  {
    id: 2,
    name: '로용',
    breed: {
      id: 87,
      name: '포메라니안',
      type: '초소형',
    } as unknown as IBreeds,
    age: 27,
    sex: 'MALE' as PetSexType,
    bodyWeight: 3.8,
  },
];
export default function MypageMain() {
  return (
    <div className="w-full flex flex-col bg-gray-100 gap-4">
      <div className="p-5 flex flex-col gap-1 bg-white">
        <div className="py-6">
          <h2>
            <span>username</span>님의 펫탈로그
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3>소중한 가족들</h3>
            <Link to="/mypage/pets" className="text-caption">
              전체보기
            </Link>
          </div>

          <div className="w-full flex items-center overflow-auto whitespace-nowrap py-2 space-x-4">
            {mockPets.map((pet, idx) => (
              <div
                className={concatClasses(
                  'flex w-60 p-4 rounded-lg border items-center gap-3 shadow-gray-300 shadow-md',
                  idx === 0 ? 'border-primary-main' : '',
                )}
                key={idx}
              >
                <PetSimpleInfo {...pet} />
              </div>
            ))}
            <div className="flex w-60 p-5 rounded-lg border items-center gap-3 shadow-gray-300 shadow-md">
              <div className="rounded-full h-16 w-16 bg-gray-200 flex justify-center items-center">
                <span className="text-caption text-md">+</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <p>새로운 가족을</p>
                <p>소개해 주세요!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col">
        {[
          { page: '보호자님 정보 변경', path: '/mypage/profile' },
          { page: '찜한 제품', path: '/mypage/wish' },
        ].map((menu, idx) => (
          <div key={idx} className="p-4 border-b border-gray-200">
            <Link to={menu.path}>
              <h5>{menu.page}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
