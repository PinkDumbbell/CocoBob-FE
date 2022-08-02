import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import { ChildrenWrapper } from './Layout.style';

interface LayoutProps {
  canGoBack?: boolean;
  onClickGoBack?: () => void;
  children: ReactNode;
  title?: string;
  header?: boolean;
  footer?: boolean;
  canSearch?: boolean;
}
export default function Layout({
  canGoBack,
  onClickGoBack,
  title,
  header,
  footer,
  children,
}: LayoutProps) {
  return (
    <>
      {header && (
        <Header canGoBack={canGoBack} onClickGoBack={onClickGoBack} title={title} canSearch />
      )}
      <ChildrenWrapper headerShown={!!header} footerShown={!!footer}>
        {children}
      </ChildrenWrapper>
      {footer && <Footer />}
    </>
  );
}
