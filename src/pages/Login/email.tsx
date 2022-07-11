import Layout from '@/components/layout/Layout';

import EmailLoginForm from './components/EmailLoginForm';
import LoginSubmenus from './components/LoginSubmenus';

import { PageContainer } from './index.style';

const EmailLoginPage = () => (
  <Layout title="이메일 로그인" canGoBack header>
    <PageContainer>
      <EmailLoginForm />
      <LoginSubmenus join findPassword />
    </PageContainer>
  </Layout>
);

export default EmailLoginPage;
