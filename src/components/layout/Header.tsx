import { useNavigate } from 'react-router-dom';
import { BackButton, HeaderWrapper, LeftMenuWrapper, Title } from './Header.style';

interface HeaderProps {
  canGoBack?: boolean;
  title?: string;
}
export default function Header({ canGoBack, title }: HeaderProps) {
  const navigator = useNavigate();

  const goBackPage = () => navigator(-1);

  return (
    <HeaderWrapper>
      {canGoBack && (
        <LeftMenuWrapper>
          <BackButton onClick={goBackPage}>Back</BackButton>
        </LeftMenuWrapper>
      )}
      <Title>{title}</Title>
    </HeaderWrapper>
  );
}
