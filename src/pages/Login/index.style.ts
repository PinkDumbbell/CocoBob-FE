import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  height: calc(100% - 1rem);
  width: calc(100% - 2rem);
  max-width: 500px;
  margin: 0 auto;
  background: radial-gradient(#fabbbc, #f56e6f);
  padding: 0.5rem 1rem;
`;
export const ItemsCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;
export const LogoContainer = styled(ItemsCenter)`
  flex: 1;
  justify-content: center;
`;
export const FormContainer = styled(ItemsCenter)`
  flex: 1;

  & > div {
    margin-bottom: 1.5rem;
  }
`;
export const MockLogo = styled.div`
  width: 269px;
  height: 269px;
  border-radius: 50%;
  background: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 3rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  background: white;
  color: #e85354;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  &:active {
    opacity: 0.8;
  }
`;
