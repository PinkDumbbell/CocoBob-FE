import { ReactComponent as FilterIcon } from '@/assets/icon/filter_icon.svg';
import { ReactComponent as ResetIcon } from '@/assets/icon/refresh_icon.svg';

import { useAppDispatch } from '@/store/config';
import { resetFilter } from '@/store/slices/productsSlice';
import { ReactNode } from 'react';

type SubmenusProps = {
  openFilterModal: () => void;
  hasFilter: boolean;
};

type SubmenuButtonProps = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
};
const SubmenuButton = ({ label, icon, onClick }: SubmenuButtonProps) => {
  return (
    <button
      className="rounded-sm w-14 h-full flex items-center gap-1 text-xs justify-center text-black font-semibold"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const Submenus = ({ openFilterModal, hasFilter }: SubmenusProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-primary-max w-full px-3 flex items-center justify-between rounded-b overflow-hidden">
      <div className="text-caption flex gap-3 h-7 w-full items-center">
        <SubmenuButton
          label="필터"
          icon={<FilterIcon className="h-5" />}
          onClick={openFilterModal}
        />
        {hasFilter && (
          <>
            <div className="h-4 border-l-2 border-secondary-brighter m-1">
              {/* Divider Element */}
            </div>
            <SubmenuButton
              label="초기화"
              icon={<ResetIcon className="h-4" />}
              onClick={() => {
                dispatch(resetFilter());
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default Submenus;
