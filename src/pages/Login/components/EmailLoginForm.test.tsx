import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import store from '@/store/config';
import { Provider } from 'react-redux';

import { act } from 'react-dom/test-utils';
import EmailLoginForm from './EmailLoginForm';

describe('<EmailLoginForm />', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <EmailLoginForm />
      </Provider>,
    );
  });

  it('email과 password가 null일 때 로그인 버튼 disabled', async () => {
    act(() => {
      fireEvent.input(screen.getByTestId('email'), {
        target: {
          value: '',
        },
      });
      fireEvent.input(screen.getByTestId('password'), {
        target: {
          value: '',
        },
      });
    });

    expect(await screen.findByText('로그인')).toBeDisabled();
  });

  // it('이메일 형식 invalid 에러');
  it('비밀번호 최소 길이 에러', async () => {
    act(() => {
      fireEvent.input(screen.getByTestId('email'), {
        target: {
          value: 'test@test.com',
        },
      });
      fireEvent.input(screen.getByTestId('password'), {
        target: {
          value: '12',
        },
      });
    });

    expect(screen.getByText('로그인')).not.toBeDisabled();
    act(() => {
      fireEvent.click(screen.getByText('로그인'));
    });

    // expect(screen.getByTestId('email')).toHaveStyle('border: 1px solid #ddd');
    // expect(screen.getByTestId('password')).toHaveStyle('border: 1px solid red');

    // expect(() => mockLogin('test@test.com', '12')).not.toBeCalled();
  });

  it('email, password 값 입력 시 버튼 available', async () => {
    fireEvent.input(screen.getByTestId('email'), {
      target: {
        value: 'test@test.com',
      },
    });
    fireEvent.input(screen.getByTestId('password'), {
      target: {
        value: 'password',
      },
    });

    expect(screen.getByText('로그인')).not.toBeDisabled();
  });
});
