import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '@/assets/icon/search_btn.png';
import {
  BackButton,
  HeaderWrapper,
  LeftMenuWrapper,
  RightMenuWrapper,
  Title,
} from './Header.style';

interface HeaderProps {
  canGoBack?: boolean;
  onClickGoBack?: () => void;
  title?: string;
  canSearch?: boolean;
}
export default function Header({ canGoBack, onClickGoBack, title, canSearch }: HeaderProps) {
  const navigator = useNavigate();

  const goBackPage = () => navigator(-1);

  return (
    <HeaderWrapper>
      {canGoBack && (
        <LeftMenuWrapper>
          <BackButton onClick={onClickGoBack ?? goBackPage}>Back</BackButton>
        </LeftMenuWrapper>
      )}
      <Title>{title}</Title>
      <RightMenuWrapper>
        {canSearch && (
          <Link to="/search">
            <img src={searchIcon} />
          </Link>
        )}
      </RightMenuWrapper>
    </HeaderWrapper>
  );
}
