import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LoginButton } from '../index.style';

export const EmailLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  color: #fefefe;
  width: 100%;
  font-size: 0.925rem;
`;
export const EmailLoginButton = styled(LoginButton)`
  background: transparent;
  color: white;
  border: 1px solid #fefefe;
  filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.15));
`;
export const SubmenuLink = styled(Link)`
  cursor: pointer;
  font-weight: 600;
  color: #fefefe;
  display: inline-block;
  padding: 0 0.5rem;
  text-decoration: none;
`;
