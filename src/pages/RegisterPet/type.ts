export interface INextStep {
  goNextStep: () => void;
}
export interface IPrevNextStep extends INextStep {
  goPrevStep: () => void;
}
