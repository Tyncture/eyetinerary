import React, { SetStateAction } from "react";
import { useState } from "react";
import CreateStep1 from "./step1";
import { number } from "prop-types";
import { ICreateStepProps } from "./types";
import BaseContainer from "../../components/base/baseContainer";
import Sidebar from "../../components/base/sidebar";
import Main from "../../components/base/main";
import CreateStep2 from "./step2";

function Create() {
  const [step, setStep] = useState(1);
  const [iitineraryId, setItineraryId] = useState(null) as [
    number,
    React.Dispatch<SetStateAction<number>>
  ];

  const StepComponent = () => {
    const childProps: ICreateStepProps = {
      step,
      setStep,
      iitineraryId,
      setItineraryId,
    };
    switch (step) {
      case 1:
        return <CreateStep1 {...childProps} />;
      case 2:
        return <CreateStep2 {...childProps} />;
    }
  };

  return (
    <BaseContainer>
      <Sidebar />
      <Main>
        <StepComponent />
      </Main>
    </BaseContainer>
  );
}

export default Create;
