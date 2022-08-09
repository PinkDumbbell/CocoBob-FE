import { useAppSelector } from '@/store/config';
import { addConfirmAction, closeConfirmAction, getToast } from '@/store/slices/toastSlice';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function useToastConfirm(callback = () => {}) {
  const dispatch = useDispatch();
  const { executeCallback } = useAppSelector(getToast);

  const openConfirm = useCallback((confirmMessage: string) => {
    dispatch(addConfirmAction({ confirmMessage }));
  }, []);

  useEffect(() => {
    if (!executeCallback) return;
    callback();
    dispatch(closeConfirmAction());
  }, [executeCallback]);

  return openConfirm;
}
