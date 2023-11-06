import Carousel from "@components/carousel/Carousel";
import ContentWrapper from "@components/contentWrapper/ContentWrapper";
import useFetch from "@hooks/useFetch";
import React from "react";
import "./style.scss";

const MovieCredit = ({ id }) => {
  const { data, loading } = useFetch(`/person/${id}/movie_credits`);

  return data?.cast?.length === 0 ? (
    <div className="noMovie">
      <ContentWrapper>
        <div className="carouselTitle">Movie Credits</div>
        <p className="notAvailableText">
          We don't have enough data to show as his Movie credits.
        </p>
      </ContentWrapper>
    </div>
  ) : (
    <Carousel
      title="Movie Credits"
      data={data?.cast}
      loading={loading}
      endpoint="movie"
    />
  );
};

export default MovieCredit;
