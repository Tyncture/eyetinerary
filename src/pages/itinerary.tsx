import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";
import ItineraryHeader from "../components/itinerary/itineraryHeader";
import ItineraryPageList from "../components/itinerary/itineraryPageList";
import { IItinerary } from "../components/itinerary/types";
import "./itinerary.scss";

interface IProps {
  query: {
    id: string;
    page?: string;
  };
}

interface IState {
  itinerary: IItinerary;
}

class Itinerary extends React.Component<IProps, IState> {
  static getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = {
      itinerary: null
    };
  }

  async componentDidMount() {
    this.setState({
      itinerary: await this.getItinerary(this.props.query.id)
    });
  }

  async getItinerary(id: number | string): Promise<IItinerary> {
    const response = await fetch(`${process.env.EYET_API}/itinerary/${id}`);
    return response.status === 200 ? await response.json() : null;
  }

  render() {
    return (
      <BaseContainer>
        <Sidebar />
        <Main>
          {this.state.itinerary && (
            <div className="itinerary">
              <ItineraryHeader
                title={this.state.itinerary.title}
                description="This thing works and will continue to work"
                location="Bangkok"
                countryCode="Thailand"
              />
              <ItineraryPageList pages={this.state.itinerary.pages} />
            </div>
          )}
        </Main>
      </BaseContainer>
    );
  }
}

export default Itinerary;
