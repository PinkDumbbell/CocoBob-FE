import styled from 'styled-components';
import { LoginButton } from '../index.style';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;
export const SocialLoginButton = styled(LoginButton)`
  &.kakao {
    background-color: #f9df4a;
    color: #391b1b;
  }
  &.apple {
    background-color: #e2635e;
    color: #fff;
  }
`;
