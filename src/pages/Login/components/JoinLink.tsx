import useBottomSheet from '@/utils/hooks/useBottomSheet';
import { SyntheticEvent } from 'react';
import tw from 'tailwind-styled-components';

interface JoinLinkProps {
  color: 'white' | 'primary';
}
const LinkWrapper = tw.div<JoinLinkProps>`
  text-caption
  flex
  gap-3
  pt-4
`;

const LinkTitle = tw.span<JoinLinkProps>`
${({ color }: JoinLinkProps) => (color === 'primary' ? 'text-secondary' : 'text-white')}
`;

const Link = tw.a<JoinLinkProps>`
  font-bold hover:cursor-pointer
  ${({ color }: JoinLinkProps) => (color === 'primary' ? 'text-primary' : 'text-white')}
`;

export default function JoinLink({ color }: JoinLinkProps) {
  const { openBottomSheet: openSignUpBottomSheet } = useBottomSheet('signUp');

  return (
    <LinkWrapper color={color}>
      <LinkTitle color={color}>계정이 없으시다면?</LinkTitle>
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
