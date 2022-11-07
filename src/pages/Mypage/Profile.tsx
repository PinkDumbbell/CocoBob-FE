import Layout from '@/components/layout/Layout';
import { FormInput, FormButton } from '@/components/Form';
import { useAppSelector } from '@/store/config';
import { selectUserInfo } from '@/store/slices/authSlice';
import { useWithdrawal } from '@/utils/hooks';

export default function ProfilePage() {
  const withdrawal = useWithdrawal();
  const { username, email } = useAppSelector(selectUserInfo);

  return (
    <Layout header title="내 정보 변경" canGoBack>
      <form className="p-4 flex flex-col justify-between h-full">
        <div className="space-y-5">
          <h3 className="font-semibold">
            <span className="text-primary">{username}</span>
            님의 정보
          </h3>
          <div className="space-y-2 ">
            <FormInput label="이메일" name="email" placeholder={email} disabled />
          </div>
          <div className="space-y-2">
            <p className="text-p text-gray pt-4 pb-2">
              아래 항목은 비밀번호 변경 시에 입력해주세요.
            </p>
            <FormInput label="현재 비밀번호" name="current-password" />
            <FormInput label="새 비밀번호" name="new-password" />
            <FormInput label="새 비밀번호 확인" name="new-password-confirm" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="w-full flex justify-center items-center">
            <button className="text-caption text-gray" type="button" onClick={withdrawal}>
              <h5>회원탈퇴</h5>
            </button>
          </div>
          <FormButton name="저장하기" />
        </div>
      </form>
    </Layout>
  );
}
