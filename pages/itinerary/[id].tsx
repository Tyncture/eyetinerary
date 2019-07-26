import React, { useState, useEffect } from "react";
import BaseContainer from "../../components/base/baseContainer";
import Sidebar from "../../components/base/sidebar";
import Main from "../../components/base/main";
import { apiGet } from "../../common/utils/requests";
import Head from "next/head";
import { connect } from "react-redux";
import { IUser } from "../../store/user/types";
import { ApiError } from "../../common/errors/apiError";

interface IItinerary {
  id: number;
  title: string;
  description: string;
}

interface IProps {
  query: {
    id: string;
  };
  itinerary?: IItinerary;
  user: IUser;
}

function Itinerary(props: IProps) {
  const [itinerary, setItinerary] = useState<IItinerary>(props.itinerary);
  const [apiError, setApiError] = useState<string>();

  const retrieveData = async () => {
    const bearerToken = props.user.token ? props.user.token : null;
    const response = await apiGet(`/itinerary/${props.query.id}`, bearerToken);
    if (response.success) {
      setItinerary(response.body);
    } else {
      const error = new ApiError(response.statusCode);
      setApiError(error.message);
    }
  };

  useEffect(() => {
    // Retrieve itinerary if not already done so successfully by
    // server-side renderer or router query id changes
    if (!itinerary || itinerary.id !== Number(props.query.id)) {
      retrieveData();
    }
  }, [itinerary, props]);

  const pageTitle = () =>
    `${itinerary ? `${itinerary.title} - ` : ""}Eyetinerary`;

  return (
    <BaseContainer>
      <Head>
        <title>{pageTitle()}</title>
      </Head>
      <Sidebar />
      <Main>{JSON.stringify(itinerary)}</Main>
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

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Itinerary);
