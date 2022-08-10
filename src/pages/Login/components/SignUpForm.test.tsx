import store from '@/store/config';
import { theme } from '@/styles/theme';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import SignUpForm from './SignUpForm';

describe('<SignUpForm />', () => {
  const signUpFn = jest.fn();

  beforeEach(() => {
    signUpFn.mockClear();
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SignUpForm isOpen signUp={signUpFn} />
        </ThemeProvider>
      </Provider>,
    );
  });

  const setInputValue = (label: string, value: string) =>
    fireEvent.input(screen.getByLabelText(label), { target: { value } });

  const setInputValues = (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ) => {
    setInputValue('이름', name);
    setInputValue('이메일', email);
    setInputValue('비밀번호', password);
    setInputValue('비밀번호 확인', passwordConfirm);
  };

  test('입력 값 없을 때 submit 테스트', async () => {
    const formEl = screen.getByTestId('signup-form');

    await act(() => {
      fireEvent.submit(formEl);
    });

    expect(signUpFn).not.toBeCalled();
    expect(screen.getByLabelText('이름')).toHaveStyle('border: 1px solid #e85354');
    // expect(screen.getByLabelText('이메일')).toHaveStyle('border: 1px solid #e85354');
    expect(screen.getByLabelText('비밀번호')).toHaveStyle('border: 1px solid #e85354');
    expect(screen.getByLabelText('비밀번호 확인')).toHaveStyle('border: 1px solid #e85354');
  });
  test('입력 값 valid, 이메일 체크 x, submit 테스트', async () => {
    setInputValues(
      /* name */ '홍길동',
      /* email */ 'gildong@mail.com',
      /* password */ 'Password!123',
      /* passwordConfirm */ 'Password!123',
    );
    const formEl = screen.getByTestId('signup-form');

    await act(() => {
      fireEvent.submit(formEl);
    });

    expect(signUpFn).not.toBeCalled();
    // expect(screen.getByLabelText('이메일')).toHaveStyle('border: 1px solid #e85354');
  });
  test('입력 값 valid, 이메일 체크 o, 이메일 사용 가능, submit 테스트', async () => {
    setInputValues(
      /* name */ '홍길동',
      /* email */ 'gildong@mail.com',
      /* password */ 'Password!123',
      /* passwordConfirm */ 'Password!123',
    );
    await act(() => {
      fireEvent.click(screen.getByText('확인'));
    });
    await waitFor(() => {
      screen.getByText('V');
    });
    await act(() => {
      fireEvent.submit(screen.getByTestId('signup-form'));
    });

    expect(signUpFn).toBeCalled();
  });
  test('입력 값 valid, 이메일 체크 o, 이메일 사용 가능 X, submit 테스트', async () => {
    setInputValues(
      /* name */ '홍길동',
      /* email */ 'duplicated@email.com',
      /* password */ 'Password!123',
      /* passwordConfirm */ 'Password!123',
    );
    await act(() => {
      fireEvent.click(screen.getByText('확인'));
    });
    await waitFor(() => {
      screen.getByText('해당 이메일을 가진 사용자가 존재합니다.');
    });
    await act(() => {
      fireEvent.submit(screen.getByTestId('signup-form'));
    });

    expect(signUpFn).not.toBeCalled();
  });
  test('password !== passwordConfirm, 이메일 체크 x, submit 테스트', async () => {
    setInputValues(
      /* name */ '홍길동',
      /* email */ 'gildong@mail.com',
      /* password */ 'Password!123',
      /* passwordConfirm */ 'PasswordConfirm!123',
    );
    const formEl = screen.getByTestId('signup-form');

    await act(() => {
      fireEvent.submit(formEl);
    });

    expect(signUpFn).not.toBeCalled();
    // expect(screen.getByLabelText('이메일')).toHaveStyle('border: 1px solid #e85354');
    expect(screen.getByLabelText('비밀번호 확인')).toHaveStyle('border: 1px solid #e85354');
  });
  test('이름 입력 x, 이메일 체크 x, submit 테스트', async () => {
    setInputValues(
      /* name */ '',
      /* email */ 'gildong@mail.com',
      /* password */ 'Password!123',
      /* passwordConfirm */ 'Password!123',
    );
    const formEl = screen.getByTestId('signup-form');

    await act(() => {
      fireEvent.submit(formEl);
    });

    expect(signUpFn).not.toBeCalled();
    expect(screen.getByLabelText('이름')).toHaveStyle('border: 1px solid #e85354');
    // expect(screen.getByLabelText('이메일')).toHaveStyle('border: 1px solid #e85354');
  });
  test('이메일 입력x, submit 테스트', async () => {
    setInputValues(
      /* name */ '홍길동',
      /* email */ '',
      /* password */ 'Password!123',
      /* passwordConfirm */ 'Password!123',
    );
    const formEl = screen.getByTestId('signup-form');

    await act(() => {
      fireEvent.submit(formEl);
    });

    expect(signUpFn).not.toBeCalled();
    // expect(screen.getByLabelText('이메일')).toHaveStyle('border: 1px solid #e85354');
  });
});
