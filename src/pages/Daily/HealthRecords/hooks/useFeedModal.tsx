import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useKeyHandler from '@/utils/hooks/useKeyHandler';
import { concatClasses } from '@/utils/libs/concatClasses';
import { ProductPreviewType } from '@/@type/product';
import { FormInput } from '@/components/Form';
import { useForm } from 'react-hook-form';
import { MealRequestType, useAddMealMutation } from '@/store/api/dailyApi';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import { useToastMessage } from '@/utils/hooks';
import useFeedBottomSheet from './useFeedBottomSheet';
import DailyModal from '../../components/DailyModal';

function useModal(onClose?: () => void) {
  const [opened, setOpened] = useState(false);
  const closeModal = () => {
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
    setOpened(false);
  };
  const openModal = () => setOpened(true);

  useKeyHandler('Escape', closeModal);

  const el = document.getElementById('modal');
  const Modal = ({ children, onSubmit }: { children: ReactNode; onSubmit: () => void }) =>
    opened && el
      ? createPortal(
          <DailyModal closeModal={closeModal} onSubmit={onSubmit}>
            {children}
          </DailyModal>,
          el,
        )
      : null;

  return {
    Modal,
    opened,
    closeModal,
    openModal,
  };
}

function useMealMutation(currentDate: string | null) {
  const petId = useAppSelector(getCurrentPet);
  const toast = useToastMessage();
  const [mutation, { isError, isLoading, isSuccess }] = useAddMealMutation();

  const addMeal = (meal: MealRequestType) => {
    if (!currentDate || !Number.isInteger(petId) || petId === null) {
      return;
    }
    mutation({ date: currentDate, petId, meal });
  };

  useEffect(() => {
    if (!isError) {
      return;
    }
    toast('');
  }, [isError]);

  return {
    addMeal,
    mutationLoading: isLoading,
    mutationSuccess: isSuccess,
  };
}
export default function useFeedModal(currentDate: string | null) {
  const { addMeal, mutationSuccess } = useMealMutation(currentDate);
  const { register, handleSubmit } = useForm<{ feedAmount: number }>();

  const [selectedProduct, setSelectedProduct] = useState<string | ProductPreviewType | null>(null);
  const { Modal, closeModal, openModal, opened } = useModal(() => setSelectedProduct(null));
  const {
    Component: SearchProductBottomSheet,
    closeBottomSheet,
    openBottomSheet,
  } = useFeedBottomSheet();

  const selectProduct = (product: ProductPreviewType | string) => {
    setSelectedProduct(product);
    closeBottomSheet();
  };

  const saveFeed = ({ feedAmount }: { feedAmount: number }) => {
    if (!selectedProduct) {
      return;
    }
    if (typeof selectedProduct === 'string') {
      addMeal({
        amount: feedAmount,
        productName: selectedProduct,
      });
      return;
    }
    // 존재하는 상품 선택
    addMeal({
      amount: feedAmount,
      productId: selectedProduct.productId,
    });
  };
  useEffect(() => {
    if (!mutationSuccess) {
      return;
    }
    closeModal();
  }, [mutationSuccess]);

  const Component = () => (
    <>
      <Modal onSubmit={handleSubmit(saveFeed)}>
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
                  'text-left p-2 border rounded border-secondary-brightest',
                  selectedProduct ? 'text-black' : 'text-gray',
                )}
              >
                {!selectedProduct
                  ? '사료를 찾아보세요'
                  : typeof selectedProduct === 'string'
                  ? selectedProduct
                  : selectedProduct.name}
              </button>
            </div>
            <FormInput
              name="feed"
              label="급여량"
              type="number"
              placeholder="급여량을 입력하세요"
              unit="g"
              disabled={!selectedProduct}
              rules={register('feedAmount', {
                required: '급여량을 입력해주세요.',
              })}
            />
          </div>
        </div>
      </Modal>
      <SearchProductBottomSheet onSelectProduct={selectProduct} />
    </>
  );
  return {
    opened,
    openModal,
    closeModal,
    Component,
  };
}
