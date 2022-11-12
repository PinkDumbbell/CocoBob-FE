import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import FormInput from './FormInput';

const formInputProps = {
  label: '테스트 인풋',
  name: 'test-input',
  type: 'text',
  isError: false,
};

test('Error가 없을 때 UI 테스트', () => {
  render(
    <ThemeProvider theme={theme}>
      <FormInput {...formInputProps} />
    </ThemeProvider>,
  );
  const inputEl = screen.getByLabelText('테스트 인풋');

  expect(inputEl).toHaveStyle('border: 1px solid #bbbbbb');
});

test('Error일 때 UI 테스트', () => {
  render(
    <ThemeProvider theme={theme}>
      <FormInput {...formInputProps} isError={true} />
    </ThemeProvider>,
  );
  const inputEl = screen.getByLabelText('테스트 인풋');

  expect(inputEl).toHaveStyle('border: 1px solid #E85354');
});
