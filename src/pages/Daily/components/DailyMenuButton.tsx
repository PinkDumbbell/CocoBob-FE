import { ReactNode } from 'react';

type DailyMenuButtonProps = {
  onClick: () => void;
  icon: ReactNode;
  label: string;
  main?: boolean;
};

export default function DailyMenuButton({ main, onClick, icon, label }: DailyMenuButtonProps) {
  const labelStyle = main ? 'text-white' : 'text-dark';
  const buttonStyle = main
    ? 'flex-1 rounded-[10px] h-[70px] p-2 shadow-md flex gap-4 items-center bg-primary-main'
    : 'flex-1 rounded-[10px] h-[70px] p-2 shadow-md flex gap-4 items-center bg-primary-brightest';

  return (
    <button type="button" className={buttonStyle} onClick={onClick}>
      <div className="w-12 h-12 flex items-center justify-center rounded-[10px]">{icon}</div>
      <h3 className={labelStyle}>{label}</h3>
    </button>
  );
}
