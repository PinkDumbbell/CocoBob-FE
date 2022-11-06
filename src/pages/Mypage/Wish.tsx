import Layout from '@/components/layout/Layout';

export default function WishPage() {
  return (
    <Layout header title="찜한 상품" canGoBack footer={false}>
      <div className="w-full">
        <h3>찜한 상품 페이지</h3>
      </div>
    </Layout>
  );
}
