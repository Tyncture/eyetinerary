import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobeEurope,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import './itineraryHeader.scss';
import { IItinerary } from './types';

class ItineraryHeader extends React.Component<IItinerary> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="itinerary-header">
        <h1>{this.props.title}</h1>
        <h2>{this.props.description}</h2>
        <div className="itinerary-header-info">
          <div className="itinerary-header-info-group">
            <div>
              <FontAwesomeIcon icon={faGlobeEurope} />
            </div>
            <div>
              Destination: {this.props.location}, {this.props.countryCode}
            </div>
          </div>
          <div className="itinerary-header-info-group">
            <div>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            <div>Trip Duration: 3 days</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItineraryHeader;
