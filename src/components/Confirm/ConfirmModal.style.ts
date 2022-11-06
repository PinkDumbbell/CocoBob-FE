import styled from 'styled-components';

const Background = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  background: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  max-width: 425px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentsWrapper = styled.div`
  max-height: 75%;
  height: fit-content;
  width: 80%;
  border-radius: 10px;
  background: #fdfdfd;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;
const ConfirmButton = styled.button`
  font-size: 1rem;
  height: 2.5rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RejectButton = styled(ConfirmButton)`
  border: 1px solid ${({ theme: { colors } }) => colors.text.caption};
  font-weight: 400;
`;
const SubmitButton = styled(ConfirmButton)`
  background: ${({ theme: { colors } }) => colors.primary.dark};
  border: 1px solid ${({ theme: { colors } }) => colors.primary.dark};
  color: #fff;
  font-weight: 600;
`;

export { Background, ContentsWrapper, RejectButton, SubmitButton };
