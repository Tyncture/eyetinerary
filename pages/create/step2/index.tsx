import { ICreateStepProps } from "../types";
import { useState, useCallback } from "react";
import Router from "next/router";

function CreateStep2(props: ICreateStepProps) {
  const [pageName, setPageName] = useState("");
  const [description, setDescription] = useState("");

  const handlePageNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPageName(e.target.value),
    [setPageName],
  );
  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
    [setDescription],
  );
  const handleFinish = useCallback(
    () => Router.push(`/itinerary/${props.iitineraryId}`),
    [],
  );

  return (
    <div className="create-itinerary-step-2">
      <header className="create-itinerary-step-2-header">
        <h1 className="title">Create Itinerary</h1>
        <div className="sub-title">Now let’s add some pages.</div>
      </header>
      <div>
        <form>
          <div className="create-itinerary-step-2-form-item">
            <label htmlFor="form-page-name-input">Page Name</label>
            <input
              id="form-page-name-input"
              name="page-name"
              type="text"
              placeholder="Day 1: Settling in"
              value={pageName}
              onChange={handlePageNameChange}
            />
          </div>
          <div className="create-itinerary-step-2-form-item">
            <label htmlFor="form-page-name-input">Page Description</label>
            <input
              id="form-page-name-input"
              name="page-name"
              type="text"
              placeholder="Checking in from the airport"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div>
            <input
              name="finish"
              type="button"
              value="Finish"
              onClick={handleFinish}
            />
            <input name="add-page" type="button" value="Add Page" />
          </div>
        </form>
        <div />
      </div>
    </div>
  );
}

export default CreateStep2;
