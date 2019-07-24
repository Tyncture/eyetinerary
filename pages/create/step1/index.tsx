import React, { useState, useCallback } from "react";
import "./index.scss";
import Router from "next/router";
import { apiPost } from "../../../common/requests";
import { ICreateStepProps } from "../types";

function CreateStep1(props: ICreateStepProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [makePrivate, setMakePrivate] = useState(false);
  const [postAnonymously, setPostAnonymously] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const validateForm = (): boolean => {
    return true;
  };

  const submit = async () => {
    const response = await apiPost("/itinerary", {
      title: name,
      description,
    });
    if (response.success) {
      props.setItineraryId(response.body.id);
      props.setStep(2);
    }
  };

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    [setName],
  );
  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
    [setDescription],
  );
  const handleMakePrivateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setMakePrivate(e.target.checked),
    [setMakePrivate],
  );
  const handlePostAnonymouslyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setPostAnonymously(e.target.checked),
    [setPostAnonymously],
  );
  const handleNext = useCallback(async () => {
    const formValid = validateForm();
    if (formValid) {
      submit();
    }
  }, [validateForm]);

  return (
    <div className="create-itinerary-step-1">
      <header className="create-itinerary-step-1-header">
        <h1 className="title">Create Itinerary</h1>
        <div className="sub-title">
          First, let’s get the basics out of the way.
        </div>
      </header>
      <form className="create-itinerary-step-1-form">
        <div className="create-itinerary-step-1-form-item">
          <label htmlFor="form-name-input">Itinerary Name</label>
          <input
            id="form-name-input"
            name="name"
            type="text"
            placeholder="Winter holiday in Southeast Asia"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="create-itinerary-step-1-form-item">
          <label htmlFor="form-description-input">
            Itinerary Description
          </label>
          <input
            id="form-description-input"
            name="description"
            type="text"
            placeholder="Two weeks in Thailand and Laos"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="create-itinerary-step-1-form-item">
          <label>Privacy Options</label>
          <div className="create-itinerary-step-1-form-item-check-group">
            <div className="create-itinerary-step-1-form-item-check-group-item">
              <input
                id="form-make-private"
                name="make-private"
                type="checkbox"
                checked={makePrivate}
                onChange={handleMakePrivateChange}
              />
              <label htmlFor="form-make-private">
                Make this itinerary private
              </label>
            </div>
            <div className="create-itinerary-step-1-form-item-check-group-item">
              <input
                id="form-anonymous"
                name="anonymous"
                type="checkbox"
                checked={postAnonymously}
                onChange={handlePostAnonymouslyChange}
              />
              <label htmlFor="form-anonymous">Create anonymously</label>
            </div>
          </div>
        </div>
        <div className="create-itinerary-step-1-form-bottom-buttons">
          <input
            name="cancel"
            type="button"
            value="Cancel"
            onClick={Router.back}
          />
          <input
            name="next"
            type="button"
            value="Next"
            onClick={handleNext}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateStep1;
