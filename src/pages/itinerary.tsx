import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";
import ItineraryOverview from "../components/itineraryOverview/itineraryOverview";
import ItineraryPage from "../components/itineraryPage/itineraryPage";

interface IProps {
  query: {
    id: string;
    page?: string;
    item?: string;
  };
}

class Itinerary extends React.Component<IProps> {
  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <BaseContainer>
        <Sidebar />
        <Main>
          {this.props.query.id && !this.props.query.page && (
            <ItineraryOverview id={Number(this.props.query.id)} />
          )}
          {this.props.query.id && this.props.query.page && (
            <ItineraryPage
              itineraryId={Number(this.props.query.id)}
              pageNumber={Number(this.props.query.page)}
            />
          )}
        </Main>
      </BaseContainer>
    );
  }
}

export default Itinerary;
