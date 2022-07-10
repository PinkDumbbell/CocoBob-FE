import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  width: 100%;
  height: 3rem;
  position: fixed;
  top: 0;
  left: 0;
  color: #222;
  background: white;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const LeftMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: absolute;
  left: 0.5rem;
`;
const BackButton = styled.button`
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

interface HeaderProps {
  canGoBack?: boolean;
  title: string;
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
