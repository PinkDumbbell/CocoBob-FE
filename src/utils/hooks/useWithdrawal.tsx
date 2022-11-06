import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWithdrawalMutation } from '@/store/api/userApi';
import { useAppDispatch } from '@/store/config';
import { logout } from '@/store/slices/authSlice';
import useConfirm from '@/utils/hooks/useConfirm';

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
      contents: <p className="py-10">회원탈퇴를 하시면 모든 정보가 삭제됩니다.</p>,
    });
    if (confirm) {
      withdrawalMutaion();
    }
  };
  return withdrawal;
}
