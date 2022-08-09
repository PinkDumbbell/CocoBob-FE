import { addToastAction } from '@/store/slices/toastSlice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

interface ToastProps {
  time?: number;
}

export default function useToastMessage(option?: ToastProps) {
  const dispatch = useDispatch();
  const openToast = useCallback((content: string, type?: 'success' | 'error') => {
    dispatch(
      addToastAction({ id: uuidv4(), content, time: option?.time ?? 3000, type: type ?? 'error' }),
    );
  }, []);

  return openToast;
}
