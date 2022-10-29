import { useState, useEffect } from 'react';
import { useLazyGetProductQuery } from '@/store/api/productApi';
import { useAppDispatch, useAppSelector } from '@/store/config';
import {
  getCurrentFilters,
  getPage,
  increasePage,
  resetFilter,
} from '@/store/slices/productsSlice';
import { useToastMessage } from '@/utils/hooks';
import { ProductPreviewType } from '@/@type/product';

export default function useFetchProductData(inView: boolean) {
  const toast = useToastMessage();
  const dispatch = useAppDispatch();
  const [init, setInit] = useState(false);
  const filters = useAppSelector(getCurrentFilters);
  const page = useAppSelector(getPage);
  const [products, setProducts] = useState<ProductPreviewType[]>([]);

  const [getProducts, { data: searchResult, isLoading, isSuccess, isError }] =
    useLazyGetProductQuery();

  const clearProducts = () => {
    setProducts([]);
  };

  const isLastData = searchResult?.last;

  useEffect(() => {
    setInit(true);
    return () => {
      dispatch(resetFilter());
    };
  }, []);

  useEffect(() => {
    if (!inView || !init) {
      return;
    }
    dispatch(increasePage());
  }, [inView]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    getProducts({ ...filters, page });
  }, [page, filters, isLoading]);

  useEffect(() => {
    if (!isSuccess || !searchResult?.productList) {
      return;
    }
    if (page === 0) {
      setProducts(searchResult.productList);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...searchResult.productList]);
    }
  }, [filters, isSuccess, searchResult?.productList]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    toast('상품을 불러오는 중 문제가 발생하였습니다.');
  }, [isError]);

  return {
    products,
    isLoading,
    isError,
    isLastData,
    clearProducts,
  };
}
