import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";
import ItineraryOverview from "../components/itineraryOverview/itineraryOverview";
import ItineraryPage from "../components/itineraryPage/itineraryPage";
import { IItinerary } from "../components/itineraryUtilities/types";
import { fetchItinerary } from "../components/itineraryUtilities/fetcher";
import validator from "validator";
import ItineraryHeader from "../components/itineraryBase/itineraryHeader";

interface IProps {
  query: {
    id: string;
    page?: string;
    item?: string;
  };
}

interface IState {
  itinerary: IItinerary;
  apiErrorCode: number;
}

const initialState: IState = {
  itinerary: null,
  apiErrorCode: null
};

class Itinerary extends React.Component<IProps, IState> {
  static getInitialProps({ query }) {
    return { query };
  }

  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    await this.bootstrapState();
  }

  async componentDidUpdate(prevProps: IProps) {
    if (this.props !== prevProps) {
      this.setState(initialState);
      await this.bootstrapState();
    }
  }

  async bootstrapState() {
    if (this.propsAcceptable()) {
      const response = await fetchItinerary(Number(this.props.query.id));
      if (response.success) {
        this.setState({ itinerary: response.body });
      } else {
        this.setState({ apiErrorCode: response.statusCode });
      }
    }
  }

  propsAcceptable(): boolean {
    const itineraryIdAcceptable = this.props.query.id
      ? validator.isNumeric(this.props.query.id)
      : true;
    const pageNumberAcceptable = this.props.query.page
      ? validator.isNumeric(this.props.query.page)
      : true;
    const itemNumberAcceptable = this.props.query.item
      ? validator.isNumeric(this.props.query.item)
      : true;
    return (
      itineraryIdAcceptable && pageNumberAcceptable && itemNumberAcceptable
    );
  }

  render() {
    return (
      <BaseContainer>
        <Sidebar />
        <Main>
          {this.propsAcceptable() && (
            <div>
              {this.state.itinerary && (
                <ItineraryHeader
                  title={this.state.itinerary.title}
                  description="Testing React Frontend"
                  location="Chiang Mai"
                  countryCode="Thailand"
                  className="itinerary-header--with-margin-bottom"
                />
              )}
              {/* Dynamic URL routing /itinerary/:id/:page for Next.js */}
              {/* /itinerary/:id */
              this.props.query.id && !this.props.query.page && (
                <ItineraryOverview id={Number(this.props.query.id)} />
              )}
              {/* /itinerary/:id/:page */
              this.props.query.id && this.props.query.page && (
                <ItineraryPage
                  itineraryId={Number(this.props.query.id)}
                  pageNumber={Number(this.props.query.page)}
                />
              )}
            </div>
          )}
        </Main>
      </BaseContainer>
    );
  }
}

export default Itinerary;
