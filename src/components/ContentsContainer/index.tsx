import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  /* Shadow/main */

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  display: flex;
  width: 100%;
  height: 100%;
`;

export default function ContentsContainer({
  style,
  children,
  className,
}: {
  style?: { [key: string]: string | number };
  children: ReactNode;
  className?: string;
}) {
  return (
    <Container style={style} className={className}>
      {children}
    </Container>
  );
}
