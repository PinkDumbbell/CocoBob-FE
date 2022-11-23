import React, { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useCurrentPet from '@/utils/hooks/useCurrentPet';
import BackButtonImage from '@/assets/icon/header_back.png';
import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';
import DefaultProfile from '@/assets/icon/navbar_profile.svg';

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
  canGoBack?: boolean;
  onClickGoBack?: () => void;
  title?: string;
  canSearch?: boolean;
  hideTitle?: boolean;
  customRightChild?: ReactNode;
}
const LeftChild = React.memo(({ canGoBack, onClickGoBack }: HeaderProps) => {
  const navigator = useNavigate();

  const goBackPage = () => navigator(-1);

  return (
    <>
      <LeftMenuWrapper>
        {canGoBack && (
          <BackButton onClick={onClickGoBack ?? goBackPage}>
            <img src={BackButtonImage} />
          </BackButton>
        )}
      </LeftMenuWrapper>
    </>
  );
});
LeftChild.displayName = 'HeaderLeftChild';

// eslint-disable-next-line arrow-body-style
const RightChild = React.memo(({ canSearch }: { canSearch?: boolean }) => {
  return (
    <RightMenuWrapper>
      {canSearch && (
        <Link to="/products" state={{ openSearch: true }}>
          <SearchIcon />
        </Link>
      )}
    </RightMenuWrapper>
  );
});
RightChild.displayName = 'HeaderRightChild';

function Header({
  canGoBack,
  onClickGoBack,
  title,
  hideTitle,
  canSearch,
  customRightChild,
}: HeaderProps) {
  const location = useLocation();
  const { data: pet } = useCurrentPet(location.pathname === '/');

  return (
    <HeaderWrapper>
      <HeaderContents>
        <LeftChild onClickGoBack={onClickGoBack} canGoBack={canGoBack} />
        <TitleWrapper isBigProfileHide={!!hideTitle}>
          {location.pathname === '/' && (
            <ProfileWrapper isSmall={!!hideTitle}>
              <img src={pet?.thumbnailPath ?? DefaultProfile} alt="작은 프로필사진" />
            </ProfileWrapper>
          )}
          <Title isHide={!!hideTitle}>{title}</Title>
          {location.pathname === '/' && (
            <img src={pet?.thumbnailPath ?? DefaultProfile} alt="큰 프로필 사진" />
          )}
        </TitleWrapper>
        {customRightChild ? (
          <RightMenuWrapper>{customRightChild}</RightMenuWrapper>
        ) : (
          <RightChild canSearch={canSearch} />
        )}
      </HeaderContents>
    </HeaderWrapper>
  );
}
export default React.memo(Header);
