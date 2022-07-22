import styled from 'styled-components';
import tw from 'tailwind-styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: radial-gradient(at 30% 20%, #fabbbc, #f56e6f);
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
  width: 120px;
  height: 120px;
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
const SheetContentBg = styled.div`
  background: linear-gradient(133.79deg, #fffdfd 23.76%, #ffeeee 136.99%);
`;
export const SheetContent = tw(SheetContentBg)`
  w-full 
  h-full 
  py-2 
  px-3 
  flex 
  flex-col 
  items-center 
  justify-between
  gap-10
`;
export const FormWrapper = tw.div`
  w-full 
  flex 
  flex-col 
  items-center 
  gap-4 
  mb-8
  `;

const BorderGray = styled.div`
  border-top: 1px solid #ededed;
`;
export const SubmenuWrapper = tw(BorderGray)`
  border-t 
  w-full 
  flex 
  flex-col 
  items-center 
  py-4 
  gap-7
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
