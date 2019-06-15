import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";
import ItineraryHeader from "../components/itinerary/itineraryHeader";
import ItineraryPageList from "../components/itinerary/itineraryPageList";
import { IItinerary } from "../components/itinerary/types";
import validator from "validator";
import Head from "next/head";
import "./itinerary.scss";

interface IProps {
  query: {
    id: string;
    page?: string;
  };
}

interface IState {
  itinerary: IItinerary;
  apiErrorCode: number;
  invalidIdFormat: boolean;
}

class Itinerary extends React.Component<IProps, IState> {
  static getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = {
      itinerary: null,
      apiErrorCode: 200,
      invalidIdFormat: false
    };
  }

  async componentDidMount() {
    await this.bootstrapState();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      await this.bootstrapState();
    }
  }

  async bootstrapState() {
    const validIdFormat =
      this.props.query.id && validator.isNumeric(this.props.query.id);
    if (validIdFormat) {
      this.setState({ invalidIdFormat: false });
      await this.loadItinerary();
    } else {
      this.setState({ invalidIdFormat: true });
    }
  }

  async loadItinerary() {
    try {
      const response = await fetch(
        `${process.env.EYET_API}/itinerary/${this.props.query.id}`
      );
      const httpStatus = response.status;
      const json = await response.json();
      if (httpStatus === 200) {
        this.setState({ itinerary: json, apiErrorCode: 200 });
      } else {
        this.setState({ apiErrorCode: httpStatus });
        console.log(json);
      }
    } catch (e) {
      this.setState({ apiErrorCode: -1 });
    }
  }

  render() {
    return (
      <BaseContainer>
        <Head>
          <title>
            {this.state.itinerary ? `${this.state.itinerary.title} - ` : ""}
            Eyetinerary
          </title>
        </Head>
        <Sidebar />
        <Main>
          {this.props.query.id && !this.state.invalidIdFormat && (
            <div>
              {this.state.itinerary && (
                <div className="itinerary">
                  <section className="itinerary-section">
                    <ItineraryHeader
                      title={this.state.itinerary.title}
                      description="This thing works and will continue to work"
                      location="Bangkok"
                      countryCode="Thailand"
                    />
                  </section>
                  {this.state.itinerary.pages.length > 0 && (
                    <section className="itinerary-section">
                      <h1>Pages</h1>
                      <ItineraryPageList pages={this.state.itinerary.pages} />
                    </section>
                  )}
                  <section className="itinerary-section">
                    <h1>About</h1>
                    <div>
                      <div>
                        <div />
                        <div>Author: Unknown</div>
                      </div>
                      <div>
                        <div />
                        <div>Created: Unknown</div>
                      </div>
                      <div>
                        <div />
                        <div>Last Updated: Unknown</div>
                      </div>
                    </div>
                  </section>
                </div>
              )}
              {this.state.apiErrorCode === 404 && (
                <div>
                  <h1>Itinerary Not Found</h1>
                  <p>
                    The itinerary that you requested cannot be found. It may
                    have been deleted if it was previously accessible.
                  </p>
                </div>
              )}
              {this.state.apiErrorCode !== 200 &&
                this.state.apiErrorCode !== 404 && (
                  <div>
                    <h1>Server Communication Error</h1>
                    <p>
                      Something happened. And it probably wasn't what you
                      expected.
                    </p>
                    <p>
                      <i>HTTP Status Code: {this.state.apiErrorCode}</i>
                    </p>
                  </div>
                )}
            </div>
          )}
          {(!this.props.query.id || this.state.invalidIdFormat) && (
            <div>
              <h1>Itinerary ID Missing</h1>
              <p>
                The itinerary ID is missing or invalid. Please specify the
                itinerary ID as a query parameter in the URL.
              </p>
            </div>
          )}
        </Main>
      </BaseContainer>
    );
  }
}

export default Itinerary;
