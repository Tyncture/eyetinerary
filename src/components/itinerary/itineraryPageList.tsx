import React from "react";
import "./itineraryPageList.scss";
import ItineraryPageListItem from "./itineraryPageListItem";
import { IPage } from "./types";

interface IProps {
  pages: IPage[];
}

class ItineraryPageList extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  sortPages(pages: IPage[]): IPage[] {
    return this.props.pages.sort(
      (a, b) => a.rankInItinerary - b.rankInItinerary
    );
  }

  render() {
    return (
      <div className="itinerary-pagelist">
        {this.sortPages(this.props.pages).map(page => (
          <ItineraryPageListItem
            key={page.id}
            id={page.id}
            title={page.title}
            description={page.description}
          />
        ))}
      </div>
    );
  }
}

export default ItineraryPageList;
