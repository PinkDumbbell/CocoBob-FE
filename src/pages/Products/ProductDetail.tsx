import Layout from '@/components/layout/Layout';
import {
  useGetProductDetailQuery,
  useGetRelatedProductQuery,
  useLikeProductMutation,
} from '@/store/api/productApi';
import { useToastMessage } from '@/utils/hooks';
import { ProductType } from '@/@type/product';
import { useEffect, useState } from 'react';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { Navigate, useParams } from 'react-router-dom';
import { ingredientInfo } from '@/utils/constants/ingredient';
import mainIngredientImg from '@/assets/image/main-ingredient.png';
import questionImg from '@/assets/image/question-mark.png';
import categoryImg from '@/assets/image/category.png';
import flagImg from '@/assets/image/flag.png';
import Nutrient from './components/ProductDetail/Nutrient';

import {
  AAFCOInfoContainer,
  FooterLikeContainer,
  LikeNumber,
  NutrientInfoContainer,
  ProductDescriptionContainer,
  ProductDetailFooter,
  ProductDetailSimpleInfo,
  ProductInfoContainer,
  ProductDetailMainContainer,
  BrComponent,
  ProductImgWrapper,
} from './index.style';
import RecommendInfo from './components/ProductDetail/RecommendInfoDetail/RecommendInfo';
import ProperAge, { DogInfoForAge } from './components/ProductDetail/ProperAge';
import FeedRecommend from './components/ProductDetail/FeedRecommend';

