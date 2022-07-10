import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import { ChildrenWrapper } from './Layout.style';

interface LayoutProps {
  canGoBack?: boolean;
  children: ReactNode;
  title: string;
  header?: boolean;
  footer?: boolean;
}
export default function Layout({ canGoBack, title, header, footer, children }: LayoutProps) {
  return (
    <>
      {(header || title) && <Header canGoBack={canGoBack} title={title} />}
      <ChildrenWrapper>{children}</ChildrenWrapper>
      {footer && <Footer />}
    </>
  );
}
