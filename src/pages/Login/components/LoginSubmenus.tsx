import { LinkButton } from './LoginSubmenus.style';

interface LoginSubmenusProps {
  join?: boolean;
  findPassword?: boolean;
  loginWithEmail?: boolean;
}
export default function LoginSubmenus({ join, findPassword, loginWithEmail }: LoginSubmenusProps) {
  return (
    <div>
      {loginWithEmail && (
        <LinkButton to="/login/email">
          <p>이메일로 로그인</p>
        </LinkButton>
      )}
      {join && (
        <LinkButton to="/join">
          <p>회원가입</p>
        </LinkButton>
      )}
      {findPassword && (
        <LinkButton to="/find">
          <p>비밀번호 찾기</p>
        </LinkButton>
      )}
    </div>
  );
}
