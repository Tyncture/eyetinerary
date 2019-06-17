import Head from "next/head";
import React from "react";
import ItineraryAbout from "../itineraryBase/itineraryAbout";
import "../itineraryBase/itineraryCommon.scss";
import ItineraryListItem from "../itineraryBase/itineraryListItem";
import { fetchItinerary } from "../itineraryUtilities/fetcher";
import { IItem, IItinerary, IPage } from "../itineraryUtilities/types";

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
    if (
      this.props.itineraryId !== prevProps.itineraryId ||
      this.props.pageNumber !== prevProps.pageNumber
    ) {
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
      <div>
        {this.state.page && (
          <Head>
            <title>{`${this.state.page.title} - Eyetinerary`}</title>
          </Head>
        )}
        <div className="itinerary">
          {this.state.page && this.state.page.items.length > 0 && (
            <section className="itinerary-section">
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
            </section>
          )}
          {this.state.page && (
            <section className="itinerary-section">
              <ItineraryAbout subject={this.state.page} />
            </section>
          )}
        </div>
      </div>
    );
  }
}

export default ItineraryPage;
