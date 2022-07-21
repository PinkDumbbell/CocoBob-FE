import styled from 'styled-components';

export const LoginButton = styled.button<{ disabled: boolean }>`
  background: #e5ab64;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border: none;
  color: white;
  width: 100%;
  border-radius: 8px;
  padding: 0.5rem;

  &:active {
    opacity: 0.8;
  }
`;
export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0.5rem;
  background: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const FormInput = styled.input`
  width: 16rem;
  height: 2rem;
  font-size: 1rem;
  padding: 0;
`;
