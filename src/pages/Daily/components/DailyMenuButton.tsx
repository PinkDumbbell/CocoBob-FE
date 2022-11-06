import { ReactNode } from 'react';

type DailyMenuButtonProps = {
  onClick: () => void;
  icon: ReactNode;
  label: string;
};

export default function DailyMenuButton({ onClick, icon, label }: DailyMenuButtonProps) {
  return (
    <button
      type="button"
      className="flex-1 rounded-[10px] bg-[#fbfdff] h-16 p-2 shadow-md flex gap-4 items-center"
      onClick={onClick}
    >
      <div className="bg-primary-dark w-12 h-12 flex items-center justify-center rounded-[10px]">
        {icon}
      </div>
      <span className="text-black text-md">{label}</span>
    </button>
  );
}
