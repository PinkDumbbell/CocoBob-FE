import { useNavigate } from 'react-router-dom';
import { BackButton, HeaderWrapper, LeftMenuWrapper, Title } from './Header.style';

interface HeaderProps {
  canGoBack?: boolean;
  onClickGoBack?: () => void;
  title?: string;
}
export default function Header({ canGoBack, onClickGoBack, title }: HeaderProps) {
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
    </HeaderWrapper>
  );
}
