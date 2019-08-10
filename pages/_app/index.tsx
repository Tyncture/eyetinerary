import React from "react";
import App, { Container } from "next/app";
import "./index.scss";
import { Provider } from "react-redux";
import { createPersistedStore } from "../../store";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = createPersistedStore();

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    /*
     * PersistGate causes Server-Side Rendering to fail and silently,
     * without any warning in the stack track. Workaround used here is
     * to substitute it with a container if not running in a browser,
     */
    const PersistIfBrowser =
      typeof window === "undefined" ? Container : PersistGate;

    return (
      <Container>
        <Provider store={store}>
          <PersistIfBrowser loading={null} persistor={persistor}>
            <Component {...pageProps} className="app-container" />
          </PersistIfBrowser>
        </Provider>
      </Container>
    );
  }
}

export default CustomApp;
