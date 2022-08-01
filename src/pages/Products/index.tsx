import Layout from '@/components/layout/Layout';
import ProductItem from '@/components/Product';

export default function ProductsPage() {
  return (
    <Layout footer header title="사료">
      <div>
        <div className="fixed w-full flex flex-col bg-white">
          <div className="p-1 w-full h-8 border border-gray-200 flex items-center justify-end">
            <div className="flex items-center gap-2">
              <label htmlFor="affco-filter" className="text-gray-700 text-[0.8rem]">
                AFFCO 만족 상품
              </label>
              <input type="checkbox" name="" id="affco-filter" />
            </div>
          </div>
        </div>
        <div className="pt-9 flex flex-col gap-1">
          {Array(12)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="px-2">
                <ProductItem />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
