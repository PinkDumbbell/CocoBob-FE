import { createContext, ReactNode } from 'react';
import ReactDOM from 'react-dom';

type SelectModalContextType = {
  menus: string[] | null;
  promise?: {
    // eslint-disable-next-line
    resolve?: (value: string) => void;
  };
};

const initSelectModal: SelectModalContextType = {
  promise: {},
  menus: [],
};
export const SelectModalContext = createContext(initSelectModal);

export default function SelectModalPortal({ children }: { children: ReactNode }) {
  const selectModalEl = document.getElementById('select');

  return selectModalEl
    ? ReactDOM.createPortal(
        <SelectModalContext.Provider value={initSelectModal}>
          {children}
        </SelectModalContext.Provider>,
        selectModalEl,
      )
    : null;
}
