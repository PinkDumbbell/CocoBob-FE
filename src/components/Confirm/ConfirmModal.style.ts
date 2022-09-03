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
  background: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;
const ConfirmButton = styled.button`
  text-align: center;
  font-size: 0.875rem;
  padding: 0.25rem 1.25rem;
`;
const RejectButton = styled(ConfirmButton)`
  border-radius: 10px;
  border: 1px solid ${({ theme: { colors } }) => colors.text.caption};
`;
const SubmitButton = styled(ConfirmButton)`
  background: ${({ theme: { colors } }) => colors.primary.bright};
  border-radius: 10px;
  color: #fff;
`;

export { Background, ContentsWrapper, RejectButton, SubmitButton };
