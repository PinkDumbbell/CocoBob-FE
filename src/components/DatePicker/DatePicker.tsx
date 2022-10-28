import { range } from 'lodash';
import ReactDatePicker from 'react-datepicker';
import ArrowIcon from '@/assets/icon/go_back_btn.png';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

interface DatePickerProps {
  currentDate: Date;
  // eslint-disable-next-line
  onChangeDate: (date: Date | null) => void;
  dateFormat?: string;
}

export default function DatePicker({
  currentDate,
  onChangeDate,
  dateFormat = 'yyyy.MM.dd',
}: DatePickerProps) {
  const years = range(1990, new Date().getFullYear() + 1, 1);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <ReactDatePicker
      withPortal
      selected={currentDate}
      onChange={onChangeDate}
      dateFormat={dateFormat}
      renderCustomHeader={({ increaseMonth, decreaseMonth, changeYear, changeMonth }) => (
        <div className="px-8 py-2 flex justify-between">
          <div>
            <button type="button" onClick={decreaseMonth}>
              <img src={ArrowIcon} alt="이전 달" />
            </button>
          </div>
          <div className="month-day">
            <select
              defaultValue={currentDate.getFullYear()}
              name="year"
              onChange={({ target: { value } }) => changeYear(+value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
            <select
              name="month"
              onChange={({ target: { value } }) => changeMonth(+value)}
              defaultValue={currentDate.getMonth() + 1}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}월
                </option>
              ))}
            </select>
            {/* {dayjs(monthDate).format('YYYY년 mm월')} */}
          </div>
          <div>
            <button type="button" onClick={increaseMonth}>
              <img src={ArrowIcon} alt="다음 달" className="rotate-180" />
            </button>
          </div>
        </div>
      )}
    />
  );
}
