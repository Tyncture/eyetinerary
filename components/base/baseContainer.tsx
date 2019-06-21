import React from 'react';
import './baseContainer.scss';
import Head from 'next/head';

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="base-container">
      <Head>
        <title>Eyetinerary</title>
      </Head>
      {this.props.children}
    </div>;
  }
}

export default BaseContainer;
