import { ReactNode } from 'react';
import styled from 'styled-components';
import BottomSheetHeader from './BottomSheetHeader';

const Wrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: 70vh;
  transform: translateY(${({ isOpen }) => (isOpen ? '0px' : '100%')});
  transition: transform 200ms ease-out;
`;

export default function BottomSheet({
  isOpen,
  close,
  children,
}: {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
}) {
  return (
    <Wrapper isOpen={isOpen}>
      <BottomSheetHeader close={close} />
      {children}
    </Wrapper>
  );
}
