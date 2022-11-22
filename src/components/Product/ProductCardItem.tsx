import { useNavigate } from 'react-router-dom';

import ContentsContainer from '@/components/ContentsContainer';
import { VerticalBox, VerticalCenterBox } from '@/pages/Main/index.style';
import { ProductPreviewType } from '@/@type/product';

const ProductCardItem = ({ product }: { product: ProductPreviewType }) => {
  const navigate = useNavigate();
  return (
    <ContentsContainer>
      <VerticalBox className="flex-1 justify-between relative overflow-hidden text-ellipsis whitespace-nowrap">
        <div className="min-h-[60%]">
          <VerticalCenterBox onClick={() => navigate(`/products/${product.productId}`)}>
            <img className="rounded-t w-full h-full" src={product.thumbnail} alt={product.name} />
          </VerticalCenterBox>
        </div>
        <div className="p-1 flex flex-col flex-1 justify-between">
          <VerticalBox
            className="overflow-hidden py-1 space-y-1"
            onClick={() => navigate(`/products/${product.productId}`)}
          >
            <p className="text-[11px] leading-[11px] text-primary-dark font-semibold">
              {product.brand}
            </p>
            <p className="text-[12px] leading-[12px] w-full whitespace-pre-line">
              {`${product.name.slice(0, 28)}${product.name.length > 28 ? '...' : ''}`}
            </p>
          </VerticalBox>
        </div>
      </VerticalBox>
    </ContentsContainer>
  );
};
export default ProductCardItem;
