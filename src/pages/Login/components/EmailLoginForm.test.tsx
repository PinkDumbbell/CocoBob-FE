import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from 'styled-components';

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { theme } from '@/styles/theme';
import store from '@/store/config';
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

describe('<EmailLoginForm />', () => {
  let onSubmitCredentials = jest.fn();
  beforeEach(() => {
    onSubmitCredentials.mockClear();
    onSubmitCredentials = jest.fn();
    onSubmitCredentials.mockReturnValue(1);
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <EmailLoginForm
              onSubmitCredentials={onSubmitCredentials}
              isError={false}
              isLoading={false}
            />
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

  it('email과 password 모두 입력하지 않았을 때, 로그인 버튼 disabled', async () => {
    act(() => setInputValues(/* email= */ '', /* password= */ ''));
    await act(() => {
      fireEvent.submit(screen.getByTestId('login-form'));
    });
    expect(onSubmitCredentials).not.toBeCalled();
  });

  it('이메일 입력, 비밀번호 입력하지 않았을 때, 로그인 버튼 disabled', async () => {
    act(() => setInputValues(/* email= */ 'test@test.com', /* password= */ ''));
    await act(() => {
      fireEvent.submit(screen.getByTestId('login-form'));
    });
    expect(onSubmitCredentials).not.toBeCalled();
  });

  it('이메일 입력하지 않았을때, 비밀번호 입력했을때, 로그인 버튼 disabled', async () => {
    act(() => setInputValues(/* email= */ '', /* password= */ 'password'));
    await act(() => {
      fireEvent.submit(screen.getByTestId('login-form'));
    });

    expect(onSubmitCredentials).not.toBeCalled();
  });

  it('이메일 입력, 비밀번호 입력 했을때 버튼 available', async () => {
    act(() => setInputValues(/* email= */ 'john@gmail.com', /* password= */ 'password'));

    await act(() => {
      fireEvent.submit(screen.getByTestId('login-form'));
    });
    expect(onSubmitCredentials).toBeCalled();
  });
});
