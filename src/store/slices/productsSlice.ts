import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';

export type CategoryType = '사료' | '간식' | '영양제';
export type SearchFilterType = {
  aafco?: boolean;
  brands?: string[];
  codes?: string[];
  ingredient?: string[];
  allergyIngredient?: string[];
  keyword?: string;
  size: number;
};
export type ProductSearch = {
  page: number;
  filters: SearchFilterType;
  currentTab: CategoryType;
};

const initialState: ProductSearch = {
  currentTab: '사료',
  filters: {
    size: 20,
  },
  page: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(
      state,
      action: PayloadAction<{
        page: number;
        aafco?: boolean;
        brands?: string[];
        ingredient?: string[];
        allergyIngredient?: string[];
      }>,
    ) {
      const { page, ...filters } = action.payload;
      state.page = page;
      state.filters = { ...state.filters, ...filters };
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
    resetFilter(state) {
      state.filters = initialState.filters;
      state.page = 0;
    },
    resetPage(state) {
      state.page = 0;
    },
    increasePage(state) {
      state.page += 1;
    },
  },
});

export const { addFilter, setFilters, resetFilter, resetPage, increasePage } =
  productsSlice.actions;
export const getCurrentFilters = (state: RootState) => state.products.filters;
export const getPage = (state: RootState) => state.products.page;
export default productsSlice.reducer;
