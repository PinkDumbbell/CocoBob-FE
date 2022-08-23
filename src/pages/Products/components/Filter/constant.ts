export type FilterPropertiesType = {
  name: string;
  filterValue: string;
};

export type FilterType = 'grainType' | 'ingredients';

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
    filterValue: 'hydrolytic_beef',
  },
  {
    name: '가수분해 돼지고기',
    filterValue: 'hydrolytic_pork',
  },
  {
    name: '가수분해 닭고기',
    filterValue: 'hydrolytic_chicken',
  },
  {
    name: '가수분해 연어',
    filterValue: 'hydrolytic_salmon',
  },
  {
    name: '가수분해 칠면조',
    filterValue: 'hydrolytic_turkey',
  },
  {
    name: '가수분해 양고기',
    filterValue: 'hydrolytic_mutton',
  },
  {
    name: '가수분해 오리고기',
    filterValue: 'hydrolytic_duck',
  },
];

export const allFilters = {
  grainType: {
    name: '알갱이 타입',
    items: grainType,
  },
  ingredients: {
    name: '원재료',
    items: ingredients,
  },
};
export const filterKeys = Array.from(Object.keys(allFilters)) as FilterType[];
