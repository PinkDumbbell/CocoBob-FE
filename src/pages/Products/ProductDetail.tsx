import Button from '@/components/Button';
import Layout from '@/components/layout/Layout';
import { useGetProductDetailQuery, useLikeProductMutation } from '@/store/api/productApi';
import { useToastMessage } from '@/utils/hooks';
import { useEffect } from 'react';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { Navigate, useParams } from 'react-router-dom';
import Nutrient from './components/Nutrient';

function useLikeProduct() {
  const openToast = useToastMessage();
  const [likeProduct, response] = useLikeProductMutation();
  const { data, isError, isSuccess } = response;

  useEffect(() => {
    if (!isSuccess) return;
    openToast('성공적으로 정보를 수정하였습니다.', 'success');
  }, [data, isSuccess]);

  useEffect(() => {
    if (!isError) return;
    openToast('오류가 발생하였습니다.', 'error');
  }, [isError]);

  return {
    ...response,
    likeProduct,
  };
}
export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, error } = useGetProductDetailQuery(parseInt(id ?? '1', 10));
  const { likeProduct } = useLikeProduct();
  if (error) return <Navigate to="/404" replace />;
  const nutrientList = [
    { name: '단백질', key: 'amountOfProteinPerMcal' },
    { name: '지방', key: 'amountOfFatPerMcal' },
    { name: '섬유', key: 'amountOfFiberPerMcal' },
    { name: '칼슘', key: 'amountOfCalciumPerMcal' },
    { name: '미네랄', key: 'amountOfMineralPerMcal' },
    { name: '인', key: 'amountOfPhosphorusPerMcal' },
  ];
  return (
    <Layout footer header title="사료 정보" canGoBack>
      <button
        onClick={() => {
          if (id) likeProduct(parseInt(id, 10));
        }}
        className="absolute w-5 h-5 z-[1001] top-4 right-5"
      >
        {product?.isLiked ? <BsHeartFill className="w-5 h-5" /> : <BsHeart className="w-5 h-5" />}
      </button>
      <div className="w-full h-full absolute bg-slate-500 overflow-scroll">
        <div className="w-full h-[450px] bg-white rounded-t-xl mt-32 flex flex-col items-center">
          <div className="w-40 h-40 mt-[-5rem] mb-5">
            <img className="w-full" src={product?.productImage} alt="" />
          </div>
          <p className="text-[#999999] text-[13px]">⭐ 4.3(90)</p>
          <h3 className="text-black font-bold break-normal text-center w-full">{product?.name}</h3>
          <h4 className="text-[#1A70D2]">{product?.price.toLocaleString('ko-KR')}원</h4>
          <div className="w-full p-4 h-32 border border-gray-800">어떤 내용</div>
          <div className="w-full p-4">
            <Button label="리뷰 작성" width="full" onClick={() => {}} />
          </div>
        </div>
        <div className="w-full h-[300px] bg-white flex flex-col mb-[90px]">
          <div className="w-full h-2 bg-gray-300" />
          <div className="m-4 flex flex-col">
            <h4>영양성분</h4>
            {nutrientList.map((nutrient, index) => {
              if (index % 2 !== 0) return <></>;
              return (
                <div className="border-b h-14 flex" key={`${nutrient}-${index}`}>
                  <Nutrient
                    name={nutrient.name}
                    amount={product ? product[nutrient.key as keyof typeof product] : ''}
                    unit="g/Mcal"
                  />
                  <Nutrient
                    name={nutrientList[index + 1]?.name}
                    amount={
                      product ? product[nutrientList[index + 1]?.key as keyof typeof product] : ''
                    }
                    unit="g/Mcal"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
