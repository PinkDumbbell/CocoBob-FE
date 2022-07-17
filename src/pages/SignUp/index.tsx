// import Layout from '@/components/layout/Layout';
import SignUpForm from '../Login/components/SignUpForm';
import { SignUpPageContainer } from './index.style';

export default function SignUpPage() {
  return (
    <SignUpPageContainer>
      <h2>회원가입</h2>
      <SignUpForm />
    </SignUpPageContainer>
  );
}
