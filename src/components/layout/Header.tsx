import { Link, useLocation, useNavigate } from 'react-router-dom';

import BackButtonImage from '@/assets/icon/header_back.png';
import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';
import { ReactComponent as MenuIcon } from '@/assets/icon/menu_icon.svg';
import DefaultProfile from '@/assets/icon/navbar_profile.svg';
import { useState } from 'react';

import {
  BackButton,
  HeaderContents,
  HeaderWrapper,
  LeftMenuWrapper,
  ProfileWrapper,
  RightMenuWrapper,
  SideMenuWrapper,
  Title,
  TitleWrapper,
} from './Header.style';

export interface HeaderProps {
  menu?: boolean;
  canGoBack?: boolean;
  onClickGoBack?: () => void;
  title?: string;
  canSearch?: boolean;
  hideTitle?: boolean;
}
export default function Header({
  menu,
  canGoBack,
  onClickGoBack,
  title,
  hideTitle,
  canSearch,
}: HeaderProps) {
  const location = useLocation();
  const navigator = useNavigate();
  const [isMenuOpen, setMenu] = useState(false);

  const goBackPage = () => navigator(-1);

  const openMenu = () => setMenu(true);
  const closeMenu = () => setMenu(false);

  return (
    <HeaderWrapper>
      <HeaderContents>
        <LeftMenuWrapper>
          {canGoBack && (
            <BackButton onClick={onClickGoBack ?? goBackPage}>
              <img src={BackButtonImage} />
            </BackButton>
          )}
          {menu && (
            <div>
              <button type="button" onClick={openMenu}>
                <MenuIcon />
              </button>
            </div>
          )}
        </LeftMenuWrapper>
        <TitleWrapper isBigProfileHide={!!hideTitle}>
          {location.pathname === '/' && (
            <ProfileWrapper isSmall={!!hideTitle}>
              <img src={DefaultProfile} alt="작은 프로필사진" />
            </ProfileWrapper>
          )}
          <Title isHide={!!hideTitle}>{title}</Title>
          {location.pathname === '/' && <img src={DefaultProfile} alt="큰 프로필 사진" />}
        </TitleWrapper>
        <RightMenuWrapper>
          {canSearch && (
            <Link to="/search">
              <SearchIcon />
            </Link>
          )}
        </RightMenuWrapper>
      </HeaderContents>

      <SideMenuWrapper isOpen={isMenuOpen}>
        <button type="button" onClick={closeMenu}>
          닫기
        </button>
      </SideMenuWrapper>
    </HeaderWrapper>
  );
}
