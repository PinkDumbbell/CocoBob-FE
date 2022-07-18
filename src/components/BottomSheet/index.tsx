import { closeBottomSheetAction } from '@/store/slices/bottomSheetSlice';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
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
  box-shadow: ${({ isOpen }) => (isOpen ? '0px 0px 10px rgba(0, 0, 0, 0.6)' : '')};
  height: 70vh;
  transform: translateY(${({ isOpen }) => (isOpen ? '0px' : '100%')});
  transition: transform 200ms ease-out;
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
    <Wrapper isOpen={isOpen}>
      <BottomSheetHeader close={closeBottomSheet} />
      {children}
    </Wrapper>
  );
}
