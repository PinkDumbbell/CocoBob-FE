import { ReactNode } from 'react';
import reactDom from 'react-dom';

const Portal = ({ children }: { children?: ReactNode }) => {
  const el = document.getElementById('modal');
  return el ? reactDom.createPortal(children, el) : null;
};

export default Portal;
