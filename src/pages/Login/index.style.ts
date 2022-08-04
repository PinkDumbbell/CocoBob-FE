import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { theme } from '@/styles/theme';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  // background: radial-gradient(
  //   at 10% 15%,
  //   ${theme.colors.primary.light},
  //   ${theme.colors.primary.main}
  // );

  background: ${theme.colors.primary.bright};
`;
export const ItemsCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;
export const LogoContainer = styled(ItemsCenter)`
  flex: 2;
  justify-content: center;
  width: 800px;
  height: 800px;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  border-bottom: 1px solid white;
  background: white;
`;
export const FormContainer = styled(ItemsCenter)`
  flex: 1;
  gap: 0;
  padding: 1rem;
  & > button {
    margin-top: 45px;
  }
`;
export const MockLogo = styled.div`
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

export const LoginButton = styled.button`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  height: 45px;

  border: none;
  background: white;
  color: ${({ theme: { colors } }) => colors.text.default};
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
