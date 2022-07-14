/* eslint-disable no-unused-vars */

import { ActivityLevelType, IPet } from '@/@type/pet';
import Layout from '@/components/layout/Layout';
import { RootState } from '@/store/config';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BasicInformation from './BasicInfo';
import DetailInformation from './DetailInfo';

export interface RegisterPetInfo {
  petName: string;
  petAge: number;
  petBreed: string;
  spayed: boolean;
  pregnant: boolean;
  bodyWeight: number;
  activityLevel: ActivityLevelType;
}

export default function RegisterPet() {
  const MAX_STEP = 1;
  const navigate = useNavigate();
  const currentPetInformation = useSelector((state: RootState) => state.registerPet);
  const [currentStep, setCurrentStep] = useState(0);

  const goNextStep = () => {
    if (currentStep === MAX_STEP) {
      console.log('max page', currentPetInformation);
      navigate('/');
    } else {
      console.log('current Information', currentPetInformation);
      setCurrentStep((step) => step + 1);
    }
  };
  const goPrevPage = () => {
    setCurrentStep((step) => step - 1);
  };

  const stepList = [
    <BasicInformation key="1" goNextPage={goNextStep} />,
    <DetailInformation key="2" goNextPage={goNextStep} goPrevPage={goPrevPage} />,
  ];

  return (
    <Layout header footer={false} title="우리 아이 등록">
      {stepList[currentStep]}
    </Layout>
  );
}
