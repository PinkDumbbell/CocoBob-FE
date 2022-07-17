import { concatClasses } from '@/utils/libs/concatClasses';

interface JoinLinkProps {
  color: 'white' | 'primary';
  openSignUpSheet: () => void;
}
export default function JoinLink({ color, openSignUpSheet }: JoinLinkProps) {
  const wrapperClasses = color === 'primary' ? 'text-black' : 'text-white';
  const linkClasses = color === 'primary' ? 'text-[#E85354]' : 'text-white';
  return (
    <div className={concatClasses(wrapperClasses, 'flex gap-3')}>
      <span>계정이 없으시다면?</span>
      <a
        onClick={(e) => {
          e.preventDefault();
          openSignUpSheet();
        }}
        className={concatClasses(linkClasses, 'font-bold')}
      >
        회원가입
      </a>
    </div>
  );
}
