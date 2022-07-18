import styled from 'styled-components';
import tw from 'tailwind-styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: radial-gradient(#fabbbc, #f56e6f);
  padding: 1rem;
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

export const SheetContent = tw.div`
  w-full 
  h-full 
  py-2 
  px-2 
  flex 
  flex-col 
  items-center 
  justify-between
`;
export const FormWrapper = tw.div`
  w-full 
  flex 
  flex-col 
  items-center 
  gap-2 
  bg-white
  `;
export const SubmenuWrapper = tw.div`border-t 
border-gray-200 
  w-full 
  flex 
  flex-col 
  items-center 
  py-4 
  gap-4
`;

export const SocialLoginButtonWrapper = tw.div`
  flex 
  justify-center 
  items-center 
  gap-4
`;
export const SocialLoginButton = tw.button`
  rounded-full 
  bg-gray-300 
  w-12 
  h-12
`;
