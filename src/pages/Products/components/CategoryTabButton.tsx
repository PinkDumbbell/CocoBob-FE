import { concatClasses } from '@/utils/libs/concatClasses';
import { CategoryType } from './CategoryTabs';

interface CategoryTabButtonProps {
  category: CategoryType;
  isOn: boolean;
  // eslint-disable-next-line
  changeCategory: (category: CategoryType) => void;
}

const CategoryTab = ({ category, isOn, changeCategory }: CategoryTabButtonProps) => {
  return (
    <button
      type="button"
      className={concatClasses(
        'flex items-center justify-center flex-1 h-full w-auto',
        isOn ? 'font-medium bg-primary' : 'bg-primary-lightbright',
      )}
      onClick={() => changeCategory(category)}
    >
      {category}
    </button>
  );
};
export default CategoryTab;
