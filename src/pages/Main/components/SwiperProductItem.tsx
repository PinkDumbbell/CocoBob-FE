import { concatClasses } from '@/utils/libs/concatClasses';
import { ProductPreviewType } from '@/@type/product';
import ProductCardItem from '@/components/Product/ProductCardItem';

interface SwiperProductItemProps {
  product: ProductPreviewType;
  isActive: boolean;
}

export default function SwiperProductItem({ product, isActive }: SwiperProductItemProps) {
  return (
    <div
      className={concatClasses(
        'relative w-[130px] h-48 transition-transform',
        isActive ? 'scale-110' : 'scale-90',
      )}
    >
      <ProductCardItem product={product} />
    </div>
  );
}
