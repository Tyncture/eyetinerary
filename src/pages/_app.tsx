import React from "react";
import App, { Container } from "next/app";
import "./_app.scss";
import { Provider } from "react-redux";
import { createPersistedStore } from "../store";
import { PersistGate } from "redux-persist/integration/react";

const {store, persistor} = createPersistedStore();

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
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} className="app-container" />
          </PersistGate>
        </Provider>
      </Container>
    );
  }
}

export default CustomApp;
