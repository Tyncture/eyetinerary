import Router from "next/router";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { ApiError } from "../../../common/apiError";
import { apiDelete, apiPost } from "../../../common/requests";
import { addItineraryEditToken } from "../../../store/itineraryEditTokens/actions";
import { IUser } from "../../../store/user/types";
import { ICreateStepProps } from "../types";
import { IPagePrototype } from "./types";
import PageForm from "./pageForm";

interface IProps extends ICreateStepProps {
  user: IUser;
  addItineraryEditToken: (id: number, token: string) => {};
}

function CreateStep2(props: IProps) {
  // State
  const [pages, setPages] = useState<IPagePrototype[]>([]);
  const [apiError, setApiError] = useState<string>();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  // Submission
  const submitItinerary = async (): Promise<{
    id: number;
    editToken: string;
  }> => {
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

  // TODO: Move sections into separate components
  return (
    <div className="create-itinerary-step-2">
      <header className="create-itinerary-step-2-header">
        <h1 className="title">Create Itinerary</h1>
        <div className="sub-title">Now let’s add some pages.</div>
      </header>
      <div className="create-itinerary-step-2-main">
        <section />
        <PageForm pages={pages} setPages={setPages} submit={submit} />
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
