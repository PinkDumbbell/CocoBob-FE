import BottomSheet from '@/components/BottomSheet';
import { useSignUpMutation } from '@/store/api/userApi';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import SignUpForm from './components/SignUpForm';
import { SignUpFooter } from './components/SignUpForm.style';
import { FormWrapper, SheetContent } from './index.style';
import { ISignUpForm } from './types';

interface SignUpSheetProps {
  isOpen: boolean;
}
export default function SignUpSheet({ isOpen }: SignUpSheetProps) {
  const { openBottomSheet: openEmailLoginBottomSheet } = useBottomSheet('emailLogin');
  const [signUp] = useSignUpMutation();

  const onSubmitSignUpForm = async (data: ISignUpForm) => {
    await signUp(data);
    openEmailLoginBottomSheet();
  };
  return (
    <BottomSheet isOpen={isOpen}>
      <SheetContent>
        <FormWrapper>
          <h2>회원가입</h2>
          <SignUpForm isOpen={isOpen} signUp={onSubmitSignUpForm} />
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
