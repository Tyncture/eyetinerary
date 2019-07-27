import React, { useState, useEffect, useMemo } from "react";
import BaseContainer from "../../../components/base/baseContainer";
import Sidebar from "../../../components/base/sidebar";
import Main from "../../../components/base/main";
import { apiGet } from "../../../common/utils/requests";
import Head from "next/head";
import { connect } from "react-redux";
import { IUser } from "../../../store/user/types";
import { ApiError } from "../../../common/errors/apiError";
import { IItinerary } from "../types";
import ItineraryPageList from "./pageList";
import { IStoreState } from "../../../store/types";

interface IProps {
  query: {
    id: string;
    page?: string;
  };
  itinerary?: IItinerary;
  user: IUser;
}

function Itinerary(props: IProps) {
  console.log(props);
  const [itinerary, setItinerary] = useState<IItinerary>(props.itinerary);
  const [apiError, setApiError] = useState<string>();

  async function retrieveData() {
    const bearerToken = props.user.token ? props.user.token : null;
    const response = await apiGet(`/itinerary/${props.query.id}`, bearerToken);
    if (response.success) {
      setItinerary(response.body);
    } else {
      const error = new ApiError(response.statusCode);
      setApiError(error.message);
    }
  }

  useEffect(() => {
    // Retrieve itinerary if not already done so successfully by
    // server-side renderer or router query id changes
    if (!itinerary || itinerary.id !== Number(props.query.id)) {
      retrieveData();
    }
  }, [itinerary, props]);

  // Computed values
  const pageTitle = useMemo(
    () => `${itinerary ? `${itinerary.title} - ` : ""}Eyetinerary`,
    [itinerary],
  );

  return (
    <BaseContainer>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Sidebar />
      <Main>
        {itinerary && (
          <div>
            <header>
              <h1 className="title">{itinerary.title}</h1>
              <div className="sub-title">{itinerary.description}</div>
            </header>
            <div>
              <h2 className="title-2">Pages</h2>
              <ItineraryPageList
                itinerary={itinerary}
                setItinerary={setItinerary}
              />
            </div>
          </div>
        )}
      </Main>
    </BaseContainer>
  );
}

Itinerary.getInitialProps = async ({ query }) => {
  const props = { query, itinerary: null };
  const response = await apiGet(`/itinerary/${query.id}`);
  if (response.success) {
    props.itinerary = response.body;
  }
  return props;
};

const mapStateToProps = (state: IStoreState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Itinerary);
