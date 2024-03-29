import { Provider } from 'react-redux';
import store from '@/store/config';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NameForm from './Step1';
import DetailForm from './Step5';
import { IEnrollData } from '.';

const goNextStep = jest.fn();
const setEnrollData = jest.fn();

const initEnrollData: IEnrollData = {
  name: '',
  breedId: undefined,
  petImage: undefined,
  sex: '',
  isPregnant: false,
  isSpayed: false,
  age: 0,
  birthday: undefined,
  activityLevel: 3,
  bodyWeight: 0,
};

describe('반려동물 등록 Step1. 이름', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <NameForm
          goNextStep={goNextStep}
          enrollPetData={initEnrollData}
          setEnrollData={setEnrollData}
        />
      </Provider>,
    );
  });
  test('input 입력하지 않았을 때 버튼 비활성화', () => {
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
  });

  test('input 입력 시 버튼 활성화', () => {
    const nameInputEl = screen.getByPlaceholderText('반려동물의 이름을 입력해주세요');
    const submitButton = screen.getByRole('button');

    fireEvent.change(nameInputEl, { target: { value: '코코' } });

    expect(submitButton).not.toBeDisabled();
  });
});

describe('반려동물 등록 Step5. 세부 정보', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <DetailForm
          goNextStep={goNextStep}
          enrollPetData={initEnrollData}
          setEnrollData={setEnrollData}
        />
      </Provider>,
    );
  });

  test('모든 입력 유효', () => {
    const maleButton = screen.getByText('남자');
    const bodyWeightInput = screen.getByLabelText('몸무게');
    const nextButton = screen.getByText('등록완료');

    fireEvent.click(maleButton);
    fireEvent.change(bodyWeightInput, { target: { value: 5.3 } });

    expect(nextButton).toBeEnabled();
  });
  test('성별 선택 X, 몸무게 입력 O', () => {
    const bodyWeightInput = screen.getByLabelText('몸무게');
    const nextButton = screen.getByText('등록완료');

    fireEvent.change(bodyWeightInput, { target: { value: 5.3 } });

    expect(nextButton).toBeDisabled();
  });
  test('성별 선택 O, 몸무게 입력 X', () => {
    const maleButton = screen.getByText('남자');
    const nextButton = screen.getByText('등록완료');

    fireEvent.click(maleButton);

    expect(nextButton).toBeDisabled();
  });
  test('성별 선택 X, 몸무게 입력 X', () => {
    const nextButton = screen.getByText('등록완료');

    expect(nextButton).toBeDisabled();
  });
});
