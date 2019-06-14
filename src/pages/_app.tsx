import React from "react";
import App, { Container } from "next/app";
import "./_app.scss";

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
        <Component {...pageProps} className="app-container"/>
      </Container>
    );
  }
}

export default CustomApp;
