import { Provider } from 'react-redux';
import store from '@/store/config';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NameForm from './Step1';
import DetailForm from './Step5';

const goPrevStep = jest.fn();
const goNextStep = jest.fn();

describe('반려동물 등록 Step1. 이름', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <NameForm />
      </Provider>,
    );
  });
  test('input 입력하지 않았을 때 버튼 비활성화', () => {
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
  });

  test('input 입력 시 버튼 활성화', () => {
    const nameInputEl = screen.getByTestId('pet-name');
    const submitButton = screen.getByRole('button');

    fireEvent.change(nameInputEl, { target: { value: '코코' } });

    expect(submitButton).not.toBeDisabled();
  });
});

describe('반려동물 등록 Step5. 세부 정보', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <DetailForm goPrevStep={goPrevStep} goNextStep={goNextStep} />
      </Provider>,
    );
  });

  test('모든 입력 유효', () => {
    const maleButton = screen.getByText('남자');
    const bodyWeightInput = screen.getByTestId('bodyWeight');
    const nextButton = screen.getByText('다음으로');

    fireEvent.click(maleButton);
    fireEvent.change(bodyWeightInput, { target: { value: 5.3 } });

    expect(nextButton).not.toBeDisabled();
  });
});
