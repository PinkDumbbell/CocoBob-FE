import { useAppSelector } from '@/store/config';
import { addConfirmAction, closeConfirmAction, getToast } from '@/store/slices/toastSlice';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function useToastConfirm(callback = () => {}) {
  const location = useLocation();
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

  useEffect(() => {
    return () => {
      dispatch(closeConfirmAction());
    };
  }, [location.pathname]);

  return openConfirm;
}
