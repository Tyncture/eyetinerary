import { Component } from "react";
import BaseContainer from "./components/base/baseContainer";
import "./index.scss";
import Sidebar from "./components/base/sidebar";
import Main from "./components/base/main";

export class IndexPage extends Component {
  render() {
    return (
      <BaseContainer>
          <Sidebar />
          <Main />
        </BaseContainer>
    );
  }
}

export default IndexPage;
