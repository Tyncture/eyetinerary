import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";

class EditItinerary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BaseContainer>
        <Sidebar />
        <Main>Placeholder</Main>
      </BaseContainer>
    );
  }
}

export default EditItinerary;
