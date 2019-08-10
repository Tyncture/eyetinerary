import { default as NextError } from "next/error";
import BaseContainer from "../../components/base/baseContainer";
import Sidebar from "../../components/base/sidebar";
import Main from "../../components/base/main";
import "./index.scss";
import Router from "next/router";
import { useCallback, useMemo } from "react";
import Head from "next/head";

function ErrorPage(props: { status: number; url: string }) {
  // Button handler
  const handleHome = useCallback(() => Router.back(), []);
  
  // Computed values
  const headTitleInitial = useMemo(
    () => (props.status === 404 ? "Not Found - " : ""),
    [props.status],
  );
  const headingTitle = useMemo(
    () => (props.status === 404 ? "Not Found" : "Error"),
    [props.status],
  );
  const errorMessage = useMemo(
    () =>
      props.status === 404
        ? `Page ${props.url} either does not exist or was deleted.`
        : "An unknown error has occured.",
    [props.status],
  );

  return (
    <BaseContainer>
      <Head>
        <title>{headTitleInitial}Eyetinerary</title>
      </Head>
      <Sidebar />
      <Main>
        <div className="error-page">
          <header className="error-page__header">
            <h1 className="title">{headingTitle}</h1>
          </header>
          <div className="error-page__main">
            <div>{errorMessage}</div>
            <div>
              <input
                className="button button--mini"
                name="home"
                type="button"
                value="Get me out of here!"
                onClick={handleHome}
              />
            </div>
          </div>
        </div>
      </Main>
    </BaseContainer>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  // tc39/proposal-optional-chaining needs to come soon
  const url = res
    ? res.connection
      ? res.connection.parser
        ? res.connection.parser.incoming
          ? res.connection.parser.incoming.url
            ? res.connection.parser.incoming.url
            : ""
          : ""
        : ""
      : ""
    : "";
  const status = res ? res.statusCode : err ? err.statusCode : 0;
  return { status, url };
};

export default ErrorPage;
