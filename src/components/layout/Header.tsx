import { useLocation, useNavigate } from 'react-router-dom';
import BackButtonImage from '@/assets/icon/header_back.png';
import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';
import { ReactComponent as MenuIcon } from '@/assets/icon/menu_icon.svg';
import DefaultProfile from '@/assets/icon/navbar_profile.svg';
import { useState } from 'react';
import { concatClasses } from '@/utils/libs/concatClasses';
import {
  BackButton,
  HeaderContents,
  HeaderWrapper,
  LeftMenuWrapper,
  ProfileWrapper,
  RightMenuWrapper,
  Title,
  TitleWrapper,
} from './Header.style';

export interface HeaderProps {
  menu?: boolean;
  canGoBack?: boolean;
  onClickGoBack?: () => void;
  title?: string;
  hideTitle?: boolean;
  search?: boolean;
  onClickSearch?: () => void;
}
export default function Header({
  menu,
  canGoBack,
  onClickGoBack,
  title,
  hideTitle,
  search,
  onClickSearch,
}: HeaderProps) {
  const location = useLocation();
  const navigator = useNavigate();
  const [isMenuOpen, setMenu] = useState(false);

  const goBackPage = () => navigator(-1);

  const openMenu = () => setMenu(true);
  const closeMenu = () => setMenu(false);
  const menuStyleClasses = isMenuOpen ? 'translate-x-0' : '-translate-x-24';

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
            <>
              <div>
                <button type="button" onClick={openMenu}>
                  <MenuIcon />
                </button>
              </div>
              <div
                className={concatClasses(
                  'fixed w-50 top-0 bottom-0 left-0 w-24 bg-white p-2 flex flex-col items-center shadow-md shadow-gray-300 transition-transform',
                  menuStyleClasses,
                )}
              >
                <button type="button" onClick={closeMenu}>
                  닫기
                </button>
              </div>
            </>
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
          {search && (
            <button type="button" onClick={onClickSearch}>
              <SearchIcon />
            </button>
          )}
        </RightMenuWrapper>
      </HeaderContents>
    </HeaderWrapper>
  );
}
