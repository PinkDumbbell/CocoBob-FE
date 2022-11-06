import { Context, createContext, ReactNode } from 'react';
import ReactDOM from 'react-dom';

type ConfirmContextType = {
  popupOpened: boolean;
  title?: string | ReactNode;
  contents: string | ReactNode | null;
  promiseInfo?: {
    // eslint-disable-next-line
    resolve?: (value: boolean) => void;
  };
};

const initConfirm: ConfirmContextType = {
  popupOpened: false,
  contents: '',
  promiseInfo: {},
};
export const ConfirmContext: Context<ConfirmContextType> = createContext(initConfirm);

export default function ConfirmPortal({ children }: { children: ReactNode }) {
  const confirmEl = document.getElementById('confirm');
  return confirmEl
    ? ReactDOM.createPortal(
        <ConfirmContext.Provider value={initConfirm}>{children}</ConfirmContext.Provider>,
        confirmEl,
      )
    : null;
}
