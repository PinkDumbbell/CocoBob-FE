import BottomSheet from '@/components/BottomSheet';
import { setBottomSheetAction } from '@/store/slices/bottomSheetSlice';
import { useDispatch } from 'react-redux';
import SignUpForm from './components/SignUpForm';
import { SignUpFooter } from './components/SignUpForm.style';
import { SheetContent } from './index.style';

interface SignUpSheetProps {
  isOpen: boolean;
}
export default function SignUpSheet({ isOpen }: SignUpSheetProps) {
  const dispatch = useDispatch();
  const openEmailLoginSheet = () => dispatch(setBottomSheetAction('emailLogin'));

  return (
    <BottomSheet isOpen={isOpen}>
      <SheetContent>
        <div className="w-full flex flex-col items-center gap-2 bg-white">
          <h2>회원가입</h2>
          <SignUpForm />
          <SignUpFooter>
            <span>이미 계정이 있으시다면 ?</span>
            <a
              className="font-bold"
              onClick={(e) => {
                e.preventDefault();
                openEmailLoginSheet();
              }}
            >
              로그인
            </a>
          </SignUpFooter>
        </div>
      </SheetContent>
    </BottomSheet>
  );
}
