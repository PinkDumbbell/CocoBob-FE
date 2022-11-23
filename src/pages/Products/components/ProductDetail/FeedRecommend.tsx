import { ProductPreviewType } from '@/@type/product';

import ProductCardItem from '@/components/Product/ProductCardItem';

import ProductDetailSection from './ProductDetailSection';

interface IProps {
  productList: ProductPreviewType[] | undefined;
}

export default function FeedRecommend(props: IProps) {
  const { productList } = props;
  return (
    <ProductDetailSection label="이러한 사료는 어떠세요?">
      <div className="flex gap-4 overflow-x-auto p-2">
        {productList?.map((product) => (
          <div className="relative min-w-[130px] h-48" key={product.productId}>
            <ProductCardItem product={product} />
          </div>
        ))}
      </div>
    </ProductDetailSection>
  );
}
