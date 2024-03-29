type RecordButtonGroupProps = {
  saveLabel?: string;
  resetLabel?: string;
  saveRecord: () => void;
  resetRecord: () => void;
};

export default function RecordButtonGroup({
  saveLabel = '종료',
  resetLabel = '초기화',
  saveRecord,
  resetRecord,
}: RecordButtonGroupProps) {
  return (
    <div className="absolute -bottom-8 flex justify-center space-x-2">
      <button
        type="button"
        onClick={saveRecord}
        className="rounded w-16 h-7 bg-secondary-brighter flex items-center justify-center text-white font-normal text-label"
      >
        {saveLabel}
      </button>
      <button
        type="button"
        onClick={resetRecord}
        className="rounded w-16 h-7 bg-secondary-brighter flex items-center justify-center text-white font-normal text-label"
      >
        {resetLabel}
      </button>
    </div>
  );
}
