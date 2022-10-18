/* eslint-disable no-use-before-define */
import { SelectModalContext } from '@/components/SelectModal/SelectModalPortal';
import { useAppDispatch } from '@/store/config';
import { setSelectModalOpened } from '@/store/slices/selectModalSlice';
import { useContext } from 'react';

export default function useSelectModal() {
  const dispatch = useAppDispatch();
  const context = useContext(SelectModalContext);

  function onKeyDownESC(event: KeyboardEvent) {
    if (event.key !== 'Escape') return;
    closeModal();
  }

  function closeModal() {
    context.menus = [];
    context.promise = {};
    dispatch(setSelectModalOpened(false));
    window.removeEventListener('keydown', onKeyDownESC);
  }

  function openSelectModal(menus: string[]) {
    context.menus = menus;
    window.addEventListener('keydown', onKeyDownESC);
    return new Promise((resolve) => {
      context.promise = {
        resolve,
      };
      dispatch(setSelectModalOpened(true));
    });
  }

  return [openSelectModal, closeModal];
}
