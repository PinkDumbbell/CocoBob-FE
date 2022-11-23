import { useState } from 'react';
import { useToastMessage } from '@/utils/hooks';
import CategoryTab from './CategoryTabButton';

export type CategoryType = '사료' | '간식' | '영양제';

export const useTab = () => {
  const openToast = useToastMessage();
  const [category, setCategory] = useState<CategoryType>('사료');
  const handleCategoryChange = (selectedCategory: CategoryType) => {
    if (selectedCategory !== '사료') {
      openToast('열심히 준비 중이에요!', 'success');
      return;
    }

    setCategory(selectedCategory);
  };

  return {
    category,
    handleCategoryChange,
  };
};

const CategoryTabs = () => {
  const { category, handleCategoryChange } = useTab();
  return (
    <div className="w-full h-auto flex flex-col">
      <div className="w-full flex h-[50px] text-white rounded-t overflow-hidden">
        <CategoryTab
          category="사료"
          changeCategory={handleCategoryChange}
          isOn={category === '사료'}
        />
        <CategoryTab
          category="간식"
          changeCategory={handleCategoryChange}
          isOn={category === '간식'}
        />
        <CategoryTab
          category="영양제"
          changeCategory={handleCategoryChange}
          isOn={category === '영양제'}
        />
      </div>
    </div>
  );
};
export default CategoryTabs;
