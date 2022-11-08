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

export const LoginButton = tw.button`
  w-full
  h-[47px]
  flex
  justify-center
  items-center

  text-base
  font-bold

  border-none
  bg-white
  shadow-[2px_2px_10px_rgba(0, 0, 0, 0.15)]
  rounded-xl
  text-black

  hover:animate-push
  active:animate-afterpush
`;
export const SheetContent = tw.div`
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
