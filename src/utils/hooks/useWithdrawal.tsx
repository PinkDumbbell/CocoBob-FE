import { useWithdrawalMutation } from '@/store/api/userApi';
import { useAppDispatch } from '@/store/config';
import { logout } from '@/store/slices/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToastConfirm from './useToastConfirm';

export default function useWithdrawal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [withdrawalMutaion, { isSuccess }] = useWithdrawalMutation();
  const withdrawalConfirm = useToastConfirm('withdrawal', () => withdrawalMutaion());

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
      navigate('/login');
    }
  }, [isSuccess]);

  const onClickWithdrawal = () => {
    withdrawalConfirm('회원탈퇴를 하시겠습니까?');
    // withdrawalMutaion();
  };
  return onClickWithdrawal;
}
