import { Link } from 'react-router-dom';
import { concatClasses } from '@/utils/libs/concatClasses';

interface JoinLinkProps {
  color: 'white' | 'primary';
}
export default function JoinLink({ color }: JoinLinkProps) {
  const wrapperClasses = color === 'primary' ? 'text-black' : 'text-white';
  const linkClasses = color === 'primary' ? 'text-[#E85354]' : 'text-white';
  return (
    <div className={concatClasses(wrapperClasses, 'flex gap-3')}>
      <span>계정이 없으시다면?</span>
      <Link to="/join" className={concatClasses(linkClasses, 'font-bold')}>
        회원가입
      </Link>
    </div>
  );
}
