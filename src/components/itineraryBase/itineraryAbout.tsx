import React from "react";
import moment, { Moment } from "moment";
import { IItinerary, IPage, IItem } from "../itineraryUtilities/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarPlus,
  faCalendarDay
} from "@fortawesome/free-solid-svg-icons";
import "./itineraryAbout.scss";
import { resolve } from "path";

interface IProps {
  subject: IItinerary | IPage | IItem;
}

interface IState {
  authorId: number;
  author: {
    username: string;
  };
}

const initialState: IState = {
  authorId: null,
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
    if (this.props.subject !== prevProps.subject) {
      this.setState(initialState);
      await this.bootstrapState();
    }
  }

  async bootstrapState(): Promise<void> {
    await this.determineAndSetAuthorId();
    await this.fetchAuthor();
  }

  async fetchAuthor(): Promise<void> {
    try {
      if (this.state.authorId) {
        const response = await fetch(
          `${process.env.EYET_API}/user/${this.state.authorId}`
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

  async determineAndSetAuthorId() {
    // Support IItinerary, IIPage and IItem subjects
    let owner;
    if ("owner" in this.props.subject) {
      // IItinerary
      owner = this.props.subject.owner;
    } else if ("itinerary" in this.props.subject) {
      // IIPage
      owner = this.props.subject.itinerary.owner;
    } else if ("page" in this.props.subject) {
      // IItem
      owner = this.props.subject.page.itinerary.owner;
    }

    if (owner) {
      // Set authorId if there is an owner
      // Use resolve as callback as setState is asynchrnous
      this.setState({ authorId: owner.id }, resolve);
    }
  }

  computeLastUpdated(
    payload: IItinerary | IPage | IItem,
    previous?: Moment
  ): Moment {
    // Support IItinerary, IIPage and IItem subjects
    let lastUpdated = moment(payload.updated);
    if (previous && previous.isAfter(lastUpdated)) {
      lastUpdated = previous;
    }

    if ("pages" in payload) {
      // Payload is an IItinerary
      payload.pages.forEach(page => {
        const pageUpdated = this.computeLastUpdated(page, lastUpdated);
        if (pageUpdated.isAfter(lastUpdated)) {
          lastUpdated = pageUpdated;
        }
      });
    } else if ("items" in payload) {
      // Payload is an IIPage
      payload.items.forEach(item => {
        const itemUpdated = this.computeLastUpdated(item, lastUpdated);
        if (itemUpdated.isAfter(lastUpdated)) {
          lastUpdated = itemUpdated;
        }
      });
    }
    return lastUpdated;
  }

  render() {
    const readyToDisplayAuthor = !this.state.authorId || this.state.author;
    const authorToDisplay = this.state.authorId
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
          <div>Created: {moment(this.props.subject.created).fromNow()}</div>
        </div>
        <div className="itinerary-about-info-group">
          <div>
            <FontAwesomeIcon icon={faCalendarDay} />
          </div>
          <div>
            Last Updated:{" "}
            {this.computeLastUpdated(this.props.subject).fromNow()}
          </div>
        </div>
      </div>
    );
  }
}

export default ItineraryAbout;
