import { Component } from "react";
import BaseContainer from "./components/base/baseContainer";
import "./index.scss";
import Sidebar from "./components/base/sidebar";
import Main from "./components/base/main";

export class IndexPage extends Component {
  render() {
    return (
      <div>
        <BaseContainer>
          <Sidebar />
          <Main />
        </BaseContainer>
      </div>
    );
  }
}

export default IndexPage;
