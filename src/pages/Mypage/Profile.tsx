import Layout from '@/components/layout/Layout';
import FormInput from '@/components/Form/FormInput';
import FormButton from '@/components/Form/FormButton';

export default function ProfilePage() {
  return (
    <Layout header title="프로필 수정" canGoBack>
      <form className="p-4 flex flex-col justify-between h-full">
        <div className="space-y-5">
          <div className="space-y-2">
            <FormInput label="이름" name="username" placeholder="이름을 입력해주세요" />
            <FormInput label="이메일" name="email" placeholder="petalog@pinkdumbbel.us" disabled />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">아래 항목은 비밀번호 변경 시에 입력해주세요.</p>
            <FormInput label="현재 비밀번호" name="current-password" />
            <FormInput label="새 비밀번호" name="new-password" />
            <FormInput label="새 비밀번호 확인" name="new-password-confirm" />
          </div>
        </div>
        <FormButton name="저장하기" />
      </form>
    </Layout>
  );
}
