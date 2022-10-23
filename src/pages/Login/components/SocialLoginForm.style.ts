import styled from 'styled-components';
import { LoginButton } from '../index.style';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const SocialLoginButton = styled(LoginButton)`
  gap: 1.2rem;

  &#btn-kakao-login {
    background-color: #fee500;
    color: #000000;
  }
  &#btn-google-login span {
    font-face: Roboto;
  }
`;
