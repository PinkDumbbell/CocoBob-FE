import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';
// import { RootState } from '../config';

export type CategoryType = '사료' | '간식' | '영양제';
export type SearchFilterType = {
  aafco?: boolean;
  brands?: string[];
  codes?: string[];
  ingredient?: string[];
  keyword?: string;
  page: number;
};
export type ProductSearch = {
  searchResults: any[];
  filters: SearchFilterType;
  currentTab: CategoryType;
};

const initialState: ProductSearch = {
  currentTab: '사료',
  filters: {
    page: 1,
  },
  searchResults: [],
};

const productsSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    setFilters(
      state,
      action: PayloadAction<{ aafco?: boolean; brands?: string[]; ingredient?: string[] }>,
    ) {
      state.filters = { ...state.filters, ...action.payload };
    },
    addFilter(
      state,
      action: PayloadAction<{
        key: keyof SearchFilterType;
        value: any;
      }>,
    ) {
      const { key, value } = action.payload;
      state.filters = { ...state.filters, [key]: value };
    },
    setProductList(state, action: PayloadAction<any[]>) {
      state.searchResults = action.payload;
    },
  },
});

export const { addFilter, setFilters, setProductList } = productsSlice.actions;
export const getCurrentFilters = (state: RootState) => state.products.filters;
export default productsSlice.reducer;
