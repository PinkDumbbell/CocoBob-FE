import LoginSubmenus from './components/LoginSubmenus';
import SocialLoginForm from './components/SocialLoginForm';
import { ItemsCenter, PageContainer } from './index.style';

export default function LoginPage() {
  return (
    <PageContainer>
      <h1>코코밥</h1>
      <ItemsCenter>
        <SocialLoginForm />
        <LoginSubmenus loginWithEmail />
      </ItemsCenter>
    </PageContainer>
  );
}
