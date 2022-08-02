import Layout from '@/components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '@/utils/hooks/useLogout';
import ChipButton from '@/components/ChipButton';
import { useEffect } from 'react';
import { useGetUserQuery } from '@/store/api/userApi';

export default function Main() {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError } = useGetUserQuery();

  const onClickLogout = useLogout();

  useEffect(() => {
    if (data?.representativeAnimalId === null) {
      navigate('/register', {
        state: {
          isRepresentative: true,
        },
      });
    }
  }, [data]);

  return (
    <Layout footer header title="펫탈로그" menu search onClickSearch={() => alert('준비중입니다.')}>
      <div className="flex flex-col gap-4 p-4">
        <span>메인페이지</span>
        {isLoading && <div>유저정보를 불러오는 중입니다...</div>}
        {isSuccess && (
          <div>
            <h3>{data?.name}</h3>
            <div className="flex flex-col mt-4 gap-4">
              <button
                type="button"
                className="p-2 w-1/2 bg-primary-main text-white rounded-md"
                onClick={onClickLogout}
              >
                로그아웃
              </button>
              <div className="border border-primary-main rounded-md px-2 py-1 w-fit">
                <Link to="/register">반려동물 등록</Link>
              </div>
            </div>
          </div>
        )}
        {isError && <div>유저정보를 불러오는데 실패하였습니다.</div>}

        <div className="space-y-2">
          <ChipButton content="선택" />
          <ChipButton content="선택" filled={true} />
          <ChipButton content="선택" theme="black" />
          <ChipButton content="선택" border={false} />
          <ChipButton content="선택" theme="black" border={false} />
        </div>
      </div>
    </Layout>
  );
}
