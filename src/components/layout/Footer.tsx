import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as FoodIcon } from '@/assets/icon/navbar_food.svg';
import { ReactComponent as DailyIcon } from '@/assets/icon/navbar_daily.svg';
import { ReactComponent as ProfileIcon } from '@/assets/icon/navbar_profile.svg';
import { ReactComponent as HomeIcon } from '@/assets/icon/navbar_home.svg';
import { ButtonTitle, IconButton, IconWrapper, NavBar, NavBarItem } from './Footer.style';

const navBarItems = [
  {
    path: '/',
    title: '메인',
    iconSrc: HomeIcon,
  },
  {
    path: '/products',
    title: '사료',
    iconSrc: FoodIcon,
  },
  {
    path: '/daily',
    title: '데일리',
    iconSrc: DailyIcon,
  },
  {
    path: '/mypage',
    title: '프로필',
    iconSrc: ProfileIcon,
  },
];
export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const goPage = (path: string) => {
    if (location.pathname === path) return;
    navigate(path);
  };
  console.log(location);
  const isCurrentPage = (path: string) => location.pathname === path;

  return (
    <NavBar>
      {navBarItems.map((navBarItem) => (
        <NavBarItem key={navBarItem.path} current={String(isCurrentPage(navBarItem.path))}>
          <IconButton onClick={() => goPage(navBarItem.path)}>
            <IconWrapper>
              {/* <img src={navBarItem.iconSrc} alt={`${navBarItem.title} 아이콘`} /> */}
              <navBarItem.iconSrc
                key={navBarItem.path}
                stroke={isCurrentPage(navBarItem.path) ? '#fff' : '#999'}
                height={24}
                width={24}
              />
            </IconWrapper>
            <ButtonTitle current={String(isCurrentPage(navBarItem.path))}>
              {navBarItem.title}
            </ButtonTitle>
          </IconButton>
        </NavBarItem>
      ))}
    </NavBar>
  );
}
