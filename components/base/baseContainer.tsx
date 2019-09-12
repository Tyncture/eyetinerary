import React from "react";
import "./baseContainer.scss";
import Head from "next/head";
import Sidebar from "./sidebar";
import Main from "./main";

class BaseContainer extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container">
        <Head>
          <title>Eyetinerary</title>
        </Head>
        <Sidebar />
        <Main>{this.props.children}</Main>
      </div>
    );
  }
}

export default BaseContainer;
