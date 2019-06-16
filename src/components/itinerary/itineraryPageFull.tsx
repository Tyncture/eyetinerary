import React from "react";
import { IPage, IItem } from "./types";
import "./itineraryPageFull.scss";

interface IProps {
  page: IPage;
}

class ItineraryPageFull extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    console.log(props);
  }

  sortItems(items: IItem[]): IItem[] {
    // return items.sort((a, b) => a.rankInPage - b.rankInPage);
    return items;
  }

  render() {
    return (
      <div className="itinerary-page-full">
        {this.sortItems(this.props.page.items).map(item => (
          <div key={item.id} className="itinerary-page-full-item">
            <div className="itinerary-page-full-item-body">
              <h1>{item.title}</h1>
              <h2>Testing.</h2>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ItineraryPageFull;
