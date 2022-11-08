import React from 'react';
import { ProductPreviewType } from '@/@type/product';
import ChipButton from '../ChipButton';

/**
 * 상품 구성 요소
 * - 상품명
 * - 제조사
 * - 가격
 * - AAFCO 만족/불만족
 * - 유아/성견/노견
 */
interface IProductItem {
  product: ProductPreviewType;
}
function ProductItem(props: IProductItem) {
  const { product } = props;
  return (
    <div className="flex w-full h-36 border-b border-gray-200">
      <div className="w-36 h-36 flex justify-center items-center p-1">
        <img className="w-full rounded-[10px]" src={product?.thumbnail} alt="" />
      </div>
      <div className="flex flex-col p-1 justify-center gap-2">
        <div className="flex flex-col gap-0.5">
          <h4 className="text-black font-bold w-60">{product?.name}</h4>
          <p>{product?.price.toLocaleString('ko-KR')}원</p>
        </div>
        <div className="flex gap-1 items-center">
          <ChipButton content="성견" filled={false} border />
          <ChipButton content="AAFCO" filled />
        </div>
      </div>
    </div>
  );
}
export default React.memo(ProductItem);
