import {
  BottomSheetType,
  closeBottomSheetAction,
  selectBottomSheet,
  setBottomSheetAction,
} from '@/store/slices/bottomSheetSlice';
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
