import BottomSheet from '@/components/BottomSheet';
import SignUpForm from './components/SignUpForm';
import { SignUpFooter } from './components/SignUpForm.style';

interface SignUpSheetProps {
  isOpen: boolean;
  close: () => void;
  openEmailLoginSheet: () => void;
}
export default function SignUpSheet({ close, isOpen, openEmailLoginSheet }: SignUpSheetProps) {
  return (
    <BottomSheet close={close} isOpen={isOpen}>
      <div className="w-full h-full py-2 px-2 flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center gap-2 bg-white">
          <h2>회원가입</h2>
          <SignUpForm isOpen={isOpen} close={close} />
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
      </div>
    </BottomSheet>
  );
}
