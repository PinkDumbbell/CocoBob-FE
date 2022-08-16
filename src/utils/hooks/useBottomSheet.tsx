import {
  BottomSheetType,
  closeBottomSheetAction,
  selectBottomSheet,
  setBottomSheetAction,
} from '@/store/slices/bottomSheetSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface UseBottomSheetReturn {
  currentBottomSheet: BottomSheetType;
  isBottomSheetOpen: boolean;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
}

export default function useBottomSheet(bottomSheetName: BottomSheetType): UseBottomSheetReturn {
  const dispatch = useDispatch();
  const currentBottomSheet = useSelector(selectBottomSheet);
  const isBottomSheetOpen = currentBottomSheet === bottomSheetName;

  const openBottomSheet = () => {
    dispatch(setBottomSheetAction(bottomSheetName));
  };
  const closeBottomSheet = () => dispatch(closeBottomSheetAction());

  return { currentBottomSheet, isBottomSheetOpen, openBottomSheet, closeBottomSheet };
}
export function useSingleBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const openBottomSheet = () => setIsOpen(true);
  const closeBottomSheet = () => setIsOpen(false);

  return { isOpen, openBottomSheet, closeBottomSheet };
}
