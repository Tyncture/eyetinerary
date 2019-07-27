import Head from "next/head";
import React, { useState } from "react";
import BaseContainer from "../../components/base/baseContainer";
import Main from "../../components/base/main";
import Sidebar from "../../components/base/sidebar";
import CreateStep1 from "./step1";
import CreateStep2 from "./step2";
import { ICreateStepProps } from "./types";

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
      <Sidebar />
      <Main>
        <StepComponent />
      </Main>
    </BaseContainer>
  );
}

export default Create;
