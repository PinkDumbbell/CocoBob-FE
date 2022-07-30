import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormInput from './FormInput';

const formInputProps = {
  label: '테스트 인풋',
  name: 'test-input',
  type: 'text',
  isError: false,
};

test('Error가 없을 때 UI 테스트', () => {
  render(<FormInput {...formInputProps} isError={true} />);
  const inputEl = screen.getByTestId('test-input');

  expect(inputEl).toHaveStyle('border: 1px solid #EDEDED');
});

test('Error일 때 UI 테스트', () => {
  render(<FormInput {...formInputProps} isError={true} />);
  const inputEl = screen.getByTestId('test-input');

  expect(inputEl).toHaveStyle('border: 1px solid #E85354');
});
