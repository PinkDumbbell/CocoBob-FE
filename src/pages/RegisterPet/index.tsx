/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ActivityLevelType, IBreeds, IPet } from '@/@type/pet';
import Layout from '@/components/layout/Layout';
import { RootState } from '@/store/config';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

export default function RegisterPet() {
  const MAX_STEP = 4;
  const navigate = useNavigate();
  const currentPetInformation = useSelector((state: RootState) => state.registerPet);
  const [currentStep, setCurrentStep] = useState(1);

  const goNextStep = () => {
    if (currentStep === MAX_STEP) {
      console.log('max page', currentPetInformation);
      navigate('/');
    } else {
      console.log('current Information', currentPetInformation);
      setCurrentStep((step) => step + 1);
    }
  };
  const goPrevStep = () => {
    setCurrentStep((step) => step - 1);
  };

  const onClickGoBack = () => {
    if (currentStep === 1) navigate(-1);
    else goPrevStep();
  };

  const stepList = [
    <Step1 key="step-1" goNextStep={goNextStep} />,
    <Step2 key="step-2" goNextStep={goNextStep} goPrevStep={goPrevStep} />,
    <Step3 key="step-3" goNextStep={goNextStep} goPrevStep={goPrevStep} />,
    <Step4 key="step-4" goNextStep={goNextStep} goPrevStep={goPrevStep} />,
  ];

  return (
    <Layout header footer={false} title="우리 아이 등록" canGoBack onClickGoBack={onClickGoBack}>
      {stepList[currentStep - 1]}
    </Layout>
  );
}
