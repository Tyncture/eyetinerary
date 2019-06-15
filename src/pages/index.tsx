import { Component } from "react";
import BaseContainer from "./components/base/baseContainer";
import "./index.scss";
import Sidebar from "./components/base/sidebar";
import Main from "./components/base/main";
import ItineraryHeader from "./components/itinerary/itineraryHeader";

export class IndexPage extends Component {
  render() {
    return (
      <BaseContainer>
          <Sidebar />
          <Main>
            <ItineraryHeader title="This thing works and will continue to work"
            description="This thing works and will continue to work"
            location="Bangkok"
            countryCode="Thailand"/>
          </Main>
        </BaseContainer>
    );
  }
}

export default IndexPage;
