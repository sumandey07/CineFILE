import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Recommendation from "./carousels/Recommendation";
import Similar from "./carousels/Similar";
import Cast from "./cast/Cast";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Review from "./reviews/Review";
import "./style.scss";
import VideosSection from "./videosSection/VideosSection";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: name, loading: nameLoading } = useFetch(`/${mediaType}/${id}`);
  const { data: reviews, loading: reviewsLoading } = useFetch(
    `/${mediaType}/${id}/reviews`
  );
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  const movieDetails =
    mediaType === "movie"
      ? `${name?.title} - CineFILE`
      : `${name?.name} - CineFILE`;

  return (
    <div className="main">
      <Helmet>
        <title>{movieDetails}</title>
        <meta
          name="description"
          content="Information about the movie you are looking for."
        />
      </Helmet>
      <DetailsBanner video={data?.results} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} className="cast" />
      <VideosSection data={data} loading={loading} />
      <Review data={reviews?.results} loading={reviewsLoading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
