import Layout from '@/components/layout/Layout';
import { FormInput, FormButton } from '@/components/Form';

export default function DailyBodyWeight() {
  return (
    <Layout header title="몸무게 기록" canGoBack>
      <form className="p-4 flex flex-col gap-2 justify-between h-full">
        <FormInput
          label="오늘의 몸무게"
          name="daily-bodyWeight"
          placeholder="몸무게를 입력해주세요"
          unit="KG"
        />
        <FormButton name="저장" />
      </form>
    </Layout>
  );
}
