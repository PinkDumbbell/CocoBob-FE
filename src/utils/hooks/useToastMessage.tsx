import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addToastAction, deleteToastAction } from '@/store/slices/toastSlice';
import { v4 as uuidv4 } from 'uuid';

interface ToastProps {
  time?: number;
}

export default function useToastMessage(option?: ToastProps) {
  const location = useLocation();
  const dispatch = useDispatch();
  const openToast = useCallback((content: string, type?: 'success' | 'error') => {
    dispatch(
      addToastAction({ id: uuidv4(), content, time: option?.time ?? 3000, type: type ?? 'error' }),
    );
  }, []);

  useEffect(() => {
    return () => {
      dispatch(deleteToastAction());
    };
  }, [location.pathname]);

  return openToast;
}
