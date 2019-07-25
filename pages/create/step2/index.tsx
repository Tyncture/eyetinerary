import React from "react";
import { ICreateStepProps } from "../types";
import { useState, useCallback, SetStateAction } from "react";
import Router from "next/router";
import * as validator from "./validator";
import { apiPost } from "../../../common/requests";
import { ApiError } from "../../../common/apiError";
import { addItineraryEditToken } from "../../../store/itineraryEditTokens/actions";
import { connect } from "react-redux";

interface IProps extends ICreateStepProps {
  addItineraryEditToken: (id: number, token: string) => {};
}

interface IPagePrototype {
  name: string;
  description: string;
}

function CreateStep2(props: IProps) {
  const [pageName, setPageName] = useState("");
  const [description, setDescription] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [apiError, setApiError] = useState<string>(null);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [pages, setPages] = useState<IPagePrototype[]>([]);

  // Page Form: References
  const nameRef = React.createRef() as React.RefObject<HTMLInputElement>;
  const descriptionRef = React.createRef() as React.RefObject<HTMLInputElement>;

  // Page Form: Submission
  const validateForm = (): boolean => {
    const messages = [];

    const validatePageName = validator.validatePageName(pageName);
    validatePageName.messages.forEach(message => messages.push(message));
    const validateDescription = validator.validateDescription(description);
    validateDescription.messages.forEach(message => messages.push(message));

    // Track errors in function scope array as useState is asynchronous
    setValidationErrors(messages);
    return messages.length === 0;
  };

  const addPage = () => {
    const formValid = validateForm();
    if (formValid) {
      setPageName("");
      setDescription("");
      setPages([...pages, { name: pageName, description }]);
      nameRef.current.focus();
    }
  };

  const submitItinerary = async (): Promise<number> => {
    const response = await apiPost("/itinerary", {
      title: props.itinerary.name,
      description: props.itinerary.description,
    });
    if (response.success) {
      props.addItineraryEditToken(response.body.id, response.body.editToken);
      return response.body.id;
    } else {
      throw new ApiError(response.statusCode);
    }
  };

  const submitPages = async (itineraryId: number) => {
    const requests = pages.map((page, index) => async () => {
      const response = await apiPost("/page", {
        name: page.name,
        description: page.description,
        // TODO: Use a different way of keeping rank once API has been updated
        itinerary: itineraryId,
        rankInItinerary: index,
      });
      if (!response.success) {
        throw new ApiError(response.statusCode);
      }
    });
    await Promise.all(requests);
  };

  const submit = async () => {
    try {
      const itineraryId = await submitItinerary();
      Router.prefetch(`/itinerary/${itineraryId}`);
      try {
        // TODO: Implement submit page logic
        // await submitPages(itineraryId);
        Router.push(`/itinerary/${itineraryId}`);
      } catch (e) {
        // Attempt to delete itinerary as partial creation is not useful
        // Rethrow error for rest of the error handling
        throw e;
      }
    } catch (e) {
      console.error(e.message);
      setApiError(e.message);
    }
  };

  // Page Form: Name
  const handlePageNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPageName(e.target.value),
    [setPageName],
  );
  const handlePageNameEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13 && pageName.length > 0) {
        descriptionRef.current.focus();
      }
    },
    [descriptionRef],
  );

  // Page Form: Description
  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
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

  // Page Form: Add Page
  const handleAddPage = useCallback(() => addPage(), [addPage]);
  const handleFinish = useCallback(() => submit(), [submit]);

  // Page List: Remove
  const RemovePageButton = (childProps: {
    index: number;
    className?: string;
  }) => {
    const handleRemovePage = useCallback(() => {
      setPages(pages.filter((x, index) => index !== childProps.index));
    }, [pages, setPages]);
    return (
      <input
        type="button"
        className={childProps.className}
        name="remove-page"
        value="Remove"
        onClick={handleRemovePage}
      />
    );
  };

  return (
    <div className="create-itinerary-step-2">
      <header className="create-itinerary-step-2-header">
        <h1 className="title">Create Itinerary</h1>
        <div className="sub-title">Now let’s add some pages.</div>
      </header>
      <div className="create-itinerary-step-2-main">
        <section>
          <form className="create-itinerary-step-2-page-form">
            <div className="create-itinerary-step-2-page-form__item">
              <label htmlFor="form-page-name-input">Page Name</label>
              <input
                id="form-page-name-input"
                name="page-name"
                type="text"
                placeholder="Day 1: Settling in"
                value={pageName}
                onChange={handlePageNameChange}
                onKeyUp={handlePageNameEnter}
                ref={nameRef}
              />
            </div>
            <div className="create-itinerary-step-2-page-form__item">
              <label htmlFor="form-page-description-input">
                Page Description
              </label>
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
        </section>
        <section>
          <header>
            <h2 className="title-2">Page List</h2>
          </header>
          <ul className="create-itinerary-step-2-page-list">
            {pages.map((page, index) => (
              <li
                className="create-itinerary-step-2-page-list__item"
                key={index}
              >
                <div className="create-itinerary-step-2-page-list__icon">
                  [icon]
                </div>
                <div className="create-itinerary-step-2-page-list__details">
                  <div className="create-itinerary-step-2-page-list__name">
                    {page.name}
                  </div>
                  <div className="create-itinerary-step-2-page-list__description">
                    {page.description}
                  </div>
                  <RemovePageButton
                    className="create-itinerary-step-2-page-list__remove"
                    index={index}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  addItineraryEditToken: (id: number, token: string) =>
    dispatch(addItineraryEditToken(id, token)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateStep2);
