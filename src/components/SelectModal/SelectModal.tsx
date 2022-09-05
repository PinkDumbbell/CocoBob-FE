import { concatClasses } from '@/utils/libs/concatClasses';
import { useAppDispatch, useAppSelector } from '@/store/config';
import { isSelectModalOpened, setSelectModalOpened } from '@/store/slices/selectModalSlice';
import { useContext } from 'react';
import { SelectModalContext } from './SelectModalPortal';

function SelectItem({
  text,
  isCancel = false,
  onClick,
  rounded = false,
}: {
  text: string;
  isCancel?: boolean;
  rounded?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={concatClasses(
        'w-full p-4 text-center bg-[#fefefe] border-b last-of-type:border-none',
        isCancel ? 'text-red-500' : 'text-black',
        rounded ? 'rounded-[10px]' : '',
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
export default function SelectModal() {
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector(isSelectModalOpened);
  const { menus, promise } = useContext(SelectModalContext);

  const closeModal = () => {
    dispatch(setSelectModalOpened(false));
  };

  const handleReject = () => {
    closeModal();
    if (!promise?.resolve) return;
    promise.resolve('');
  };
  const handleResolve = (menu: string) => {
    closeModal();
    if (!promise?.resolve) return;
    promise.resolve(menu);
  };

  if (!isOpened) return null;
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 bg-[#00000030] w-full h-full mx-auto max-w-[425px] z-[9999] flex flex-col justify-end gap-4 p-4">
      <div className="flex flex-col w-full rounded-[10px] overflow-hidden">
        {menus?.map((menu) => (
          <SelectItem key={menu} text={menu} onClick={() => handleResolve(menu)} />
        ))}
      </div>
      <SelectItem text="취소" isCancel onClick={handleReject} rounded />
    </div>
  );
}
