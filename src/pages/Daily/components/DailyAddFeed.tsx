import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import { useBottomSheet } from '@/utils/hooks';
import { BottomSheet } from '@/components/BottomSheet';

import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';
import Button from '@/components/Button';
import { concatClasses } from '@/utils/libs/concatClasses';
import DailyModal, { DailyModalProps } from './DailyModal';

type FeedForm = {
  feed: number;
  product: string;
};
export default function DailyAddFeed({ closeModal, healthRecord }: DailyModalProps) {
  const { register, getValues, setValue } = useForm<FeedForm>();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  // TODO: mutation
  // const createOrUpdateDaily = useDailyMutation();
  const {
    isBottomSheetOpen: isMealBottomSheetOpened,
    openBottomSheet,
    closeBottomSheet,
  } = useBottomSheet('dailyMeal');

  const saveDaily = () => {
    // const feed = getValues('feed');
    // TODO: mutation
    // const newDaily = {
    //   ...healthRecord,
    //   feed,
    // };
    // createOrUpdateDaily(newDaily, petId, date, todayDaily?.dailyId);
    closeModal();
  };

  const selectProduct = () => {
    const productName = getValues('product');
    productName.trim();
    if (!productName) {
      return;
    }
    setSelectedProduct({ name: productName });
    setValue('product', '');
    closeBottomSheet();
  };

  useEffect(() => {
    if (!healthRecord) return;

    setValue('feed', 0);
  }, []);

  return (
    <DailyModal closeModal={closeModal} onSubmit={saveDaily}>
      <>
        <div className="p-2 flex flex-col w-full items-center gap-2">
          <h3>급여량 기록</h3>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="btn-feed-seasrch" className="text-sm font-medium">
                급여사료
              </label>
              <button
                id="btn-feed-search"
                onClick={openBottomSheet}
                className={concatClasses(
                  'text-left p-2 border rounded-[10px] ',
                  selectedProduct ? 'text-black' : 'text-gray-400',
                )}
              >
                {selectedProduct ? selectedProduct.name : '급여 사료를 찾아보세요'}
              </button>
            </div>
            <FormInput
              name="feed"
              label="급여량"
              placeholder="급여량을 입력하세요"
              unit="g"
              disabled
              rules={register('feed', {
                required: '급여량을 입력해주세요.',
              })}
            />
          </div>
        </div>
        {isMealBottomSheetOpened && (
          <BottomSheet isOpen={isMealBottomSheetOpened}>
            <div className="w-full flex flex-col p-4 space-y-2">
              <div className="w-full flex flex-col items-center">
                <div className="relative w-full">
                  <FormInput
                    rules={register('product', {
                      required: true,
                    })}
                    label=""
                    name="사료명"
                    placeholder={'사료를 검색해보세요'}
                    unit=" "
                  />
                  <button className="absolute right-4 top-1 flex items-center h-full">
                    <SearchIcon />
                  </button>
                </div>
              </div>
              <Button label="선택" type="button" width="full" onClick={selectProduct} />
            </div>
          </BottomSheet>
        )}
      </>
    </DailyModal>
  );
}
