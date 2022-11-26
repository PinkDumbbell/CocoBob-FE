import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as WriteIcon } from '@/assets/icon/write_icon.svg';
import { getDateString } from '@/utils/libs/date';
import { HealthRecordType } from '@/store/api/dailyApi';

import { ReactComponent as PinIcon } from '@/assets/icon/pin_icon.svg';
import ArrowIcon from '@/assets/icon/go_back_btn.png';

type BodyWeightInfoProps = {
  recentBodyWeight: number | null;
  beforeDays: number;
};

export const BodyWeightInfo = ({ recentBodyWeight, beforeDays }: BodyWeightInfoProps) => {
  const recentBodyWeightInfo =
    beforeDays === 0 ? '오늘의 몸무게' : `측정 후 ${beforeDays}일이 지났어요`;

  if (!recentBodyWeight)
    return (
      <div className="bg-primary-max w-full p-4 rounded flex flex-col gap-2">
        <Link
          className="flex flex-col gap-1 items-center p-4"
          to={`/daily/health?date=${getDateString(new Date())}`}
        >
          <p>
            아직 <strong>몸무게 기록</strong>이 없네요!
          </p>
          <p className="text-caption">기록을 추가하시려면 눌러보세요</p>
        </Link>
      </div>
    );

  return (
    <div className="bg-primary-max w-full p-4 rounded flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="font-medium">최근몸무게</p>
        <Link to={`/daily/health?date=${getDateString(new Date())}`}>
          <WriteIcon />
        </Link>
      </div>
      <div>
        <p className="text-caption">{recentBodyWeightInfo}</p>
        <p className="text-h2 text-primary-dark">{recentBodyWeight}kg</p>
      </div>
    </div>
  );
};

const FeedHistoryItem = ({
  product,
  amount,
  date,
}: {
  product: { productId: number; productName: string };
  amount: number;
  date: string;
}) => {
  return (
    <div className="flex gap-2 h-20 py-1">
      <div className="h-full flex">
        <PinIcon width={18} height={18} />
      </div>
      <div className="flex justify-between w-full h-full">
        <div className="flex flex-col gap-1">
          <p className="text-label text-gray">{product.productName}</p>
          <p className="text-h3">{amount}g</p>
        </div>
        <div className="min-h-fit">
          <p className="text-caption">{date}</p>
        </div>
      </div>
    </div>
  );
};
type FeedInfoProps = { healthRecord: HealthRecordType | undefined };
export const FeedInfo = ({ healthRecord }: FeedInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      {healthRecord?.meals ? (
        <div className="px-4 flex flex-col w-full gap-4">
          <div className="flex gap-2 items-center">
            <Link
              to={`/daily/health?date=${getDateString(new Date())}`}
              className="flex gap-2 items-center"
            >
              최근 급여량
              <div>
                <img src={ArrowIcon} alt="enter-icon-image" className="rotate-180" width={6} />
              </div>
            </Link>
          </div>
          <div>
            {healthRecord.meals.map((meal) => (
              <FeedHistoryItem
                key={meal.mealId}
                product={meal.productInfo}
                amount={meal.amount}
                date={getDateString(new Date())}
              />
            ))}
          </div>
        </div>
      ) : (
        <Link
          className="border rounded border-primary-brightest w-full h-36 flex flex-col items-center justify-center"
          to={`/daily/health?date=${getDateString(new Date())}`}
        >
          <p>
            아직 <strong>급여 기록</strong>이 없어요!
          </p>
          <p className="text-caption">기록을 추가하시려면 누르세요</p>
        </Link>
      )}
    </div>
  );
};
type ButtonType = {
  label: string;
  link: string;
};
type NavigateMenuProps = {
  leftButton: ButtonType;
  rightButton: ButtonType;
};
export const NavigateMenu = ({ leftButton, rightButton }: NavigateMenuProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center overflow-hidden">
      <button
        className="p-2 w-1/2 bg-primary text-white rounded-bl"
        onClick={() => navigate(leftButton.link)}
      >
        {leftButton.label}
      </button>
      <button
        className="p-2 w-1/2 bg-primary text-white rounded-br"
        onClick={() => navigate(rightButton.link)}
      >
        {rightButton.label}
      </button>
    </div>
  );
};
