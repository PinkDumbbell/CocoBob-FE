import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import JoinLink from './components/JoinLink';
import SocialLoginForm from './components/SocialLoginForm';
import { PageContainer, LogoContainer, FormContainer, MockLogo } from './index.style';

export default function LoginPage() {
  const navigate = useNavigate();
  const goEmailLoginPage = () => navigate('/login/email');

  return (
    <PageContainer>
      <LogoContainer>
        <MockLogo>로고</MockLogo>
      </LogoContainer>
      <FormContainer>
        <SocialLoginForm />
        <Button
          label="이메일로 로그인"
          backgroundColor="transparent"
          size="full"
          primary="first"
          onClick={goEmailLoginPage}
        />
        <JoinLink color="white" />
      </FormContainer>
    </PageContainer>
  );
}
