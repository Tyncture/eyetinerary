import React, { SetStateAction } from "react";
import { useState } from "react";
import CreateStep1 from "./step1";
import { ICreateStepProps, IItineraryPrototype } from "./types";
import BaseContainer from "../../components/base/baseContainer";
import Sidebar from "../../components/base/sidebar";
import Main from "../../components/base/main";
import CreateStep2 from "./step2";
import Head from "next/head";

function Create() {
  const [step, setStep] = useState(1);
  const [itinerary, setItinerary] = useState<IItineraryPrototype>(null);

  const StepComponent = () => {
    const childProps: ICreateStepProps = {
      step,
      setStep,
      itinerary,
      setItinerary,
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
