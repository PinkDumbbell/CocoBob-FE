import { RootState, useAppDispatch, useAppSelector } from '@/store/config';
import { closeConfirmAction, executeConfirmCallbackAction } from '@/store/slices/toastSlice';

import styled from 'styled-components';

const ToastMessageItem = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
  width: 358px;
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
    font-size: 13px;
    line-height: 46px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${({ theme: { colors } }) => colors.primary.bright};
  }
`;
export default function ToastConfirm() {
  const dispatch = useAppDispatch();
  const { confirmMessage } = useAppSelector((state: RootState) => state.toast);

  const closeConfirm = () => dispatch(closeConfirmAction());
  const submitConfirm = () => dispatch(executeConfirmCallbackAction());

  return (
    <>
      {confirmMessage !== '' && (
        <ToastMessageItem>
          <h3>{confirmMessage}</h3>
          <div className="flex gap-4">
            <button type="button" onClick={closeConfirm}>
              취소
            </button>
            <button type="button" onClick={submitConfirm}>
              확인
            </button>
          </div>
        </ToastMessageItem>
      )}
    </>
  );
}
