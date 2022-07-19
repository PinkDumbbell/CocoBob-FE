import { closeBottomSheetAction } from '@/store/slices/bottomSheetSlice';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import BottomSheetHeader from './BottomSheetHeader';

const BottomSheetWrapper = styled(SwipeableDrawer)`
  .css-9emuhu-MuiPaper-root-MuiDrawer-paper {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

export default function BottomSheet({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  const closeBottomSheet = () => dispatch(closeBottomSheetAction());

  return (
    <BottomSheetWrapper
      anchor={'bottom'}
      open={isOpen}
      onClose={closeBottomSheet}
      onOpen={() => null}
      style={{ borderTopLeftRadius: 10 }}
    >
      <BottomSheetHeader close={closeBottomSheet} />
      <div className="flex-1 overflow-auto">{children}</div>
    </BottomSheetWrapper>
  );
}
