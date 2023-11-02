import React from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import PersonList from "./person/PersonList";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="homePage">
      <Helmet>
        <title>Home - CineFILE</title>
        <meta
          name="description"
          content="This is the home page of CineFILE. You can find trending, popular, top rated movies and tv shows here."
        />
      </Helmet>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
      <PersonList />
    </div>
  );
};

export default Home;
