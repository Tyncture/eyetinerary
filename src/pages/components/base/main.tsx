import React from 'react';
import './main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        <div className="main-inner">{this.props.children}</div>
      </div>
    );
  }
}

export default Main;
