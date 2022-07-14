import { SubmenuLink, EmailLoginContainer, EmailLoginButton } from './LoginSubmenus.style';

interface LoginSubmenusProps {
  join?: boolean;
  findPassword?: boolean;
  loginWithEmail?: boolean;
}
export default function LoginSubmenus({ join, findPassword, loginWithEmail }: LoginSubmenusProps) {
  return (
    <>
      {loginWithEmail && (
        <EmailLoginContainer>
          <EmailLoginButton>이메일로 로그인</EmailLoginButton>
          <p>
            계정이 없으시다면? <SubmenuLink to="/login/email">회원가입 </SubmenuLink>
          </p>
        </EmailLoginContainer>
      )}
      {join && (
        <SubmenuLink to="/join">
          <p>회원가입</p>
        </SubmenuLink>
      )}
      {findPassword && (
        <SubmenuLink to="/find">
          <p>비밀번호 찾기</p>
        </SubmenuLink>
      )}
    </>
  );
}
