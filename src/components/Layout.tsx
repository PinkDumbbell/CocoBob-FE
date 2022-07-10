import { ReactNode } from 'react';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';

const ChildrenWrapper = styled.div`
  padding-top: 3rem;
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
    <div>
      {(header || title) && <Header canGoBack={canGoBack} title={title} />}
      <ChildrenWrapper>{children}</ChildrenWrapper>
      {footer && <Footer />}
    </div>
  );
}
