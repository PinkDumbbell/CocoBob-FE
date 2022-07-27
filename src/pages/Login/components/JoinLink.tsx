import useBottomSheet from '@/utils/hooks/useBottomSheet';
import { SyntheticEvent } from 'react';
import tw from 'tailwind-styled-components';

interface JoinLinkProps {
  color: 'white' | 'primary';
}
const LinkWrapper = tw.div<JoinLinkProps>`
  flex
  gap-3
  text-sm
  ${({ color }: JoinLinkProps) => (color === 'primary' ? 'text-black' : 'text-white')}
`;
const Link = tw.a<JoinLinkProps>`
  font-bold
  ${({ color }: JoinLinkProps) => (color === 'primary' ? 'text-[#E85354]' : 'text-white')}
`;

export default function JoinLink({ color }: JoinLinkProps) {
  const { openBottomSheet: openSignUpBottomSheet } = useBottomSheet('signUp');

  return (
    <LinkWrapper color={color}>
      <span>계정이 없으시다면?</span>
      <Link
        onClick={(e: SyntheticEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          openSignUpBottomSheet();
        }}
        color={color}
      >
        회원가입
      </Link>
    </LinkWrapper>
  );
}
