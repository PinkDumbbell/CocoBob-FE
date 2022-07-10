import Layout from '@/components/Layout';

import EmailLoginForm from './components/EmailLoginForm';

import { PageContainer, ItemsCenter } from './index.style';

const EmailLoginPage = () => (
  <Layout title="이메일 로그인" canGoBack>
    <PageContainer>
      <ItemsCenter>
        <EmailLoginForm />
      </ItemsCenter>
    </PageContainer>
  </Layout>
);

export default EmailLoginPage;
