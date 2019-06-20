import React from 'react';
import './itineraryListItem.scss';

interface IProps {
  h1: string;
  h2: string;
  onClick?: () => void;
}

class ItineraryListItem extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="itinerary-pagelist-item" onClick={this.props.onClick}>
        <div className="itinerary-pagelist-item-body">
          <h1>{this.props.h1}</h1>
          <h2>
            {this.props.h2}
          </h2>
        </div>
      </div>
    );
  }
}

export default ItineraryListItem;
