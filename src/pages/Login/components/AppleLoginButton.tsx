import AppleSignin from 'react-apple-signin-auth';
import styled from 'styled-components';
import axios from '@/utils/api';
import { IAuthenticatedUser } from '@/@type/user';
import { IGenericResponse } from '@/store/api/types';
import { useAppDispatch } from '@/store/config';
import { setCredentials } from '@/store/slices/authSlice';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useToastMessage from '@/utils/hooks/useToastMessage';

const ButtonWrap = styled.div`
  width: 100%;
  button {
    width: 100%;
    border: none;
    border-radius: 10px;
    border: none;
    box-shadow: 2px 2px 10px rgb(0 0 0 / 15%);
    line-height: 29px;
    font-size: 20px;
    text-align: center;
    width: 100%;
  }
`;
const AppleLoginButton = () => {
  const openToast = useToastMessage();
  const [login, setLogin] = useState(false);
  const dispatch = useAppDispatch();

  return login ? (
    <Navigate to="/" replace />
  ) : (
    <ButtonWrap>
      <AppleSignin
        authOptions={{
          clientId: 'us.petalog.services',
          scope: 'email name',
          redirectURI: 'https://petalog.us/auth/apple/callback',
          usePopup: true,
          state: 'state',
        }}
        uiType="dark"
        className="apple-auth-btn"
        noDefaultStyle={false}
        buttonExtraChildren="Apple로 로그인"
        onError={() => openToast('로그인 중 에러가 발생하였습니다. 잠시 후 다시 시도해주세요')}
        onSuccess={async (response: any) => {
          console.log('after popup', response);
          const { authorization, user } = response as {
            authorization: { code: string; id_token: string };
            user?: { email: string; name: { firstName: string; lastName: string } };
          };
          const payload = new FormData();

          payload.append('code', authorization.code);
          if (user) {
            payload.append('user', JSON.stringify(user));
          }
          const {
            data: { data },
          } = await axios
            .post<IGenericResponse<IAuthenticatedUser>>(`/users/login/oauth/apple`, payload)
            .catch(() => openToast('로그인 중 에러가 발생하였습니다. 잠시 후 다시 시도해주세요'));
          if (data.userId) {
            dispatch(setCredentials(data));
            setLogin(true);
          }
        }}
      />
    </ButtonWrap>
  );
};
export default AppleLoginButton;
