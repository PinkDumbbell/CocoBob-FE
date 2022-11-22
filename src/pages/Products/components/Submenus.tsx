import { ReactComponent as FilterIcon } from '@/assets/icon/filter_icon.svg';
import { ReactComponent as ResetIcon } from '@/assets/icon/refresh_icon.svg';

import { useAppDispatch } from '@/store/config';
import { resetFilter } from '@/store/slices/productsSlice';

type SubmenusProps = {
  openFilterModal: () => void;
  hasFilter: boolean;
};

const Submenus = ({ openFilterModal, hasFilter }: SubmenusProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-primary-lightdark w-full px-3 flex items-center justify-between rounded-b overflow-hidden">
      <div className="text-caption flex gap-3 h-7 w-full">
        <button
          className="rounded-sm text-white w-14 h-full flex items-center gap-1 text-xs justify-center"
          onClick={openFilterModal}
        >
          <FilterIcon className="h-5" />
          <span>필터</span>
        </button>
        {hasFilter && (
          <button
            className="border w-20 h-full flex items-center gap-1 text-xs justify-center border-none text-white"
            onClick={() => {
              dispatch(resetFilter());
            }}
          >
            <ResetIcon className="h-4" />
            초기화
          </button>
        )}
      </div>
    </div>
  );
};
export default Submenus;
