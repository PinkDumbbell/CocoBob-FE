import { EmailLoginLink } from './LoginSubmenus.style';

export default function LoginSubmenus() {
  return (
    <div>
      <EmailLoginLink to="/login/email">
        <p>이메일로 로그인</p>
      </EmailLoginLink>
    </div>
  );
}
