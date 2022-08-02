import { ReactNode } from 'react';
import Footer from './Footer';
import Header, { HeaderProps } from './Header';
import { ChildrenWrapper } from './Layout.style';

interface LayoutProps extends HeaderProps {
  children: ReactNode;
  header?: boolean;
  footer?: boolean;
}
export default function Layout({
  canGoBack,
  onClickGoBack,
  title,
  header,
  footer,
  children,
  menu,
  onClickSearch,
  search,
}: LayoutProps) {
  return (
    <>
      {header && (
        <Header
          canGoBack={canGoBack}
          onClickGoBack={onClickGoBack}
          title={title}
          menu={menu}
          search={search}
          onClickSearch={onClickSearch}
        />
      )}
      <ChildrenWrapper headerShown={!!header} footerShown={!!footer}>
        {children}
      </ChildrenWrapper>
      {footer && <Footer />}
    </>
  );
}
