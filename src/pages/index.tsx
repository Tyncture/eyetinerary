import { Component } from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";
import Head from "next/head";
import "./index.scss";

export class IndexPage extends Component {
  render() {
    return (
      <BaseContainer>
        <Head>
          <title>Eyetinerary</title>
        </Head>
        <Sidebar />
        <Main>
          <div>Home</div>
        </Main>
      </BaseContainer>
    );
  }
}

export default IndexPage;
