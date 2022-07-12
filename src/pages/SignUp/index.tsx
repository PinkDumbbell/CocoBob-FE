import Layout from '@/components/layout/Layout';
import SignUpForm from './components/SignUpForm';
import { SignUpPageContainer } from './index.style';

export default function SignUpPage() {
  return (
    <Layout title="회원가입" canGoBack header>
      <SignUpPageContainer>
        <SignUpForm />
      </SignUpPageContainer>
    </Layout>
  );
}
