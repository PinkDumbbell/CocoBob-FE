import { fireEvent, render } from '@testing-library/react';
import RecordButtonGroup from './ToolbarRecordButtonGroup';

const defaultSaveLabel = '종료';
const defaultResetLabel = '초기화';

const mockSaveRecord = jest.fn();
const mockResetRecord = jest.fn();

describe('<ToolbarRecordButtonGroup />', () => {
  test('라벨 기본값 테스트', async () => {
    const buttonGroup = render(
      <RecordButtonGroup saveRecord={mockSaveRecord} resetRecord={mockResetRecord} />,
    );

    const saveButton = buttonGroup.getByText(defaultSaveLabel);
    const resetButton = buttonGroup.getByText(defaultResetLabel);
    expect(saveButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(saveButton);
    fireEvent.click(resetButton);

    expect(mockSaveRecord).toHaveBeenCalled();
    expect(mockResetRecord).toHaveBeenCalled();
  });
  test('라벨 커스텀 테스트', async () => {
    const saveLabel = '확인';
    const resetLabel = '삭제';
    const buttonGroup = render(
      <RecordButtonGroup
        saveLabel={saveLabel}
        resetLabel={resetLabel}
        saveRecord={mockSaveRecord}
        resetRecord={mockResetRecord}
      />,
    );

    const saveButton = buttonGroup.getByText(saveLabel);
    const resetButton = buttonGroup.getByText(resetLabel);
    expect(saveButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(saveButton);
    fireEvent.click(resetButton);

    expect(mockSaveRecord).toHaveBeenCalled();
    expect(mockResetRecord).toHaveBeenCalled();
  });
});
