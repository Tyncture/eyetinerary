import React, { useCallback, useState, SetStateAction } from "react";
import { IPagePrototype } from "../types";
import * as validator from "./validator";

interface IProps {
  pages: IPagePrototype[];
  setPages: React.Dispatch<SetStateAction<IPagePrototype[]>>;
  submit: () => {};
}

export function PageForm(props: IProps) {
  // State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  // References
  const nameRef = React.createRef() as React.RefObject<HTMLInputElement>;
  const descriptionRef = React.createRef() as React.RefObject<HTMLInputElement>;

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
  const handleFinish = useCallback(() => props.submit(), [props.submit]);

  return (
    <form className="create-itinerary-step-2-page-form">
      <div className="create-itinerary-step-2-page-form__item">
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
      <div className="create-itinerary-step-2-page-form__item">
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
      <div>
        <input
          name="finish"
          type="button"
          value="Finish"
          onClick={handleFinish}
        />
        <input
          name="add-page"
          type="button"
          value="Add Page"
          onClick={handleAddPage}
        />
      </div>
    </form>
  );
}

export default PageForm;
