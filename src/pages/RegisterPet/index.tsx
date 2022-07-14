/* eslint-disable no-unused-vars */

import { ActivityLevelType, IPet } from '@/@type/pet';
import Layout from '@/components/layout/Layout';
import { RootState } from '@/store/config';
import { setRepresentativePet } from '@/store/slices/userSlice';
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
  const dispatch = useDispatch();
  const pet = useSelector((state: RootState) => state.user.user?.representativePet);
  const [currentStep, setCurrentStep] = useState(0);
  const [petInformation, setPetInformation] = useState<RegisterPetInfo>({
    pregnant: false,
    spayed: false,
  } as RegisterPetInfo);

  const goNextStep = (payload: any) => {
    setPetInformation((prev) => ({
      ...prev,
      ...payload,
    }));

    if (currentStep === MAX_STEP) {
      console.log('마지막 스텝', payload);
      console.log('current Information', petInformation);

      dispatch(setRepresentativePet({ petId: 1, petAllergy: [], ...petInformation } as IPet));
      console.log('pet', pet);
      // navigate('/');
    } else {
      setCurrentStep((step) => step + 1);
      console.log('current Information', petInformation);
    }
  };
  const goPrevPage = (payload: any) => {
    setPetInformation((prev) => ({
      ...prev,
      ...payload,
    }));
    setCurrentStep((step) => step - 1);
  };

  const stepList = [
    <BasicInformation key="1" data={petInformation} goNextPage={goNextStep} />,
    <DetailInformation
      key="2"
      data={petInformation}
      goNextPage={goNextStep}
      goPrevPage={goPrevPage}
    />,
  ];

  return (
    <Layout header footer={false} title="우리 아이 등록">
      {stepList[currentStep]}
    </Layout>
  );
}
