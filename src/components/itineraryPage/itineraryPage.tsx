import React from "react";
import ItineraryAbout from "../itineraryBase/itineraryAbout";
import ItineraryHeader from "../itineraryBase/itineraryHeader";
import ItineraryListItem from "../itineraryBase/itineraryListItem";
import { fetchItinerary } from "../itineraryUtilities/fetcher";
import { IItem, IItinerary, IPage } from "../itineraryUtilities/types";
import "../itineraryBase/itineraryCommon.scss";
import Head from "next/head";

interface IProps {
  itineraryId: number;
  pageNumber: number;
}

interface IState {
  itinerary: IItinerary;
  page: IPage;
  apiErrorStatus: number;
}

const initialState: IState = {
  itinerary: null,
  page: null,
  apiErrorStatus: null
};

class ItineraryPage extends React.Component<IProps, IState> {
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
    // Fetch itinerary first
    const itineraryResponse = await fetchItinerary(this.props.itineraryId);
    const itinerary: IItinerary = itineraryResponse.success
      ? itineraryResponse.body
      : null;

    if (itinerary) {
      this.setState({ itinerary });
      // Find a page with rank matching pageNumber
      itinerary.pages.forEach(itnPage => {
        if (itnPage.rankInItinerary === this.props.pageNumber) {
          // Allow owner to be determined by ItineraryAbout
          itnPage.itinerary = itinerary;
          this.setState({ page: itnPage });
        }
      });
    } else {
      this.setState({ apiErrorStatus: itineraryResponse.statusCode });
    }
  }

  sortItems(items: IItem[]): IItem[] {
    return items.sort((a, b) => a.rankInPage - b.rankInPage);
  }

  render() {
    return (
      <div className="itinerary">
        {this.state.page && (
          <div className="itinerary-section">
            <Head>
              <title>{`${this.state.page.title} - Eyetinerary`}</title>
            </Head>
            <ItineraryHeader
              title={this.state.itinerary.title}
              description={this.state.itinerary.description}
              location="Bangkok"
              countryCode="Thailand"
            />
          </div>
        )}
        {this.state.page && this.state.page.items.length > 0 && (
          <div className="itinerary-section">
            <h1>Items</h1>
            <div className="itinerary-sublist">
              {this.sortItems(this.state.page.items).map(item => (
                <ItineraryListItem
                  key={item.id}
                  h1={item.title}
                  h2="Placeholder"
                />
              ))}
            </div>
          </div>
        )}
        {this.state.page && (
          <div className="itinerary-section">
            <ItineraryAbout subject={this.state.page} />
          </div>
        )}
      </div>
    );
  }
}

export default ItineraryPage;
