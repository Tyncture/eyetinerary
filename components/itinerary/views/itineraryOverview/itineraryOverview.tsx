import Head from "next/head";
import { SingletonRouter, withRouter } from "next/router";
import React from "react";
import ItineraryAbout from "../../base/itineraryAbout";
import "../../base/itineraryCommon.scss";
import ItineraryListItem from "../../base/itineraryListItem";
import { getItinerary } from "../../../../common/utils/requests";
import { IItinerary, IPage } from "../../common/types";

interface IProps {
  id: number;
  router: SingletonRouter;
}

interface IState {
  itinerary: IItinerary;
  apiErrorCode: number;
}

const initialState: IState = {
  itinerary: null,
  apiErrorCode: null
};

class ItineraryOverview extends React.Component<IProps, IState> {
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
    if (this.props.id !== prevProps.id) {
      this.setState(initialState);
      await this.bootstrapState();
    }
  }

  async bootstrapState() {
    await this.loadItinerary();
  }

  async loadItinerary() {
    const response = await getItinerary(this.props.id);
    if (response.success) {
      this.setState({ itinerary: response.body });
      this.state.itinerary.pages.forEach(page => {
        // Prefetch pages in itinerary
        this.props.router.prefetch(
          `/itinerary?id=${this.props.id}&page=${page.rankInItinerary}`
        );
      });
    } else {
      this.setState({ apiErrorCode: response.statusCode });
    }
  }

  sortPages(pages: IPage[]): IPage[] {
    return pages.sort((a, b) => a.rankInItinerary - b.rankInItinerary);
  }

  handlePageClick(path: string, as: string, e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.props.router.push(path, as);
  }

  render() {
    return (
      <div>
        {this.state.itinerary && (
          <div className="itinerary">
            <Head>
              <title>{`${this.state.itinerary.title} - Eyetinerary`}</title>
            </Head>
            {this.state.itinerary.pages.length > 0 && (
              <section className="itinerary-section">
                <h3>Pages</h3>
                <div className="itinerary-sublist">
                  {this.sortPages(this.state.itinerary.pages).map(page => (
                    <ItineraryListItem
                      onClick={this.handlePageClick.bind(
                        this,
                        `/itinerary?id=${this.props.id}&page=${
                          page.rankInItinerary
                        }`,
                        `/itinerary/${this.props.id}/${page.rankInItinerary}`
                      )}
                      key={page.id}
                      h1={page.title}
                      h2="Placeholder"
                    />
                  ))}
                </div>
              </section>
            )}
            <section className="itinerary-section">
              <ItineraryAbout subject={this.state.itinerary} />
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ItineraryOverview);
