import Layout from '@/components/layout/Layout';
import ProductItem from '@/components/Product';
import { useEffect } from 'react';
import { useState } from 'react';

export default function ProductsPage() {
  const categoryList = ['사료', '간식', '영양제'];
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState<string>('');

  useEffect(() => {});
  return (
    <Layout footer header title="사료" canSearch>
      <div>
        <div className="fixed w-full flex flex-col bg-white">
          <div className="w-full h-12 flex items-center overflow-x-auto ">
            {categoryList.map((categoryName) =>
              categoryName === category ? (
                <div
                  key={categoryName}
                  className="box-border h-12 w-32 text-center leading-[3rem] border-b border-red-500 text-red-500"
                  onClick={() => {
                    setCategory(categoryName);
                  }}
                >
                  {categoryName}
                </div>
              ) : (
                <div
                  key={categoryName}
                  className="w-32 text-center leading-[3rem]"
                  onClick={() => {
                    setCategory(categoryName);
                  }}
                >
                  {categoryName}
                </div>
              ),
            )}
          </div>
          <div className="p-1 w-full h-8 border border-gray-200 flex items-center justify-end">
            <div className="flex items-center gap-2">
              <label htmlFor="affco-filter" className="text-gray-700 text-[0.8rem]">
                AFFCO 만족 상품
              </label>
              <input type="checkbox" name="" id="affco-filter" />
            </div>
          </div>
        </div>
        <div className="pt-20 flex flex-col gap-1">
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
