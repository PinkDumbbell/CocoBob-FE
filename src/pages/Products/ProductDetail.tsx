import Button from '@/components/Button';
import Layout from '@/components/layout/Layout';
import { useGetProductDetailQuery } from '@/store/api/productApi';
import { useParams } from 'react-router-dom';
import Nutrient from './components/Nutrient';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product } = useGetProductDetailQuery(parseInt(id ?? '1', 10));
  const nutrientList = [
    { name: '칼슘', key: 'amountOfCalciumPerMcal' },
    { name: '지방', key: 'amountOfFatPerMcal' },
    { name: '섬유', key: 'amountOfFiberPerMcal' },
    { name: '미네랄', key: 'amountOfMineralPerMcal' },
    { name: '인', key: 'amountOfPhosphorusPerMcal' },
    { name: '단백질', key: 'amountOfProteinPerMcal' },
  ];
  console.log(product);
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
            {nutrientList.map((nutrient, index) => {
              if (index % 2 !== 0) return <></>;
              return (
                <div className="border-b h-14 flex" key={index}>
                  <Nutrient
                    name={nutrient.name}
                    amount={product ? product[nutrient.key as keyof typeof product] : ''}
                    unit="k/cal"
                  />
                  <Nutrient
                    name={nutrientList[index + 1]?.name}
                    amount={
                      product ? product[nutrientList[index + 1]?.key as keyof typeof product] : ''
                    }
                    unit="k/cal"
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
