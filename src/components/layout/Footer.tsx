import { useLocation, useNavigate } from 'react-router-dom';
import { concatClasses } from '@/utils/libs/concatClasses';

import FoodIcon from '@/assets/icon/navbar_food.svg';
import DailyIcon from '@/assets/icon/navbar_daily.svg';
import ProfileIcon from '@/assets/icon/navbar_profile.svg';
import HomeIcon from '@/assets/icon/navbar_home.svg';
import { NavBar, NavBarItem } from './Footer.style';

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
        <NavBarItem key={navBarItem.path}>
          <button className="h-full p-1" onClick={() => goPage(navBarItem.path)}>
            <div className="h-full flex flex-col items-center justify-end">
              <img src={navBarItem.iconSrc} alt="" style={{ color: 'var(--primary-main)' }} />
              <p
                className={concatClasses(
                  'text-sm',
                  isCurrentPage(navBarItem.path) ? 'text-primary-bright' : 'text-caption',
                )}
              >
                {navBarItem.title}
              </p>
            </div>
          </button>
        </NavBarItem>
      ))}
    </NavBar>
  );
}
