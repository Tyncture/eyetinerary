import React from "react";
import moment, { Moment } from "moment";
import { IItinerary } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarPlus,
  faCalendarDay
} from "@fortawesome/free-solid-svg-icons";
import "./itineraryAbout.scss";

interface IProps {
  intinerary: IItinerary;
}

interface IState {
  author: {
    username: string;
  };
}

const initialState: IState = {
  author: null
};

class ItineraryAbout extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    await this.bootstrapState();
  }

  async componentDidUpdate(prevProps: IProps) {
    if (this.props.intinerary !== prevProps.intinerary) {
      this.setState(initialState);
      await this.bootstrapState();
    }
  }

  async bootstrapState(): Promise<void> {
    await this.fetchAuthor();
  }

  async fetchAuthor(): Promise<void> {
    try {
      if (this.props.intinerary.owner) {
        const response = await fetch(
          `${process.env.EYET_API}/user/${this.props.intinerary.owner.id}`
        );
        const json = await response.json();
        if (response.status === 200) {
          this.setState({ author: json });
        } else {
          console.log(json);
        }
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  computeLastUpdated(itinerary: IItinerary): Moment {
    let lastUpdated = moment(itinerary.updated);
    itinerary.pages.forEach(page => {
      const pageUpdated = moment(page.updated);
      if (pageUpdated.isAfter(lastUpdated)) {
        lastUpdated = pageUpdated;
      }
      page.items.forEach(item => {
        const itemUpdated = moment(item.updated);
        if (itemUpdated.isAfter(lastUpdated)) {
          lastUpdated = itemUpdated;
        }
      });
    });
    return lastUpdated;
  }

  render() {
    const readyToDisplayAuthor =
      !this.props.intinerary.owner || this.state.author;
    const authorToDisplay = this.props.intinerary.owner
      ? readyToDisplayAuthor
        ? this.state.author.username
        : ""
      : "Anonymous Submission";
    return (
      <div className="itinerary-about-info">
        {readyToDisplayAuthor && (
          <div className="itinerary-about-info-group">
            <div>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div>Author: {authorToDisplay}</div>
          </div>
        )}
        <div className="itinerary-about-info-group">
          <div>
            <FontAwesomeIcon icon={faCalendarPlus} />
          </div>
          <div>Created: {moment(this.props.intinerary.created).fromNow()}</div>
        </div>
        <div className="itinerary-about-info-group">
          <div>
            <FontAwesomeIcon icon={faCalendarDay} />
          </div>
          <div>
            Last Updated:{" "}
            {this.computeLastUpdated(this.props.intinerary).fromNow()}
          </div>
        </div>
      </div>
    );
  }
}

export default ItineraryAbout;
