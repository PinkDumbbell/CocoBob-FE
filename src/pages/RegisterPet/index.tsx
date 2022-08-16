import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useSaveEnrollmentDataMutation } from '@/store/api/petApi';
import { getFileFromObjectURL } from '@/utils/libs/getFileFromObjectURL';
import useToastMessage from '@/utils/hooks/useToastMessage';
import { ActivityLevelType, PetSexType } from '@/@type/pet';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

export interface IEnrollData {
  name: string;
  breedId?: number; // 견종 ID
  petImage?: string;
  sex: PetSexType; // 1: male, 2: female
  isSpayed: boolean; // 중성화
  isPregnant: boolean;
  birthday?: string; // *Nullable
  age: number; // months
  bodyWeight: number;
  activityLevel: ActivityLevelType; // 1~5
}

const initEnrollData: IEnrollData = {
  name: '',
  breedId: undefined,
  petImage: undefined,
  sex: '',
  isPregnant: false,
  isSpayed: false,
  age: 0,
  birthday: undefined,
  activityLevel: 3,
  bodyWeight: 0,
};
export default function RegisterPet() {
  const MAX_STEP = 5;
  const navigate = useNavigate();
  const [enrollPetData, setEnrollPetData] = useState<IEnrollData>(initEnrollData);

  const [currentStep, setCurrentStep] = useState(1);
  const [enrollPetMutation, { isError, isSuccess }] = useSaveEnrollmentDataMutation();
  const openToast = useToastMessage();

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

  const enrollPet = async () => {
    const enrollData = {
      ...enrollPetData,
      petImage: undefined as unknown as File,
    };
    if (enrollPetData.petImage) {
      enrollData.petImage = await getFileFromObjectURL(enrollPetData.petImage);
    }
    enrollPetMutation(enrollData);
  };

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      setEnrollPetData(initEnrollData);
    };
  }, []);

  useEffect(() => {
    if (currentStep <= MAX_STEP) return;

    enrollPet();
  }, [currentStep]);

  useEffect(() => {
    if (!isSuccess) return;

    navigate('/');
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) return;
    openToast('등록에 실패하였습니다.');
    setCurrentStep((step) => step - 1);
  }, [isError]);

  const setEnrollData = (key: string, value: any) => {
    setEnrollPetData((prev) => ({ ...prev, [key]: value }));
  };

  const stepList = [
    <Step1
      key="name"
      goNextStep={goNextStep}
      enrollPetData={enrollPetData}
      setEnrollData={setEnrollData}
    />,
    <Step2
      key="photo"
      goNextStep={goNextStep}
      enrollPetData={enrollPetData}
      setEnrollData={setEnrollData}
    />,
    <Step3
      key="breed"
      goNextStep={goNextStep}
      enrollPetData={enrollPetData}
      setEnrollData={setEnrollData}
    />,
    <Step4
      key="step-3"
      goNextStep={goNextStep}
      enrollPetData={enrollPetData}
      setEnrollData={setEnrollData}
    />,
    <Step5
      key="step-4"
      goNextStep={goNextStep}
      enrollPetData={enrollPetData}
      setEnrollData={setEnrollData}
    />,
  ];

  return (
    <Layout header footer={false} title="내 반려동물 등록" canGoBack onClickGoBack={onClickGoBack}>
      {stepList[currentStep - 1]}
    </Layout>
  );
}
