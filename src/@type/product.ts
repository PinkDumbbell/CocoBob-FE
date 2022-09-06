type NullableIngredientType = {
  hydrolyticBeef?: boolean | null;
  hydrolyticChicken?: boolean | null;
  hydrolyticDuck?: boolean | null;
  hydrolyticMeat?: boolean | null;
  hydrolyticMutton?: boolean | null;
  hydrolyticSalmon?: boolean | null;
  hydrolyticTurkey?: boolean | null;
  salmon?: boolean | null;
  mutton?: boolean | null;
  beef?: boolean | null;
  chicken?: boolean | null;
  pork?: boolean | null;
  turkey?: boolean | null;
  duck?: boolean | null;
};

type NullableNutritionType = {
  amountOfCalciumPerMcal?: number | null;
  amountOfFatPerMcal?: number | null;
  amountOfFiberPerMcal?: number | null;
  amountOfMineralPerMcal?: number | null;
  amountOfPhosphorusPerMcal?: number | null;
  amountOfProteinPerMcal?: number | null;
  mineral?: number | null;
  moisture?: number | null;
  protein?: number | null;
  calcium?: number | null;
  fat?: number | null;
  fiber?: number | null;
  kcalPerKg?: number | null;
  phosphorus?: number | null;
};
type NullableExtraFilterType = {
  aafco?: boolean | null;
  aged?: boolean | null;
  brand?: string;
  code?: string;
  description?: string;
  keyword?: string;
  growing?: boolean | null;
  obesity?: boolean | null;
  page?: number;
  pregnant?: boolean | null;
  size?: number;
  sort?: 'ASC' | 'DESC';
  sortCriteria?: string;
};

export type NutritionType = NonNullable<NullableNutritionType>;
export type IngredientType = NonNullable<NullableIngredientType>;
export type ExtraFilterType = NonNullable<NullableExtraFilterType>;
export type KeyofNutritionType = keyof NutritionType;
export type KeyofIngredientType = keyof IngredientType;
export type KeyofExtraFilterType = keyof NullableExtraFilterType;

export type SearchFilterType = NullableNutritionType &
  NullableIngredientType &
  NullableExtraFilterType;
export type KeyofSearchFilterType = KeyofExtraFilterType | KeyofNutritionType | KeyofIngredientType;

export type ProductPreviewType = {
  aged: boolean;
  brand: string;
  category: string;
  code: string;
  description: string;
  growing: boolean;
  isAAFCOSatisfied: boolean;
  isLiked: boolean;
  likes: number;
  name: string;
  obesity: boolean;
  pregnant: boolean;
  price: number;
  productId: number;
  thumbnail: string;
};

export type ProductListType = {
  empty: boolean;
  first: boolean;
  last: boolean;
  pageNumber: number;
  pageSize: number;
  productList: ProductPreviewType[];
  totalElements: number;
  totalPages: number;
};

export interface IPetProperties {
  property: string;
}

type ProductPreviewTypeWithoutThumbnail = Exclude<ProductPreviewType, 'thumbnail'>;

export type ProductType = ProductPreviewTypeWithoutThumbnail &
  NutritionType &
  IngredientType & {
    productDetailImage: string;
    productImage: string;
  };

export interface IRelatedProduct {
  names: string[];
}
