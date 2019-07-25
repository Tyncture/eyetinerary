import Router from "next/router";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { ApiError } from "../../../common/apiError";
import { apiDelete, apiPost } from "../../../common/requests";
import { addItineraryEditToken } from "../../../store/itineraryEditTokens/actions";
import { IUser } from "../../../store/user/types";
import { ICreateStepProps } from "../types";
import * as validator from "./validator";

interface IProps extends ICreateStepProps {
  user: IUser;
  addItineraryEditToken: (id: number, token: string) => {};
}

interface IPagePrototype {
  name: string;
  description: string;
}

interface IItineraryResponse {
  id: number;
  editToken: string;
}

function CreateStep2(props: IProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState<IPagePrototype[]>([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [apiError, setApiError] = useState<string>();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  // Page Form: References
  const nameRef = React.createRef() as React.RefObject<HTMLInputElement>;
  const descriptionRef = React.createRef() as React.RefObject<HTMLInputElement>;

  // Page Form: Submission
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
      setPages([...pages, { name, description }]);
      nameRef.current.focus();
    }
  };

  const submitItinerary = async (): Promise<IItineraryResponse> => {
    const response = await apiPost(
      "/itinerary",
      {
        title: props.itinerary.name,
        description: props.itinerary.description,
      },
      props.user.token ? props.user.token : null,
    );
    if (response.success) {
      props.addItineraryEditToken(response.body.id, response.body.editToken);
      return {
        id: response.body.id,
        editToken: response.body.editToken,
      };
    } else {
      throw new ApiError(response.statusCode);
    }
  };

  const retractItinerary = async (itineraryId: number, editToken: string) => {
    const response = await apiDelete(
      `/itinerary/${itineraryId}`,
      { editToken },
      props.user.token ? props.user.token : null,
    );
    if (response.success) {
      console.log(`Itinerary ${itineraryId} deleted due to failed creation.`);
    } else {
      throw new ApiError(response.statusCode);
    }
  };

  const submitPages = async (itineraryId: number, editToken: string) => {
    const requests = pages.map(
      (page, index) =>
        new Promise((resolve, reject) => {
          apiPost(
            "/page",
            {
              // TODO: Use a different way of keeping rank once API has been updated
              title: page.name,
              description: page.description,
              itinerary: itineraryId,
              rankInItinerary: index + 1,
              editToken,
            },
            props.user.token ? props.user.token : null,
          ).then(response =>
            response.success
              ? resolve()
              : reject(new ApiError(response.statusCode)),
          );
        }),
    );
    await Promise.all(requests);
  };

  const submit = async () => {
    try {
      const itineraryResponse = await submitItinerary();
      try {
        await submitPages(itineraryResponse.id, itineraryResponse.editToken);
        Router.push("/itinerary/[id]", `/itinerary/${itineraryResponse.id}`);
      } catch (e) {
        // Attempt to delete itinerary as partial creation is not useful
        await retractItinerary(
          itineraryResponse.id,
          itineraryResponse.editToken,
        );
        throw e;
      }
    } catch (e) {
      console.error(e.message);
      setApiError(e.message);
    }
  };

  // Page Form: Name
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
                value={name}
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

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  addItineraryEditToken: (id: number, token: string) =>
    dispatch(addItineraryEditToken(id, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateStep2);
