import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useSearchKeyword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOnSearch, setIsOnSearch] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const clearSearch = () => {
    setIsOnSearch(false);
    setSearchKeyword('');
    searchParams.delete('keyword');
    setSearchParams(searchParams);
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
  };

  return {
    clearSearch,
    search,
    isOnSearch,
    searchKeyword,
    openSearchInput,
    onChangeSearchKeyword,
  };
}
