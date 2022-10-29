import { ProductPreviewType } from '@/@type/product';
import { Ref, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import ProductItem from '@/components/Product';

const ProductListItem = forwardRef(
  ({ product }: { product: ProductPreviewType }, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className="px-2">
        <Link to={`/products/${product.productId}`}>
          <ProductItem product={product} />
        </Link>
      </div>
    );
  },
);
ProductListItem.displayName = 'MemoizedProductItem';

export default ProductListItem;
