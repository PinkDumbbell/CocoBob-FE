import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import BottomSheet from '@/components/BottomSheet/BottomSheet';
import { useSignUpMutation } from '@/store/api/userApi';
import { useToastMessage, useBottomSheet } from '@/utils/hooks';

import SignUpForm from './components/SignUpForm';
import { SignUpFooter } from './components/SignUpForm.style';
import { FormWrapper, SheetContent } from './index.style';
import SignUpPrivacyPolicy from './SignUpPrivacyPolicy';
import { ISignUpForm } from './types';

interface SignUpSheetProps {
  isOpen: boolean;
}

const useAgreement = (modalOpen: () => void) => {
  const [agreed, setAgreed] = useState(false);

  const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked },
    } = e;
    if (checked) {
      modalOpen();
    } else {
      setAgreed(checked);
    }
  };

  return {
    agreed,
    setAgreed,
    checkHandler,
  };
};

export default function SignUpSheet({ isOpen }: SignUpSheetProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const agreement = searchParams.get('agreement');
  const privacyModal = agreement === 'privacy';

  const openToast = useToastMessage();
  const { openBottomSheet: openEmailLoginBottomSheet } = useBottomSheet('emailLogin');

  const [signUp, { isSuccess }] = useSignUpMutation();

  const openPrivacyModal = () => {
    searchParams.append('agreement', 'privacy');
    setSearchParams(searchParams);
  };

  const {
    agreed: privacyAgreed,
    setAgreed: setPrivacyAgreed,
    checkHandler: privacyCheckHandler,
  } = useAgreement(openPrivacyModal);

  const closePrivacyModal = () => {
    searchParams.delete('agreement');
    setSearchParams(searchParams);
  };

  const onSubmitSignUpForm = async (data: ISignUpForm) => {
    if (!privacyAgreed) {
      openToast('개인정보 처리방침에 동의해주세요');
      return;
    }
    await signUp(data);
    openEmailLoginBottomSheet();
  };

  useEffect(() => {
    return () => {
      setPrivacyAgreed(false);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    openToast('회원가입이 완료되었습니다.', 'success');
  }, [isSuccess]);

  return (
    <BottomSheet isOpen={isOpen}>
      <SheetContent>
        <FormWrapper>
          <h2>회원가입</h2>
          <SignUpForm isOpen={isOpen} signUp={onSubmitSignUpForm} />
          <div className="flex flex-col items-start w-full px-4 gap-2">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name=""
                id=""
                checked={privacyAgreed}
                onChange={privacyCheckHandler}
              />
              <p className="text-sm">개인정보 처리방침 이용 동의</p>
              <button className="text-sm text-primary-bright" onClick={openPrivacyModal}>
                전문 보기
              </button>
            </div>
          </div>
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
      {privacyModal && (
        <SignUpPrivacyPolicy
          onConfirm={() => {
            setPrivacyAgreed(true);
            closePrivacyModal();
          }}
          onClose={closePrivacyModal}
        />
      )}
    </BottomSheet>
  );
}
