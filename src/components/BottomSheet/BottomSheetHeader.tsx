import styled from 'styled-components';

const Wrapper = styled.div`
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 4px;
`;

const Handle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

export default function BottomSheetHeader({ close }: { close: () => void }) {
  return (
    <Wrapper onClick={close}>
      <Handle />
    </Wrapper>
  );
}
