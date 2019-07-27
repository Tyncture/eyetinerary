import React, { useCallback, useState, SetStateAction, createRef } from "react";
import * as validator from "./validator";
import "../../common.scss";
import "./index.scss";
import { IPagePrototype } from "../../types";

interface IProps {
  pages: IPagePrototype[];
  setPages: React.Dispatch<SetStateAction<IPagePrototype[]>>;
  setStep: React.Dispatch<SetStateAction<number>>;
  submit: () => {};
}

function CreateStep2PageForm(props: IProps) {
  // State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  // References
  const nameRef = createRef<HTMLInputElement>();
  const descriptionRef = createRef<HTMLInputElement>();

  // Validation and page addition
  const validateForm = (): boolean => {
    const messages = [];

    const validateName = validator.validateName(name);
    validateName.messages.forEach(message => messages.push(message));
    const validateDescription = validator.validateDescription(description);
    validateDescription.messages.forEach(message => messages.push(message));

    // Track errors in function scope array as useState is asynchronous
    setValidationErrors(messages);
    return messages.length === 0;
  };

  const addPage = () => {
    const formValid = validateForm();
    if (formValid) {
      setName("");
      setDescription("");
      props.setPages([
        ...props.pages,
        {
          name,
          description,
        },
      ]);
      nameRef.current.focus();
    }
  };

  // Name
  const handlePageNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    [setName],
  );
  const handlePageNameEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13 && name.length > 0) {
        descriptionRef.current.focus();
      }
    },
    [descriptionRef],
  );

  // Description
  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setDescription(e.target.value),
    [setDescription],
  );
  const handleDescriptionEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13 && description.length > 0) {
        addPage();
      }
    },
    [addPage],
  );

  // Buttons
  const handleAddPage = useCallback(() => addPage(), [addPage]);
  const handleBack = useCallback(() => props.setStep(1), [addPage]);
  const handleFinish = useCallback(() => props.submit(), [props.submit]);

  return (
    <form className="create-itinerary-form">
      <div className="create-itinerary-form__elem">
        <label htmlFor="form-page-name-input">Page Name</label>
        <input
          id="form-page-name-input"
          name="page-name"
          type="text"
          placeholder="Day 1: Settling in"
          value={name}
          onChange={handlePageNameChange}
          onKeyUp={handlePageNameEnter}
          ref={nameRef}
        />
      </div>
      <div className="create-itinerary-form__elem">
        <label htmlFor="form-page-description-input">Page Description</label>
        <input
          id="form-page-description-input"
          name="page-description"
          type="text"
          placeholder="Checking in from the airport"
          value={description}
          onChange={handleDescriptionChange}
          onKeyUp={handleDescriptionEnter}
          ref={descriptionRef}
        />
      </div>
      <div className="create-itinerary-step-2-form__button_row">
        <input
          className="button-wide grid-area-a"
          name="add-page"
          type="button"
          value="Add Page"
          onClick={handleAddPage}
        />
        {/* TODO: Add divider here */}
        <input
          className="button-wide grid-area-b"
          name="back"
          type="button"
          value="Back"
          onClick={handleBack}
        />
        <input
          className=" button-wide grid-area-c"
          name="finish"
          type="button"
          value="Finish"
          onClick={handleFinish}
        />
      </div>
    </form>
  );
}

export default CreateStep2PageForm;
