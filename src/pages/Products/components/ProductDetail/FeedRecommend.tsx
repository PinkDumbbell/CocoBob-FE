import { ProductPreviewType } from '@/@type/product';
import SwiperProductItem from '@/pages/Main/components/SwiperProductItem';
import { FeedRecommendContainer } from './index.style';

interface IProps {
  productList: ProductPreviewType[] | undefined;
}

export default function FeedRecommend(props: IProps) {
  const { productList } = props;
  return (
    <FeedRecommendContainer>
      <h4>이러한 사료는 어떠세요 ?</h4>
      <div>
        {productList?.map((product) => (
          <SwiperProductItem key={product.productId} product={product} isActive={true} />
        ))}
      </div>
    </FeedRecommendContainer>
  );
}
