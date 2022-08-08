import Layout from '@/components/layout/Layout';
import { useGetPetsQuery } from '@/store/api/petApi';
import useLogout from '@/utils/hooks/useLogout';
import { concatClasses } from '@/utils/libs/concatClasses';
import { Link } from 'react-router-dom';
import AddPetBUtton from './components/AddPetButton';
import PetSimpleInfo from './components/PetSimpleInfo';

export default function MypageMain() {
  const { data: pets, isSuccess } = useGetPetsQuery();
  const onClickLogout = useLogout();
  return (
    <Layout header title="마이페이지" footer>
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

            <div className="w-full flex items-center overflow-auto whitespace-nowrap py-2 space-x-4 px-1">
              {isSuccess &&
                pets.map((pet, idx) => (
                  <div
                    className={concatClasses(
                      'flex w-60 h-28 p-4 rounded-lg border items-center gap-3 shadow-gray-300 shadow-md',
                      idx === 0 ? 'border-primary-main' : '',
                    )}
                    key={idx}
                  >
                    <PetSimpleInfo {...pet} />
                  </div>
                ))}
              <AddPetBUtton />
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
          <div className="p-4 border-b border-gray-200">
            <div onClick={onClickLogout}>
              <h5>로그아웃</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
