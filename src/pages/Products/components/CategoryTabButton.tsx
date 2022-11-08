import { concatClasses } from '@/utils/libs/concatClasses';

interface CategoryTabButtonProps {
  isOn: boolean;
  name: string;
  onClick: () => void;
}
export default function CategoryTabButton({ isOn, name, onClick }: CategoryTabButtonProps) {
  return (
    <button
      key={name}
      className={concatClasses(
        'h-full flex justify-center items-center flex-1',
        isOn ? ' border-b border-primary text-primary' : '',
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
