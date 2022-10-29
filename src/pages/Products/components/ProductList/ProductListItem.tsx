import { ProductPreviewType } from '@/@type/product';
import { Ref, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from '@/components/Product';

const ProductListItem = forwardRef(
  ({ product }: { product: ProductPreviewType }, ref: Ref<HTMLDivElement>) => {
    const navigate = useNavigate();
    return (
      <div ref={ref} className="px-2" onClick={() => navigate(`/products/${product.productId}`)}>
        <ProductItem product={product} />
      </div>
    );
  },
);
ProductListItem.displayName = 'MemoizedProductItem';

export default ProductListItem;
