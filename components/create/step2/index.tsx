import Router from "next/router";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ICreateItinerary } from "../../../store/createItinerary/types";
import { addItineraryEditToken } from "../../../store/itineraryEditTokens/actions";
import { IStoreState } from "../../../store/types";
import { IUser } from "../../../store/user/types";
import "../common.scss";
import CreateStep2PageForm from "./pageForm";
import CreateStep2PageList from "./pageList";
import { clearCreateItinerary } from "../../../store/createItinerary/actions";
import { ICreateStepProps } from "../../../library/create/types";
import { apiPost, apiDelete } from "../../../library/common/utils/requests";
import { ApiError } from "../../../library/common/errors/apiError";

interface IProps extends ICreateStepProps, ICreateItinerary {
  user: IUser;
  addItineraryEditToken: (id: number, token: string) => {};
  clearCreateItinerary: () => void;
}

function CreateStep2(props: IProps) {
  // State
  const [apiError, setApiError] = useState<string>();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  // Submission
  async function submitItinerary(): Promise<{
    id: number;
    editToken: string;
  }> {
    const userToken = props.user.token ? props.user.token : null;
    const response = await apiPost(
      "/itinerary",
      {
        title: props.name,
        description: props.description,
      },
      userToken,
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
  }

  async function retractItinerary(itineraryId: number, editToken: string) {
    const userToken = props.user.token ? props.user.token : null;
    const response = await apiDelete(
      `/itinerary/${itineraryId}`,
      { editToken },
      userToken,
    );
    if (response.success) {
      console.log(`Itinerary ${itineraryId} deleted due to failed creation.`);
    } else {
      throw new ApiError(response.statusCode);
    }
  }

  async function submitPages(itineraryId: number, editToken: string) {
    const requests = props.pages.map(
      (page, index) =>
        new Promise((resolve, reject) => {
          const userToken = props.user.token ? props.user.token : null;
          apiPost(
            "/page",
            {
              title: page.name,
              description: page.description,
              itinerary: itineraryId,
              rankInItinerary: index + 1,
              editToken,
            },
            userToken,
          ).then(response =>
            response.success
              ? resolve()
              : reject(new ApiError(response.statusCode)),
          );
        }),
    );
    await Promise.all(requests);
  }

  async function submit() {
    try {
      const itineraryResponse = await submitItinerary();
      try {
        await submitPages(itineraryResponse.id, itineraryResponse.editToken);
        Router.push("/itinerary/[id]", `/itinerary/${itineraryResponse.id}`);
        props.clearCreateItinerary();
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
  }

  // TODO: Step 3 for items and move submit to separate component
  return (
    <div className="create-itinerary-step">
      <header>
        <h1 className="title">Create Itinerary</h1>
        <div className="sub-title">Now let’s add some pages.</div>
      </header>
      <div className="create-itinerary-step__main">
        <section>
          <CreateStep2PageForm setStep={props.setStep} submit={submit} />
        </section>
        <section>
          <CreateStep2PageList />
        </section>
      </div>
    </div>
  );
}

/* 
  Share state between steps using Redux to avoid tree rerenders
  resetting form component state when passing state up
*/
const mapStateToProps = (state: IStoreState) => ({
  ...state.createItinerary,
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addItineraryEditToken: (id: number, token: string) =>
    dispatch(addItineraryEditToken(id, token)),
  clearCreateItinerary: () => dispatch(clearCreateItinerary()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateStep2);
