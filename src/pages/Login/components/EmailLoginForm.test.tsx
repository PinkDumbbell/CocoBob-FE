import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

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
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EmailLoginForm />
        </BrowserRouter>
      </Provider>,
    );
  });
  const setInputValues = (email: string, password: string) => {
    fireEvent.input(screen.getByTestId('email'), {
      target: {
        value: email,
      },
    });
    fireEvent.input(screen.getByTestId('password'), {
      target: {
        value: password,
      },
    });
  };

  it('email과 password 모두 입력하지 않았을 때, 로그인 버튼 disabled', async () => {
    act(() => setInputValues(/* email= */ '', /* password= */ ''));
    // expect(await screen.findByText('로그인')).toBeDisabled();
  });

  // it('이메일 형식 invalid 에러');
  it('이메일 입력, 비밀번호 입력하지 않았을 때, 로그인 버튼 disabled', async () => {
    act(() => setInputValues(/* email= */ 'test@test.com', /* password= */ ''));
    // expect(screen.getByText('로그인')).toBeDisabled();
    act(() => {
      fireEvent.click(screen.getByText('로그인'));
    });

    // expect(screen.getByTestId('email')).toHaveStyle('border: 1px solid #ddd');
    // expect(screen.getByTestId('password')).toHaveStyle('border: 1px solid red');

    // expect(() => mockLogin('test@test.com', '12')).not.toBeCalled();
  });

  it('이메일 입력하지 않았을때, 비밀번호 입력했을때, 로그인 버튼 disabled', async () => {
    act(() => setInputValues(/* email= */ '', /* password= */ 'password'));
    // expect(screen.getByText('로그인')).toBeDisabled();
    act(() => {
      fireEvent.click(screen.getByText('로그인'));
    });

    // expect(screen.getByTestId('email')).toHaveStyle('border: 1px solid #ddd');
    // expect(screen.getByTestId('password')).toHaveStyle('border: 1px solid red');

    // expect(() => mockLogin('test@test.com', '12')).not.toBeCalled();
  });

  it('이메일 입력, 비밀번호 입력 했을때 버튼 available', async () => {
    act(() => setInputValues(/* email= */ 'john@gmail.com', /* password= */ 'password'));

    expect(screen.getByText('로그인')).not.toBeDisabled();
  });
});
