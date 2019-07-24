import React from "react";
import { useState } from "react";
import CreateStep1 from "./step1";

function Create() {
  const [step, setStep] = useState(1);
  const StepContext = React.createContext(step);

  const StepView = () => {
    switch (step) {
      case 1:
        return <CreateStep1 setStep={setStep} />;
    }
  };

  return (
    <StepContext.Provider value={step}>
      <StepView />
    </StepContext.Provider>
  );
}

export default Create;