function getAge(product: ProductType | undefined) {
  if (product?.growing) return 'growing';
  if (product?.aged) return 'old';
  return 'adult';
}

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
  if (!id) {
    return <Navigate to="/404" />;
  }
  const { data: relatedProduct } = useGetRelatedProductQuery(parseInt(id ?? '1', 10));
  const [mainIngredient, setMainIngredient] = useState<string[]>([]);
  const [summaryInfo, setSummaryInfo] = useState<any[]>([]);
  const { likeProduct } = useLikeProduct();
  const [isAAFCOOpen, setIsAAFCOOpen] = useState<boolean>(false);
  const {
    data: product,
    isError,
    isSuccess: productSuccess,
  } = useGetProductDetailQuery(parseInt(id, 10));
  useEffect(() => {
    if (!productSuccess || !product) {
      return;
    }

    const mainIngredients: string[] = [];
    ingredientInfo.forEach((info) => {
      if (product[info.key]) {
        mainIngredients.push(info.ingredient);
      }
    });
    setMainIngredient(mainIngredients);
  }, [product, productSuccess]);

  useEffect(() => {
    setSummaryInfo([
      {
        img: product?.brandImage,
        infoName: '브랜드',
        infoDescription: <h4 className="text-white">{product?.brand}</h4>,
      },
      {
        img: mainIngredientImg,
        infoName: '주재료',
        infoDescription: (
          <div className="flex items-center text-center" key={mainIngredient.length}>
            <span>{mainIngredient.length === 0 ? '분석필요' : mainIngredient[0]} </span>
            {mainIngredient.length > 1 && (
              <span className="bg-black  text-[6px] w-4 h-4 text-white rounded-[50%] ml-[4px]">
                +{mainIngredient.length - 1}
              </span>
            )}
          </div>
        ),
      },
      {
        img: DogInfoForAge[getAge(product)].img,
        infoName: '타겟',
        infoDescription: <h4>{DogInfoForAge[getAge(product)].name}</h4>,
      },
      {
        img: categoryImg,
        infoName: '사료종류',
        infoDescription: <h4>{product?.category}</h4>,
      },
    ]);
  }, [mainIngredient]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    console.log('error');
  }, [isError]);

  const nutrientList = [
    { name: '단백질', key: 'amountOfProteinPerMcal' },
    { name: '지방', key: 'amountOfFatPerMcal' },
    { name: '섬유', key: 'amountOfFiberPerMcal' },
    { name: '칼슘', key: 'amountOfCalciumPerMcal' },
    { name: '미네랄', key: 'amountOfMineralPerMcal' },
    { name: '인', key: 'amountOfPhosphorusPerMcal' },
  ];
  return (
    <Layout header title="사료 정보" canGoBack>
      <ProductDetailMainContainer
        className="w-full h-full absolute bg-slate-500 overflow-scroll"
        onClick={() => setIsAAFCOOpen(false)}
      >
        <div className="w-full relative mt-[-5rem] z-0 blur">
          <img
            className="w-full rounded-[10px] z-[-1]"
            src={product?.productImage}
            alt="상품이미지 "
          />
        </div>
        <ProductInfoContainer className="z-50 mt-[-150px] relative">
          <ProductImgWrapper>
            <img className="w-full rounded-[10px]" src={product?.productImage} alt="상품이미지 " />
          </ProductImgWrapper>
          <h3 className="text-black font-bold break-normal text-center w-full">{product?.name}</h3>
          <div
            className="w-full p-4 h-32 flex place-content-around border-gray-800"
            id="shadow-box"
          >
            {summaryInfo.map((info: any) => (
              <ProductDetailSimpleInfo key={info.infoName}>
                <div className="h-[51px] flex justify-center">
                  <img src={info.img} />
                </div>
                <div
                  className={`bg-[${info.infoName === '브랜드' ? '#0A2B52' : ''}] h-[59px] w-full`}
                >
                  <span
                    className={`flex text-${info.infoName === '브랜드' ? '[#AAC7E9]' : 'gray-500'}`}
                  >
                    {info.infoName}
                  </span>
                  {/* <h4 className={`${info.infoName === '브랜드' ? 'text-white' : ''}`}>
                    {info.infoDescription}
                  </h4> */}
                  {info.infoDescription}
                </div>
              </ProductDetailSimpleInfo>
            ))}
          </div>
        </ProductInfoContainer>
        <BrComponent />
        <ProductDescriptionContainer>
          <div className="pull"></div>
          <h4>상품 상세</h4>
          <img src={product?.productDetailImage} />
        </ProductDescriptionContainer>
        <NutrientInfoContainer>
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
          <div className="h-[117px] w-[358px] rounded-[10px] bg-[#F2F8FF] self-center flex flex-col items-center justify-around">
            <img src={flagImg} className="w-[23px] h-[16px] mt-[15px]" />
            <div className="flex items-center">
              {isAAFCOOpen && (
                <AAFCOInfoContainer>
                  <h3>● AAFCO가 무엇입니까?</h3>
                  <span>
                    AAFCO는 Association of American Feed Control Officials의 약자로 ‘미국 공식
                    먹을거리 규제 협회’입니다. AAFCO는 미국에서 동물의 먹을거리 표준을 정하는
                    비영리기구입니다.
                  </span>
                </AAFCOInfoContainer>
              )}
              <h4>AAFCO 기준</h4>
              <img
                className="w-[16px] h-[16px] ml-[5px]"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAAFCOOpen((prev) => !prev);
                }}
                src={questionImg}
              />
            </div>
            <h2 className="mb-[15px] text-primary">충족</h2>
          </div>
        </NutrientInfoContainer>
        <BrComponent />
        <RecommendInfo isPregnant={!!product?.pregnant} isObesity={!!product?.obesity} />
        <BrComponent />
        {/* <MainIngredient />
        <BrComponent /> */}
        <ProperAge age={getAge(product)} />
        <BrComponent />
        <FeedRecommend productList={relatedProduct?.productList} />
        <BrComponent />
        <div className="w-full h-[110px] bg-white" />
      </ProductDetailMainContainer>
      <ProductDetailFooter>
        <FooterLikeContainer
          onClick={() => {
            if (id) likeProduct(parseInt(id, 10));
          }}
        >
          {product?.isLiked ? (
            <BsHeartFill className="w-5 h-5" color="red" />
          ) : (
            <BsHeart className="w-5 h-5" color="white" />
          )}
          <LikeNumber>찜하기</LikeNumber>
        </FooterLikeContainer>
      </ProductDetailFooter>
    </Layout>
  );
}
