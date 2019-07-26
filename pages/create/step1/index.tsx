import React, { useState, useCallback, createRef } from "react";
import "./index.scss";
import Router from "next/router";
import { ICreateStepProps } from "../types";
import *  as validator from "./validator";

function CreateStep1(props: ICreateStepProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [makePrivate, setMakePrivate] = useState(false);
  const [postAnonymously, setPostAnonymously] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  // Input Field References
  const nameFieldRef = createRef<HTMLInputElement>();

  const validateForm = (): boolean => {
    const messages = [];

    const validateName = validator.validateName(name);
    validateName.messages.forEach(message => messages.push(message));
    if (validateName.error) {
      nameFieldRef.current.focus();
    }

    const validateDescription = validator.validateDescription(description);
    validateDescription.messages.forEach(message => messages.push(message));
    
    // Track errors in function scope array as useState is asynchronous
    setValidationErrors(messages);
    return messages.length === 0;
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
      props.setItinerary({ name, description });
      props.setStep(2);
    }
  }, [validateForm]);

  return (
    <div className="create-itinerary-step-1">
      <header className="create-itinerary-step-1__header">
        <h1 className="title">Create Itinerary</h1>
        <div className="sub-title">
          First, let’s get the basics out of the way.
        </div>
      </header>
      <form className="create-itinerary-step-1-form">
        <div className="create-itinerary-step-1-form__elem">
          <label htmlFor="form-name-input">Itinerary Name</label>
          <input
            id="form-name-input"
            name="name"
            type="text"
            maxLength={50}
            placeholder="Winter holiday in Southeast Asia"
            value={name}
            onChange={handleNameChange}
            ref={nameFieldRef}
          />
        </div>
        <div className="create-itinerary-step-1-form__elem">
          <label htmlFor="form-description-input">
            Itinerary Description
          </label>
          <input
            id="form-description-input"
            name="description"
            type="text"
            maxLength={100}
            placeholder="Two weeks in Thailand and Laos"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="create-itinerary-step-1-form__elem">
          <label>Privacy Options</label>
          <div className="create-itinerary-step-1-form__checkgroup">
            <div className="create-itinerary-step-1-form__checkgroup_elem">
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
            <div className="create-itinerary-step-1-form__checkgroup_elem">
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
        <div className="create-itinerary-step-1-form__button_row button-wide-row">
          <input
            className="button-wide"
            name="cancel"
            type="button"
            value="Cancel"
            onClick={Router.back}
          />
          <input
            className="button-wide"
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
