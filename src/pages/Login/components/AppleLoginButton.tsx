import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AppleSignin from 'react-apple-signin-auth';
import axios from '@/utils/api';
import useToastMessage from '@/utils/hooks/useToastMessage';
import { IGenericResponse } from '@/store/api/types';
import { useAppDispatch } from '@/store/config';
import { setCredentials } from '@/store/slices/authSlice';
import {
  AppleAuthorizationType,
  AppleSignInResponse,
  AppleUserType,
  IAuthenticatedUser,
} from '@/@type/user';
import { ButtonWrap } from './AppleLoginButton.style';

const APPLE_LOGIN_ERROR_MESSAGE = '로그인에 실패하였습니다. 다시 시도해주세요';
const AppleLoginButton = () => {
  const openToast = useToastMessage();
  const [login, setLogin] = useState(false);
  const dispatch = useAppDispatch();

  const getCredentialPayload = (code: string, user?: AppleUserType): FormData => {
    const payload = new FormData();

    payload.append('code', code);
    if (user) {
      payload.append('user', JSON.stringify(user));
    }
    return payload;
  };

  const saveCredentials = (credentials: IAuthenticatedUser) => {
    dispatch(setCredentials(credentials));
    setLogin(true);
  };

  const checkCredentials = async (authorization: AppleAuthorizationType, user?: AppleUserType) => {
    const payload = getCredentialPayload(authorization.code, user);
    try {
      const credentialResponse = await axios.post<IGenericResponse<IAuthenticatedUser>>(
        `/v1/users/login/oauth/apple`,
        payload,
      );
      if (!credentialResponse) {
        openToast(APPLE_LOGIN_ERROR_MESSAGE);
        return;
      }
      const {
        data: { data: credentials },
      } = credentialResponse;
      saveCredentials(credentials);
    } catch (error) {
      openToast(APPLE_LOGIN_ERROR_MESSAGE);
    }
  };

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
        onSuccess={async (response: AppleSignInResponse) => {
          const { authorization, user } = response;
          checkCredentials(authorization, user);
        }}
      />
    </ButtonWrap>
  );
};
export default AppleLoginButton;
