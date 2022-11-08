import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { closeBottomSheetAction } from '@/store/slices/bottomSheetSlice';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paperAnchorBottom: {
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          paddingTop: 10,
        },
        paper: {
          margin: '0 auto',
          maxWidth: 425,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(51, 51, 51, 0.85);',
          margin: '0 auto',
          maxWidth: 425,
        },
      },
    },
  },
});

const BottomSheetWrapper = styled(SwipeableDrawer)``;

export default function BottomSheet({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  const closeBottomSheet = () => {
    dispatch(closeBottomSheetAction());
  };

  return (
    <ThemeProvider theme={theme}>
      <BottomSheetWrapper
        anchor={'bottom'}
        open={isOpen}
        onClose={closeBottomSheet}
        onOpen={() => {}}
      >
        {children}
      </BottomSheetWrapper>
    </ThemeProvider>
  );
}
