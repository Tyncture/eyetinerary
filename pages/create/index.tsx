import Head from "next/head";
import React, { useState } from "react";
import BaseContainer from "../../components/base/baseContainer";
import Sidebar from "../../components/base/sidebar";
import Main from "../../components/base/main";
import CreateStep1 from "../../components/create/step1";
import CreateStep2 from "../../components/create/step2";
import { ICreateStepProps } from "../../library/create/types";

function Create() {
  const [step, setStep] = useState(1);


  const StepComponent = () => {
    const childProps: ICreateStepProps = {
      step,
      setStep,
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
      <Head>
        <title>Create Itinerary - Eyetinerary</title>
      </Head>
      <StepComponent />
    </BaseContainer>
  );
}

export default Create;
