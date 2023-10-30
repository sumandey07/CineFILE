import React, { useState, useEffect } from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
import cinefile from "../../assets/cinefile.png";
import logo from "../../assets/logo.png";
import "./style.scss";
import Spinner from "../../components/spinner/Spinner";

const About = () => {
  const [loading, setLoading] = useState(false);

  const loader = () => {
    return new Promise((resolve) => setTimeout(() => resolve(), 300));
  };

  const fetch = () => {
    setLoading(true);
    loader().then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="about">
      <ContentWrapper>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <div className="part">
            <div className="first">
              <Img className="logo" src={logo} />
              <Img className="logoImg" src={cinefile} />
            </div>
            <div className="second">
              <p className="para">About Us</p>
            </div>
            <div className="third">
              <p className="paragraph">
                This is a simple movie search website. It uses the TMDB API to
                fetch the movies. It is built using ReactJS and Redux. It uses
                React Hooks and React Router. It also uses Redux Thunk for async
                API. I have used SCSS for styling. It is a responsive app. It
                uses Lazy Loading for images. It also uses Intersection Observer
                API for infinite scrolling. It uses React Helmet for SEO. It
                uses React Toastify for toast messages. It uses React Spinners
                for loading spinners. It uses React Icons for icons. It uses
                Axios for API calls. It uses React Lazy Load Image Component for
                lazy loading images. It uses React Content Loader for loading
                skeleton. It uses React Infinite Scroll Component for infinite
                scrolling. It uses React Router for routing. It uses React Redux
                for state management. It uses Redux Thunk for async API. It uses
                Redux Dev Tools for debugging. It uses Redux Logger for logging.
                It uses Redux Persist for persisting state.
              </p>
            </div>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default About;
