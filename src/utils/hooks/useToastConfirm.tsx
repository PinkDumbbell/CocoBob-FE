import { useAppSelector } from '@/store/config';
import {
  addConfirmAction,
  closeConfirmAction,
  getToast,
  ToastType,
} from '@/store/slices/toastSlice';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function useToastConfirm(toastType: ToastType, callback = () => {}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { executeCallback, toastType: NowToastType } = useAppSelector(getToast); // NowToastType 네이밍이 이상해서 수정해야함 추천해주세요

  const openConfirm = useCallback((confirmMessage: string) => {
    dispatch(addConfirmAction({ confirmMessage, toastType }));
  }, []);

  useEffect(() => {
    if (!executeCallback || NowToastType !== toastType) return;
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
