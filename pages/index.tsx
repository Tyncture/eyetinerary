import { Component } from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";
import "./index.scss";

export class IndexPage extends Component {
  render() {
    return (
      <BaseContainer>
        <div>Home</div>
      </BaseContainer>
    );
  }
}

export default IndexPage;
