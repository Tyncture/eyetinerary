import React from 'react';
import './itineraryPageListItem.scss';
import { IPage } from './types';

class ItineraryPageListItem extends React.Component<IPage> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="itinerary-pagelist-item">
        <div className="itinerary-pagelist-item-body">
          <h1>{this.props.title}</h1>
          <h2>
            {this.props.description
              ? this.props.description
              : 'This page does not have a description written for it.'}
          </h2>
        </div>
      </div>
    );
  }
}

export default ItineraryPageListItem;
