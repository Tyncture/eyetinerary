import { SetStateAction } from "react";

export interface ICreateStepProps {
  step: number;
  setStep: React.Dispatch<SetStateAction<number>>;
}
