import Router from "next/router";
import React, { createRef, useCallback, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  setCreateItineraryDescription,
  setCreateItineraryName,
} from "../../../store/createItinerary/actions";
import { IStoreState } from "../../../store/types";
import * as validator from "../../../library/create/step1/validator";
import { ICreateStepProps } from "../../../library/create/types";
import "../common.scss";

interface IProps extends ICreateStepProps {
  name: string;
  description: string;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
}

function CreateStep1(props: IProps) {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [makePrivate, setMakePrivate] = useState(false);
  const [postAnonymously, setPostAnonymously] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  // Input Field References
  const nameFieldRef = createRef<HTMLInputElement>();
  const descriptionFieldRef = createRef<HTMLInputElement>();

  // Validation logic
  const validateForm = useCallback(() => {
    const messages = [];

    // Validate name and focus on error
    const validateName = validator.validateName(name);
    validateName.messages.forEach(message => messages.push(message));
    if (validateName.error) {
      nameFieldRef.current.focus();
    }

    // Validate description
    const validateDescription = validator.validateDescription(description);
    validateDescription.messages.forEach(message => messages.push(message));

    // Track errors in function scope array as useState is asynchronous
    setValidationErrors(messages);
    return messages.length === 0;
  }, [name, description, nameFieldRef]);

  const validateAndProceed = useCallback(() => {
    const formValid = validateForm();
    if (formValid) {
      props.setName(name.trim());
      props.setDescription(description.trim());
      props.setStep(2);
    }
  }, [validateForm]);


  // Name Field
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    [setName],
  );
  const handleNameEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13 && name.length > 0) {
        descriptionFieldRef.current.focus();
      }
    },
    [descriptionFieldRef],
  );

  // Description Field
  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
    [setDescription],
  );
  const handleDescriptionEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13 && name.length > 0) {
        validateAndProceed();
      }
    },
    [validateAndProceed],
  );

  // Make Private Field
  const handleMakePrivateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setMakePrivate(e.target.checked),
    [setMakePrivate],
  );

  // Post Anonymously Field
  const handlePostAnonymouslyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setPostAnonymously(e.target.checked),
    [setPostAnonymously],
  );

  return (
    <div className="create-itinerary-step">
      <header>
        <h1 className="title">Create Itinerary</h1>
        <div className="sub-title">
          First, let’s get the basics out of the way.
        </div>
      </header>
      <form className="create-itinerary-form">
        <div className="create-itinerary-form__elem">
          <label className="title-2" htmlFor="form-name-input">
            Itinerary Name
          </label>
          <input
            id="form-name-input"
            name="name"
            type="text"
            maxLength={50}
            placeholder="Winter holiday in Southeast Asia"
            value={name}
            onChange={handleNameChange}
            onKeyUp={handleNameEnter}
            ref={nameFieldRef}
          />
        </div>
        <div className="create-itinerary-form__elem">
          <label className="title-2" htmlFor="form-description-input">
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
            onKeyUp={handleDescriptionEnter}
            ref={descriptionFieldRef}
          />
        </div>
        <div className="create-itinerary-form__elem">
          <label className="title-2">Privacy Options</label>
          <div className="create-itinerary-form__checkgroup">
            <div className="create-itinerary-form__checkgroup_elem">
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
            <div className="create-itinerary-form__checkgroup_elem">
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
        <div className="create-itinerary-form__button_row button-wide-row">
          <input
            className="button button--wide"
            name="cancel"
            type="button"
            value="Cancel"
            onClick={Router.back}
          />
          <input
            className="button button--wide"
            name="next"
            type="button"
            value="Next"
            onClick={validateAndProceed}
          />
        </div>
      </form>
    </div>
  );
}

/* 
  Share state between steps using Redux to avoid tree rerenders
  resetting form component state when passing state up
*/
const mapStateToProps = (state: IStoreState) => ({
  name: state.createItinerary.name,
  description: state.createItinerary.description,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setName: (name: string) => dispatch(setCreateItineraryName(name)),
  setDescription: (description: string) =>
    dispatch(setCreateItineraryDescription(description)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateStep1);
