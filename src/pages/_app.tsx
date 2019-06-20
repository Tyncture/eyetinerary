import React from "react";
import App, { Container } from "next/app";
import "./_app.scss";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { store } from "../store";

const storeInstance = createStore(store, composeWithDevTools());

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Provider store={storeInstance}>
          <Component {...pageProps} className="app-container" />
        </Provider>
      </Container>
    );
  }
}

export default CustomApp;
