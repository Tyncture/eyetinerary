import React from "react";
import "../styles/baseContainer.scss";

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="base-container">{this.props.children}</div>;
  }
}

export default BaseContainer;
