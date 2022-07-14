import LoginSubmenus from './components/LoginSubmenus';
import SocialLoginForm from './components/SocialLoginForm';
import { PageContainer, LogoContainer, FormContainer, MockLogo } from './index.style';

export default function LoginPage() {
  return (
    <PageContainer>
      <LogoContainer>
        <MockLogo>로고</MockLogo>
      </LogoContainer>
      <FormContainer>
        <SocialLoginForm />
        <LoginSubmenus loginWithEmail />
      </FormContainer>
    </PageContainer>
  );
}
