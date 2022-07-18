import { setBottomSheetAction } from '@/store/slices/bottomSheetSlice';
import { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import tw from 'tailwind-styled-components';

interface LinkProps {
  isPrimary: boolean;
}
const LinkWrapper = tw.div<LinkProps>`
  flex
  gap-3
  ${({ isPrimary }: LinkProps) => (isPrimary ? 'text-black' : 'text-white')}
`;
const Link = tw.a<LinkProps>`
  font-bold
  ${({ isPrimary }: LinkProps) => (isPrimary ? 'text-[#E85354]' : 'text-white')}
`;

interface JoinLinkProps {
  color: 'white' | 'primary';
}
export default function JoinLink({ color }: JoinLinkProps) {
  const isPrimary = color === 'primary';

  const dispatch = useDispatch();
  const openSignUpSheet = () => dispatch(setBottomSheetAction('signUp'));

  return (
    <LinkWrapper isPrimary={isPrimary}>
      <span>계정이 없으시다면?</span>
      <Link
        onClick={(e: SyntheticEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          openSignUpSheet();
        }}
        isPrimary={isPrimary}
      >
        회원가입
      </Link>
    </LinkWrapper>
  );
}
