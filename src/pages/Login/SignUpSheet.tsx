import BottomSheet from '@/components/BottomSheet';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import SignUpForm from './components/SignUpForm';
import { SignUpFooter } from './components/SignUpForm.style';
import { FormWrapper, SheetContent } from './index.style';

interface SignUpSheetProps {
  isOpen: boolean;
}
export default function SignUpSheet({ isOpen }: SignUpSheetProps) {
  const { openBottomSheet: openEmailLoginBottomSheet } = useBottomSheet('emailLogin');

  return (
    <BottomSheet isOpen={isOpen}>
      <SheetContent>
        <FormWrapper>
          <h2>회원가입</h2>
          <SignUpForm isOpen={isOpen} />
          <SignUpFooter>
            <span>이미 계정이 있으시다면 ?</span>
            <a
              className="font-bold"
              onClick={(e) => {
                e.preventDefault();
                openEmailLoginBottomSheet();
              }}
            >
              로그인
            </a>
          </SignUpFooter>
        </FormWrapper>
      </SheetContent>
    </BottomSheet>
  );
}
