import { useLocation, useNavigate } from 'react-router-dom';
import { NavBar, NavBarItem } from './Footer.style';

const navBarItems = [
  {
    path: '/',
    title: '홈',
  },
  {
    path: '/mypet',
    title: 'My 펫',
  },
  {
    path: '/products',
    title: '상품',
  },
  {
    path: '/report',
    title: '생활보고서',
  },
  {
    path: '/mypage',
    title: '마이페이지',
  },
];
export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const goPage = (path: string) => {
    if (location.pathname === path) return;
    navigate(path);
  };
  return (
    <NavBar>
      {navBarItems.map((navBarItem) => (
        <NavBarItem key={navBarItem.path}>
          <button onClick={() => goPage(navBarItem.path)}>{navBarItem.title}</button>
        </NavBarItem>
      ))}
    </NavBar>
  );
}
