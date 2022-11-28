import { ChangeEvent, useState } from 'react';

import { concatClasses } from '@/utils/libs/concatClasses';

const activityLevelStrings = [
  '',
  '활동이 적은 편이에요',
  '다른 아이들보다 차분한 편이에요',
  '잘 움직이는 편이에요',
  '활발해요!',
  '엄청 기운이 넘쳐요!',
];

const useSelectActivityLevel = (defaultLevel?: number) => {
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(defaultLevel ?? 3);

  const handleSelectActivityLevel = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const level = parseInt(value, 10);
    if (Number.isNaN(level) || level < 1 || level > 5) {
      return;
    }
    setSelectedActivityLevel(level);
  };

  return {
    selectedActivityLevel,
    setSelectedActivityLevel,
    handleSelectActivityLevel,
  };
};

const barStyle = [
  'bg-secondary-brightest dark:secondary-dark',
  'bg-primary-brightest dark:primary-dark',
  'bg-primary-brighter dark:primary-darker',
  'bg-primary-bright dark:bg-primary-dark',
  'bg-primary dark:bg-primary',
];

type ActivityLevelSelectorProps = {
  activityLevel: number;
  // eslint-disable-next-line
  handleSelectLevel: (e: ChangeEvent<HTMLInputElement>) => void;
};
const ActivityLevelSelector = ({
  activityLevel,
  handleSelectLevel,
}: ActivityLevelSelectorProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <input
          type="range"
          name="activity-level"
          id="activity-level"
          list="tickmarks"
          className={concatClasses(
            'w-full h-1.5 rounded-lg appearance-none cursor-pointer',
            barStyle[activityLevel - 1],
          )}
          min="1"
          max="5"
          value={activityLevel}
          onChange={handleSelectLevel}
        />
      </div>
      <div>
        <p className="text-primary-bright text-label">{activityLevelStrings[activityLevel]}</p>
      </div>
    </div>
  );
};

export { useSelectActivityLevel };
export default ActivityLevelSelector;
