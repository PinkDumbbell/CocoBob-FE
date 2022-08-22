/* eslint-disable no-unused-vars */
import { IEnrollData } from './index';

export interface INextStep {
  goNextStep: () => void;
}
export interface IPrevNextStep extends INextStep {
  goPrevStep: () => void;
}
export interface StepPageProps {
  goNextStep: () => void;
  enrollPetData: IEnrollData;
  setEnrollData: (key: string, value: any) => void;
}
