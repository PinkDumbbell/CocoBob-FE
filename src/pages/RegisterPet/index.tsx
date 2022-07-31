/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import { RootState, useAppDispatch, useAppSelector } from '@/store/config';

import { useSaveEnrollmentDataMutation } from '@/store/api/petApi';
import { clearRegisterInfo } from '@/store/slices/registerPetSlice';
import { getFileFromObjectURL } from '@/utils/libs/getFileFromObjectURL';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

export default function RegisterPet() {
  const MAX_STEP = 5;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentPetInformation = useAppSelector(
    (state: RootState) => state.registerPet.registerInfo,
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [enrollPetMutation, { isLoading, isError, isSuccess }] = useSaveEnrollmentDataMutation();

  const goNextStep = async () => {
    setCurrentStep((step) => step + 1);
  };
  const goPrevStep = () => {
    setCurrentStep((step) => step - 1);
  };

  const onClickGoBack = () => {
    if (currentStep === 1) navigate(-1);
    else goPrevStep();
  };

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(clearRegisterInfo());
    };
  }, []);

  useEffect(() => {
    if (currentStep <= MAX_STEP) return;

    async function enrollPet() {
      const enrollData = {
        ...currentPetInformation,
        petImage: undefined as unknown as File,
      };
      if (currentPetInformation.petImage) {
        const imageFileObject = await getFileFromObjectURL(currentPetInformation.petImage);
        enrollData.petImage = imageFileObject;
      }
      enrollPetMutation(enrollData);
    }
    enrollPet();
  }, [currentStep]);

  useEffect(() => {
    if (!isSuccess) return;
    navigate('/');
  }, [isSuccess]);
  useEffect(() => {
    if (!isError) return;
    alert('등록에 실패하였습니다.');
    setCurrentStep((step) => step - 1);
  }, [isError]);

  const stepList = [
    <Step1 key="name" goNextStep={goNextStep} />,
    <Step2 key="photo" goNextStep={goNextStep} />,
    <Step3 key="breed" goNextStep={goNextStep} />,
    <Step4 key="step-3" goNextStep={goNextStep} goPrevStep={goPrevStep} />,
    <Step5 key="step-4" goNextStep={goNextStep} goPrevStep={goPrevStep} />,
  ];

  return (
    <Layout header footer={false} title="내 반려동물 등록" canGoBack onClickGoBack={onClickGoBack}>
      {stepList[currentStep - 1]}
    </Layout>
  );
}
