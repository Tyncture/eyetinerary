import React, { SetStateAction } from "react";
import { useState } from "react";
import CreateStep1 from "./step1";
import { number } from "prop-types";
import { ICreateStepProps } from "./types";

function Create() {
  const [step, setStep] = useState(1);
  const [iitineraryId, setItineraryId] = useState(null);

  const childProps: ICreateStepProps = {
    step,
    setStep,
    iitineraryId,
    setItineraryId,
  };

  switch (step) {
    case 1:
      return <CreateStep1 {...childProps} />;
  }
}

export default Create;
