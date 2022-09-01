import { useConfirm } from '@/components/Confirm';
import { useWithdrawalMutation } from '@/store/api/userApi';
import { useAppDispatch } from '@/store/config';
import { logout } from '@/store/slices/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useWithdrawal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [withdrawalMutaion, { isSuccess }] = useWithdrawalMutation();
  const [openPopup] = useConfirm();

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
      navigate('/login');
    }
  }, [isSuccess]);

  const withdrawal = async () => {
    const confirm = await openPopup({
      title: '회원탈퇴',
      contents: '회원탈퇴를 하시면 모든 정보가 삭제됩니다.',
    });
    if (confirm) {
      withdrawalMutaion();
    }
  };
  return withdrawal;
}
