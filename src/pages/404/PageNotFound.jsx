import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { Helmet } from "react-helmet-async";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <Helmet>
        <title>Page Not Found</title>
        <meta
          name="description"
          content="Page not found. Please check the URL and try again"
        />
      </Helmet>
      <ContentWrapper className="contentWrapper">
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
        <Link className="button btn btn-outline-info mt-5 rounded-5" to="/">
          Go Home<pre> </pre>&rarr;
        </Link>
      </ContentWrapper>
    </div>
  );
};

export default PageNotFound;
