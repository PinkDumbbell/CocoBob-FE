import Button from '@/components/Button';
import Layout from '@/components/layout/Layout';
import { useGetProductDetailQuery } from '@/store/api/productApi';
import { useParams } from 'react-router-dom';
import Nutrient from './components/Nutrient';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product } = useGetProductDetailQuery(parseInt(id ?? '1', 10));
  return (
    <Layout footer header title="사료 정보" canGoBack>
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
            <Button label="리뷰 작성" size="full" onClick={() => {}} />
          </div>
        </div>
        <div className="w-full h-[300px] bg-white flex flex-col mb-[90px]">
          <div className="w-full h-2 bg-gray-300" />
          <div className="m-4 flex flex-col">
            <h4>영양성분</h4>
            <div className="border-b h-14 flex">
              <Nutrient name="탄수화물" amount={3000} unit="k/cal" />
              <Nutrient name="탄수화물" amount={3000} unit="k/cal" />
            </div>
            <div className="border-b h-14 flex">
              <Nutrient name="탄수화물" amount={3000} unit="k/cal" />
              <Nutrient name="탄수화물" amount={3000} unit="k/cal" />
            </div>
            <div className="border-b h-14 flex">
              <Nutrient name="탄수화물" amount={3000} unit="k/cal" />
              <Nutrient name="탄수화물" amount={3000} unit="k/cal" />
            </div>
            <div className="border-b h-14 flex">
              <Nutrient name="탄수화물" amount={3000} unit="k/cal" />
              <Nutrient name="탄수화물" amount={3000} unit="k/cal" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
