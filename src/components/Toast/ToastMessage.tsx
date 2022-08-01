import { deleteToastAction, getToast } from '@/store/slices/toastSlice';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  .fade-in {
    animation-duration: 0.25s;
    animation-name: fadein;
  }
  .fade-out {
    animation-duration: 0.25s;
    animation-name: fadeout;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
const ToastMessageItem = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;
  width: 358px;
  height: 46px;
  background: #e85354;
  /* Shadow/default */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  h3 {
    text-align: center;
    font-weight: 500;
    font-size: 13px;
    line-height: 46px;
    letter-spacing: -0.02em;
    text-align: center;
    color: #ffffff;
  }
`;
export default function ToastMessage() {
  const [animationName, setAnimationName] = useState<string>('fade-in');
  const toastMessage = useSelector(getToast);
  const { id, content, time } = toastMessage;
  const dispatch = useDispatch();
  const timeoutId = useRef<null | ReturnType<typeof setTimeout>>(null);
  const removeToast = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    setAnimationName('fade-out');
    setTimeout(() => {
      dispatch(deleteToastAction());
      setAnimationName('fade-in');
    }, 250);
  };
  useEffect(() => {
    if (content === '') return;
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      removeToast();
    }, time);
  }, [id]);
  return (
    <Container>
      {content !== '' && (
        <ToastMessageItem onClick={removeToast} className={animationName}>
          <h3>{content}</h3>
        </ToastMessageItem>
      )}
    </Container>
  );
}
