import { LinkButton, SubmenusContainer } from './LoginSubmenus.style';

export default function LoginSubmenus() {
  return (
    <SubmenusContainer>
      <LinkButton to="/login/email">
        <p>이메일로 로그인</p>
      </LinkButton>
      <LinkButton to="/signup">
        <p>회원가입</p>
      </LinkButton>
    </SubmenusContainer>
  );
}
