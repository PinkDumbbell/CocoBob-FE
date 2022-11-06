export type FilterPropertiesType = {
  name: string;
  filterValue: string;
};

export type FilterType = 'grainType' | 'ingredients' | 'alergyIngredient';

export const grainType: FilterPropertiesType[] = [
  {
    name: '건식',
    filterValue: '001001',
  },
  {
    name: '습식/화식',
    filterValue: '001002',
  },
  {
    name: '소프트',
    filterValue: '001003',
  },
];

export const ingredients: FilterPropertiesType[] = [
  {
    name: '소고기',
    filterValue: 'beef',
  },
  {
    name: '돼지고기',
    filterValue: 'pork',
  },
  {
    name: '닭고기',
    filterValue: 'chicken',
  },
  {
    name: '연어',
    filterValue: 'salmon',
  },
  {
    name: '칠면조',
    filterValue: 'turkey',
  },
  {
    name: '양고기',
    filterValue: 'mutton',
  },
  {
    name: '오리고기',
    filterValue: 'duck',
  },
  {
    name: '가수분해 소고기',
    filterValue: 'hydrolyticBeef',
  },
  {
    name: '가수분해 돼지고기',
    filterValue: 'hydrolyticPork',
  },
  {
    name: '가수분해 닭고기',
    filterValue: 'hydrolyticChicken',
  },
  {
    name: '가수분해 연어',
    filterValue: 'hydrolyticSalmon',
  },
  {
    name: '가수분해 칠면조',
    filterValue: 'hydrolyticTurkey',
  },
  {
    name: '가수분해 양고기',
    filterValue: 'hydrolyticMutton',
  },
  {
    name: '가수분해 오리고기',
    filterValue: 'hydrolyticDuck',
  },
];

export const allFilters = {
  brands: {
    name: '브랜드',
    items: ['로얄캐닌', '보스독', '하림'],
  },
  ingredients: {
    name: '포함 원재료',
    items: ingredients,
  },
  allergyIngredient: {
    name: '제외하고 싶은 원재료',
    items: ingredients,
  },
};
export const filterKeys = Array.from(Object.keys(allFilters)) as FilterType[];
