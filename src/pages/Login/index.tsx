import LoginSubmenus from './components/LoginSubmenus';
import SocialLoginForm from './components/SocialLoginForm';
import { PageContainer } from './index.style';

export default function LoginPage() {
  return (
    <PageContainer>
      <h1>로그인</h1>
      <SocialLoginForm />
      <LoginSubmenus />
    </PageContainer>
  );
}
