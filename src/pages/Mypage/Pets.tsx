import Layout from '@/components/layout/Layout';

export default function PetsPage() {
  return (
    <Layout header title="나의 가족" canGoBack footer>
      <div className="w-full">
        <h3>반려동물 목록 페이지</h3>
      </div>
    </Layout>
  );
}
