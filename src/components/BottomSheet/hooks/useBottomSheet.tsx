import { ReactNode, useState } from 'react';

import { SwipeableDrawer, createTheme, ThemeProvider } from '@mui/material';

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

export default function useBottomSheet() {
  const [isOpened, setIsOpened] = useState(false);
  const openBottomSheet = () => {
    setIsOpened(true);
  };
  const closeBottomSheet = () => {
    setIsOpened(false);
  };

  const BottomSheet = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={theme}>
      <SwipeableDrawer
        onClose={closeBottomSheet}
        onOpen={openBottomSheet}
        anchor="bottom"
        open={isOpened}
      >
        {children}
      </SwipeableDrawer>
    </ThemeProvider>
  );

  return { isOpened, BottomSheet, openBottomSheet, closeBottomSheet };
}
