import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';

export default function MypageMain() {
  return (
    <Layout title="마이페이지" header footer>
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

            <div className="w-full overflow-auto whitespace-nowrap py-2 space-x-4">
              {Array(4)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="inline-flex w-48 h-28 rounded-lg border border-primary-main"
                  ></div>
                ))}
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
    </Layout>
  );
}
