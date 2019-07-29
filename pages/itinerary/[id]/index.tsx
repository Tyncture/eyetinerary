import React, { useState, useMemo } from "react";
import BaseContainer from "../../../components/base/baseContainer";
import Sidebar from "../../../components/base/sidebar";
import Main from "../../../components/base/main";
import { apiGet } from "../../../library/common/utils/requests";
import Head from "next/head";
import { connect } from "react-redux";
import { IUser } from "../../../store/user/types";
import { IItinerary } from "../../../library/itinerary/types";
import ItineraryPageList from "../../../components/itinerary/[id]/pageList";
import { IStoreState } from "../../../store/types";
import { useItinerary } from "../../../library/itinerary/common";

interface IProps {
  query: {
    id: string;
    page?: string;
  };
  itinerary?: IItinerary;
  user: IUser;
}

function Itinerary(props: IProps) {
  const [apiError, setApiError] = useState<string>();
  const userToken = props.user.token ? props.user.token : null;
  const itinerary = useItinerary(
    Number(props.query.id),
    props.itinerary,
    userToken,
    setApiError,
  );

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
              <ItineraryPageList itinerary={itinerary} />
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
