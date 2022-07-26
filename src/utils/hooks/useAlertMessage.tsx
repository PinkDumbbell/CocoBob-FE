import { useRef, useState } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';

interface AlertProps {
  time: number;
}
// const Container = styled.div`
// position: absolute;
//   top: 0px;
//   .open {
//     opacity: 1;
//     transition: all 0.5s;
//   }
//   .close {
//     opacity: 0;
//   }
// `;
const AlertMessageContainer = styled.div<{ isOpen: boolean }>`
  width: 358px;
  height: 46px;
  background: #e85354;
  position: absolute;
  top: 0px;
  /* Shadow/default */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 1s;
  h3 {
    text-align: center;
    font-weight: 500;
    font-size: 13px;
    line-height: 46px;
    letter-spacing: -0.02em;
    text-align: center;
    color: #ffffff;
  }
`;

export default function useAlertMessage(option: AlertProps) {
  const { time } = option;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const timeoutId = useRef<null | ReturnType<typeof setTimeout>>(null);
  const openAlert = useCallback(
    (data: string) => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        setIsOpen(false);
      }, time);
      setMessage(data);
      setIsOpen(true);
    },
    [message],
  );

  function AlertMessage() {
    return (
      <AlertMessageContainer isOpen={isOpen} className={isOpen ? 'open' : 'close'}>
        <h3>{message}</h3>
      </AlertMessageContainer>
    );
  }
  return { AlertMessage, openAlert };
}
