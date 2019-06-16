import { Component } from "react";
import BaseContainer from "../components/base/baseContainer";
import Main from "../components/base/main";
import Sidebar from "../components/base/sidebar";
import "./index.scss";

export class IndexPage extends Component {
  render() {
    return (
      <BaseContainer>
        <Sidebar />
        <Main>
          <div>Home</div>
        </Main>
      </BaseContainer>
    );
  }
}

export default IndexPage;
