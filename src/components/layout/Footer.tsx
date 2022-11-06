import React, { ReactNode, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as FoodIcon } from '@/assets/icon/navbar_food.svg';
import { ReactComponent as DailyIcon } from '@/assets/icon/navbar_daily.svg';
import { ReactComponent as ProfileIcon } from '@/assets/icon/navbar_profile.svg';
import { ReactComponent as HomeIcon } from '@/assets/icon/navbar_home.svg';
import { useAppDispatch } from '@/store/config';
import { setToday } from '@/store/slices/dailySlice';
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

interface NavBarMenuItemProps {
  path: string;
  title: string;
  on: boolean;
  onClick: () => void;
  children: ReactNode;
}
const NavBarMenuItem = ({ path, title, on, onClick, children }: NavBarMenuItemProps) => {
  return (
    <NavBarItem key={path} current={String(on)}>
      <IconButton onClick={onClick}>
        <IconWrapper>{children}</IconWrapper>
        <ButtonTitle current={String(on)}>{title}</ButtonTitle>
      </IconButton>
    </NavBarItem>
  );
};

function Footer({ currentPath }: { currentPath: string }) {
  const isCurrentPage = useCallback((path: string) => currentPath === path, [currentPath]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const goPage = (toGo: string) => {
    if (toGo === '/daily') {
      dispatch(setToday());
    }
    if (location.pathname === toGo) return;
    navigate(toGo);
  };

  return (
    <NavBar>
      {navBarItems.map(({ path, iconSrc: Icon, title }) => (
        <NavBarMenuItem
          key={path}
          on={isCurrentPage(path)}
          path={path}
          title={title}
          onClick={() => goPage(path)}
        >
          <Icon key={path} stroke={isCurrentPage(path) ? '#fff' : '#999'} height={24} width={24} />
        </NavBarMenuItem>
      ))}
    </NavBar>
  );
}
export default React.memo(Footer);
