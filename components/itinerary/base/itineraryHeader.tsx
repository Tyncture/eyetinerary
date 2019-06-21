import {
  faCalendarAlt,
  faGlobeEurope
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./itineraryHeader.scss";

interface IProps {
  title: string;
  description?: string;
  location?: string;
  countryCode?: string;
  className?: string;
}

class ItineraryHeader extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const inheritedClassNames = this.props.className
      ? this.props.className
      : "";
    return (
      <div className={`itinerary-header ${inheritedClassNames}`}>
        <h1>{this.props.title}</h1>
        <h3>{this.props.description}</h3>
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
