import Layout from '@/components/layout/Layout';
import {
  useGetProductDetailQuery,
  useGetRelatedProductQuery,
  useLikeProductMutation,
} from '@/store/api/productApi';
import { useToastMessage } from '@/utils/hooks';
import { ProductType } from '@/@type/product';
import { ReactNode, useEffect, useState } from 'react';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { Navigate, useParams } from 'react-router-dom';
import { ingredientInfo } from '@/utils/constants/ingredient';
import questionImg from '@/assets/image/question-mark.png';
import categoryImg from '@/assets/image/category.png';
import flagImg from '@/assets/image/flag.png';
import { DotLoader } from '@/Animation';

import {
  AAFCOInfoContainer,
  FooterLikeContainer,
  LikeNumber,
  ProductDescriptionContainer,
  ProductDetailFooter,
  ProductInfoContainer,
  ProductImgWrapper,
} from './index.style';
import Nutrient from './components/ProductDetail/Nutrient';
import RecommendInfo from './components/ProductDetail/RecommendInfoDetail/RecommendInfo';
import ProperAge, { DogInfoForAge } from './components/ProductDetail/ProperAge';
import FeedRecommend from './components/ProductDetail/FeedRecommend';
import BrandInformation from './components/ProductDetail/BrandInformation';
import ProductInfoLabel from './components/ProductDetail/ProductInfoLabel';
import ProductDetailSection from './components/ProductDetail/ProductDetailSection';

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

const ProductInformation = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div className="flex w-1/2 items-center p-3 h-8 rounded border border-gray">
      <div className="">
        <p>{label}</p>
      </div>
      <div className="flex-1 flex justify-end">{children}</div>
    </div>
  );
};

const nutrientList = [
  { name: '단백질', key: 'amountOfProteinPerMcal' },
  { name: '지방', key: 'amountOfFatPerMcal' },
  { name: '섬유', key: 'amountOfFiberPerMcal' },
  { name: '칼슘', key: 'amountOfCalciumPerMcal' },
  { name: '미네랄', key: 'amountOfMineralPerMcal' },
  { name: '인', key: 'amountOfPhosphorusPerMcal' },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  if (!id) {
    return <Navigate to="/404" />;
  }
  const toast = useToastMessage();
  const { data: relatedProduct } = useGetRelatedProductQuery(parseInt(id ?? '1', 10));
  const [mainIngredient, setMainIngredient] = useState<string[]>([]);
  const { likeProduct } = useLikeProduct();
  const [isAAFCOOpen, setIsAAFCOOpen] = useState<boolean>(false);
  const {
    data: product,
    isError,
    isSuccess: productSuccess,
    isLoading,
  } = useGetProductDetailQuery(parseInt(id, 10));

  const productTargetAge = getAge(product);

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
    if (!isError) {
      return;
    }

    toast('알 수 없는 에러가 발생했습니다.');
  }, [isError]);

  return (
    <Layout header title="사료 정보" canGoBack>
      <div className="w-full h-full bg-[#f2f2f2] overflow-scroll flex flex-col gap-y-[10px] pb-[60px]">
        <div className="w-full relative aspect-square h-[100vw+12rem] flex items-end z-0 pb-48">
          {product?.productImage && (
            <img
              className="absolute top-0 blur w-full rounded z-[-1]"
              src={product.productImage}
              alt="상품이미지"
            />
          )}
          <ProductInfoContainer>
            <ProductImgWrapper>
              {product?.productImage ? (
                <img className="w-full aspect-square" src={product.productImage} alt="상품이미지" />
              ) : (
                <DotLoader />
              )}
            </ProductImgWrapper>
            <BrandInformation
              loading={isLoading}
              brandName={product?.brand}
              brandLogo={product?.brandImage}
            />
            <h3 className="text-center w-full font-semibold px-14">{product?.name}</h3>
            <div className="w-full p-4 flex flex-col items-center gap-2" id="shadow-box">
              <ProductInformation label="주재료">
                <ProductInfoLabel>
                  <ProductInfoLabel.Label
                    label={
                      <span className="whitespace-pre leading-4">
                        {mainIngredient.length === 0
                          ? '분석필요'
                          : `${mainIngredient[0].split(' ').join('\n')} 등`}
                      </span>
                    }
                  />
                </ProductInfoLabel>
              </ProductInformation>
              <ProductInformation label="연령">
                <ProductInfoLabel>
                  <ProductInfoLabel.Icon icon={DogInfoForAge[productTargetAge].img} />
                  <ProductInfoLabel.Label
                    label={DogInfoForAge[productTargetAge].name}
                    labelColor={DogInfoForAge[productTargetAge].color}
                  />
                </ProductInfoLabel>
              </ProductInformation>
              <ProductInformation label="종류">
                <ProductInfoLabel>
                  <ProductInfoLabel.Icon icon={categoryImg} />
                  <ProductInfoLabel.Label label={product?.category} />
                </ProductInfoLabel>
              </ProductInformation>
            </div>
          </ProductInfoContainer>
        </div>

        <ProductDescriptionContainer>
          <h4>상품 상세</h4>
          <img src={product?.productDetailImage} />
        </ProductDescriptionContainer>

        <ProductDetailSection label="영양성분">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              {nutrientList.map((nutrient, index) => {
                if (index % 2 !== 0) return null;
                return (
                  <div
                    className="border-b border-[#d9d9d9] h-14 flex items-center"
                    key={`${nutrient}-${index}`}
                  >
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
            <div className="h-[117px] w-[358px] rounded bg-[#F2F8FF] self-center flex flex-col items-center justify-evenly p-min relative">
              {isAAFCOOpen && (
                <AAFCOInfoContainer onClick={() => setIsAAFCOOpen(false)}>
                  <div onClick={(e) => e.stopPropagation()}>
                    <h3>● AAFCO가 무엇입니까?</h3>
                    <span>
                      AAFCO는 Association of American Feed Control Officials의 약자로 ‘미국 공식
                      먹을거리 규제 협회’입니다. AAFCO는 미국에서 동물의 먹을거리 표준을 정하는
                      비영리기구입니다.
                    </span>
                  </div>
                </AAFCOInfoContainer>
              )}
              <img src={flagImg} className="w-[23px] h-[16px]" />
              <div className="flex items-center gap-1">
                <h4 className="text-label">AAFCO 기준</h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAAFCOOpen((prev) => !prev);
                  }}
                  className="flex items-center justify-center"
                >
                  <img className="w-[14px]" src={questionImg} />
                </button>
              </div>
              <h2 className="text-primary">충족</h2>
            </div>
          </div>
        </ProductDetailSection>

        <RecommendInfo isPregnant={!!product?.pregnant} isObesity={!!product?.obesity} />

        <ProperAge age={getAge(product)} />

        <FeedRecommend productList={relatedProduct?.productList} />
      </div>
      <ProductDetailFooter>
        <FooterLikeContainer
          onClick={() => {
            if (id) likeProduct(parseInt(id, 10));
          }}
        >
          {product?.isLiked ? (
            <BsHeartFill className="w-4 h-4" color="red" />
          ) : (
            <BsHeart className="w-4 h-4" color="white" />
          )}
          <LikeNumber>찜하기</LikeNumber>
        </FooterLikeContainer>
      </ProductDetailFooter>
    </Layout>
  );
}
