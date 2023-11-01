import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <ContentWrapper className="contentWrapper">
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
        <Link className="button btn btn-outline-info mt-5 rounded-5" to="/">
          Go Home<pre className="btnText">   &rarr;</pre>
        </Link>
      </ContentWrapper>
    </div>
  );
};

export default PageNotFound;
