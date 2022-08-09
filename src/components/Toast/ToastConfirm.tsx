import { RootState, useAppDispatch, useAppSelector } from '@/store/config';
import { closeConfirmAction, executeConfirmCallbackAction } from '@/store/slices/toastSlice';

import styled from 'styled-components';

const Background = styled.div`
  z-index: 9999;
  position: fixed;
  background: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;
const ToastMessageItem = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
  width: 330px;
  height: 145px;
  background: #ffffff;
  /* Shadow/default */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-around;
  align-items: center;
  h3 {
    text-align: center;
    font-weight: 500;
    font-size: 15px;
    line-height: 46px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${({ theme: { colors } }) => colors.primary.bright};
  }
`;
const ToastConfirmButton = styled.button`
  text-align: center;
  font-size: 0.875rem;
  padding: 0.25rem 1.25rem;
`;
const CancelButton = styled(ToastConfirmButton)`
  border-radius: 10px;
  border: 1px solid ${({ theme: { colors } }) => colors.text.caption};
`;
const ConfirmButton = styled(ToastConfirmButton)`
  background: ${({ theme: { colors } }) => colors.success};
  border-radius: 10px;
  color: #fff;
`;
export default function ToastConfirm() {
  const dispatch = useAppDispatch();
  const { confirmMessage } = useAppSelector((state: RootState) => state.toast);

  const closeConfirm = () => dispatch(closeConfirmAction());
  const submitConfirm = () => dispatch(executeConfirmCallbackAction());

  return (
    <>
      {confirmMessage !== '' && (
        <Background>
          <ToastMessageItem>
            <h3>{confirmMessage}</h3>
            <div className="flex gap-4">
              <CancelButton type="button" onClick={closeConfirm}>
                취소
              </CancelButton>
              <ConfirmButton type="button" onClick={submitConfirm}>
                확인
              </ConfirmButton>
            </div>
          </ToastMessageItem>
        </Background>
      )}
    </>
  );
}
