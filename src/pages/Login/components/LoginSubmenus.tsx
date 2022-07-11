import { SubmenuLink } from './LoginSubmenus.style';

interface LoginSubmenusProps {
  join?: boolean;
  findPassword?: boolean;
  loginWithEmail?: boolean;
}
export default function LoginSubmenus({ join, findPassword, loginWithEmail }: LoginSubmenusProps) {
  return (
    <div>
      {loginWithEmail && (
        <SubmenuLink to="/login/email">
          <p>이메일로 로그인</p>
        </SubmenuLink>
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
    </div>
  );
}
