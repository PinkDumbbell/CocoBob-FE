import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { theme } from '@/styles/theme';
import store from '@/store/config';
import 'jest-canvas-mock';
import { act } from 'react-dom/test-utils';
import { Spinner } from '@/Animation';
import EmailLoginForm from './EmailLoginForm';

/**
 * case 1:
 *    이메일 입력 x, 비밀번호 입력 x => 로그인 버튼 비활성화
 *
 * case 2:
 *    이메일 입력 o, 비밀번호 입력 x => 로그인 버튼 비활성화
 *
 * case 3:
 *    이메일 입력 x, 비밀번호 입력 o => 로그인 버튼 비활성화
 *
 * case 4:
 *    이메일 입력 o, 비밀번호 입력 o => 로그인 버튼 활성화
 */

const onSubmitCredentials = jest.fn();

describe('<EmailLoginForm />', () => {
  beforeEach(() => {
    onSubmitCredentials.mockClear();
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<Spinner />}>
              <EmailLoginForm
                onSubmitCredentials={onSubmitCredentials}
                isError={false}
                isLoading={false}
              />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );
  });
  const setInputValues = (email: string, password: string) => {
    fireEvent.input(screen.getByLabelText('이메일'), {
      target: {
        value: email,
      },
    });
    fireEvent.input(screen.getByLabelText('비밀번호'), {
      target: {
        value: password,
      },
    });
  };

  test('email과 password 모두 입력하지 않았을 때, 로그인 버튼 disabled', async () => {
    setInputValues(/* email= */ '', /* password= */ '');

    fireEvent.submit(screen.getByTestId('login-form'));

    expect(onSubmitCredentials).not.toBeCalled();
  });

  test('이메일 입력, 비밀번호 입력하지 않았을 때, 로그인 버튼 disabled', async () => {
    setInputValues(/* email= */ 'test@test.com', /* password= */ '');
    fireEvent.submit(screen.getByTestId('login-form'));
    expect(onSubmitCredentials).not.toBeCalled();
  });

  test('이메일 입력하지 않았을때, 비밀번호 입력했을때, 로그인 버튼 disabled', async () => {
    setInputValues(/* email= */ '', /* password= */ 'password');

    fireEvent.submit(screen.getByTestId('login-form'));

    expect(onSubmitCredentials).not.toBeCalled();
  });

  test('이메일 입력, 비밀번호 입력 했을때 버튼 available', async () => {
    setInputValues(/* email= */ 'john@gmail.com', /* password= */ 'password');
    act(() => {
      fireEvent.submit(screen.getByTestId('login-form'));
    });
  });
});
