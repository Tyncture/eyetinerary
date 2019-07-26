import Router from "next/router";
import React, { useState } from "react";
import { connect } from "react-redux";
import { ApiError } from "../../../common/errors/apiError";
import { apiDelete, apiPost } from "../../../common/utils/requests";
import { addItineraryEditToken } from "../../../store/itineraryEditTokens/actions";
import { IUser } from "../../../store/user/types";
import { ICreateStepProps } from "../types";
import CreateStep2PageForm from "./pageForm";
import CreateStep2PageList from "./pageList";
import { IPagePrototype } from "./types";
import "../common.scss";

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
    const userToken = props.user.token ? props.user.token : null;
    const response = await apiPost(
      "/itinerary",
      {
        title: props.itinerary.name,
        description: props.itinerary.description,
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
  };

  const retractItinerary = async (itineraryId: number, editToken: string) => {
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
  };

  const submitPages = async (itineraryId: number, editToken: string) => {
    const requests = pages.map(
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

  // TODO: Step 3 for items and move submit to separate component
  return (
    <div className="create-itinerary-step">
      <header>
        <h1 className="title">Create Itinerary</h1>
        <div className="sub-title">Now let’s add some pages.</div>
      </header>
      <div className="create-itinerary-step__main">
        <section>
          <CreateStep2PageForm
            pages={pages}
            setPages={setPages}
            submit={submit}
          />
        </section>
        <section>
          <CreateStep2PageList pages={pages} setPages={setPages} />
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
