import styled from 'styled-components';
import { LoginButton } from '../index.style';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;
export const SocialLoginButton = styled(LoginButton)`
  &.kakao {
    background-color: #fae100;
    color: #391b1b;
  }
  &.apple {
    background-color: #333333;
    color: #fefefe;
  }
`;
