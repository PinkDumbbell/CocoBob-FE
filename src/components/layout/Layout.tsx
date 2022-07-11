import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import { ChildrenWrapper } from './Layout.style';

interface LayoutProps {
  canGoBack?: boolean;
  children: ReactNode;
  title?: string;
  header?: boolean;
  footer?: boolean;
}
export default function Layout({ canGoBack, title, header, footer, children }: LayoutProps) {
  return (
    <>
      {header && <Header canGoBack={canGoBack} title={title} />}
      <ChildrenWrapper headerShown={!!header}>{children}</ChildrenWrapper>
      {footer && <Footer />}
    </>
  );
}
