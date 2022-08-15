import React, { ReactNode, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header, { HeaderProps } from './Header';
import { ChildrenWrapper } from './Layout.style';

interface LayoutProps extends HeaderProps {
  children: ReactNode;
  header?: boolean;
  footer?: boolean;
  canSearch?: boolean;
}

const useHeaderWithScroll = () => {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const [hideTitle, setHideTitle] = useState(false);

  const throttledScroll = _.throttle(() => {
    if (pageRef.current) {
      if (pageRef.current?.scrollTop >= 50) setHideTitle(true);
      else setHideTitle(false);
    }
  }, 60);

  useEffect(() => {
    if (location.pathname === '/') {
      pageRef.current?.addEventListener('scroll', throttledScroll);
    }

    return () => {
      pageRef.current?.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return { pageRef, hideTitle };
};
function Layout({
  canGoBack,
  canSearch,
  onClickGoBack,
  title,
  header,
  footer,
  children,
  menu,
}: LayoutProps) {
  const { pageRef, hideTitle } = useHeaderWithScroll();
  const location = useLocation();
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {header && (
        <Header
          canGoBack={canGoBack}
          onClickGoBack={onClickGoBack}
          hideTitle={hideTitle}
          title={title}
          menu={menu}
          canSearch={canSearch}
        />
      )}

      <ChildrenWrapper ref={pageRef} headerShown={!!header} footerShown={!!footer}>
        {children}
      </ChildrenWrapper>
      {footer && <Footer currentPath={pathname} />}
    </>
  );
}
export default React.memo(Layout);
