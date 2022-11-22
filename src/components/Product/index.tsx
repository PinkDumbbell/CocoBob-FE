import React from 'react';
import { ProductPreviewType } from '@/@type/product';

/**
 * 상품 구성 요소
 * - 상품명
 * - 제조사
 * - 가격
 * - AAFCO 만족/불만족
 * - 유아/성견/노견
 */

function getAge(growing?: boolean, aged?: boolean) {
  if (growing) return <p className="text-primary-bright">성장기</p>;
  if (aged) return <p className="text-[#D27C1A]">노령견</p>;
  return <p className="text-gray">노령견</p>;
}
interface IProductItem {
  product: ProductPreviewType;
}
function ProductItem(props: IProductItem) {
  const { product } = props;
  return (
    <div className="flex items-center w-full h-36 p-1 gap-2 border-b border-secondary-brightest">
      <div className="w-32 h-32 min-w-[128px] min-h-[128px] flex justify-center items-center rounded overflow-hidden">
        <img className="h-full aspect-square" src={product?.thumbnail} alt="" />
      </div>
      <div className="flex flex-col p-2 gap-2 h-full justify-between">
        <div>
          {product.isAAFCOSatisfied ? (
            <p className="text-primary-dark text-label font-medium">AAFCO 충족</p>
          ) : (
            <p className="text-gray text-label font-medium">AAFCO 미달</p>
          )}
          <h4 className="text-black font-bold">{product?.name}</h4>
        </div>
        <div className="flex flex-col gap-0.5">
          <p>{getAge(product.growing, product.aged)}</p>
        </div>
      </div>
    </div>
  );
}
export default React.memo(ProductItem);
