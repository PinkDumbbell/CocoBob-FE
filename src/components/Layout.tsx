import { ReactNode } from 'react';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';

const ChildrenWrapper = styled.div`
  padding-top: 3rem;
  height: 100%;
  width: 100%;
`;
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
