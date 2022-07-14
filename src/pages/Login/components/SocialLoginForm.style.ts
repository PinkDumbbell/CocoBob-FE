import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;
export const SocialLoginButton = styled.button`
  width: 100%;
  height: 3rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  background: white;
  color: #222;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 8%);
  border-radius: 8px;

  &.kakao {
    background-color: #f9df4a;
    color: #391b1b;
  }
  &.apple {
    background-color: #e2635e;
    color: #fff;
  }

  &:active {
    opacity: 0.8;
  }
`;
