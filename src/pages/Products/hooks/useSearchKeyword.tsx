import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useSearchKeyword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOnSearch, setIsOnSearch] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const keyword = searchParams.get('keyword');
    setSearchKeyword(keyword ?? '');
  }, []);
  const clearSearch = () => {
    setIsOnSearch(false);
    setSearchKeyword('');
    if (searchParams.get('keyword')) {
      searchParams.delete('keyword');
      setSearchParams(searchParams);
    }
  };

  const search = (keyword?: string) => {
    searchParams.set('keyword', keyword ?? searchKeyword);
    setSearchParams(searchParams);
    setIsOnSearch(false);
  };

  const openSearchInput = () => {
    setIsOnSearch(true);
  };
  const onChangeSearchKeyword = (value: string) => {
    setSearchKeyword(value);
    setIsOnSearch(true);
  };

  return {
    clearSearch,
    search,
    isOnSearch,
    searchKeyword,
    setSearchKeyword,
    openSearchInput,
    onChangeSearchKeyword,
  };
}
