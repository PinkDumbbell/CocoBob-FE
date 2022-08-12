import Layout from '@/components/layout/Layout';
import ProductItem from '@/components/Product';
import { useGetProductQuery } from '@/store/api/productApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductsPage() {
  const categoryList = ['사료', '간식', '영양제'];
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState<string>('');
  const { data } = useGetProductQuery();
  // todo: 검색 가능한 키워드 선정하기
  const navigate = useNavigate();
  const productList = data?.productList;
  useEffect(() => {});
  return (
    <Layout footer header title="사료" canSearch>
      <div className="px-4 fixed flex flex-col w-[inherit] max-w-[425px] bg-white">
        <div className="h-12 w-full flex justify-between items-center overflow-x-scroll">
          {categoryList.map((categoryName) =>
            categoryName === category ? (
              <div
                key={categoryName}
                className="box-border h-12 w-[33%] text-center leading-[3rem] border-b border-red-500 text-red-500"
                onClick={() => {
                  setCategory(categoryName);
                }}
              >
                {categoryName}
              </div>
            ) : (
              <div
                key={categoryName}
                className="text-center leading-[3rem] w-[33%]"
                onClick={() => {
                  setCategory(categoryName);
                }}
              >
                {categoryName}
              </div>
            ),
          )}
        </div>
        <div className="w-full h-8 border-t border-b border-gray-200 flex items-center justify-end">
          <div className="flex items-center">
            <label htmlFor="affco-filter" className="text-gray-700 text-[0.8rem]">
              AFFCO 만족 상품
            </label>
            <input type="checkbox" name="" id="affco-filter" />
          </div>
        </div>
      </div>
      <div className="pt-20 flex flex-col gap-1">
        {productList?.map((product) => (
          <div
            key={product.productId}
            className="px-2"
            onClick={() => navigate(`/product/${product.productId}`)}
          >
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
}
