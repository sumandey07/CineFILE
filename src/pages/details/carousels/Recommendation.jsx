import React from "react";
import "./style.scss";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);
  const { data: name, loading: nameLoading } = useFetch(`/${mediaType}/${id}`);

  const nameDetail = mediaType === "movie" ? `${name?.title}` : `${name?.name}`;

  const noText = mediaType === "movie" ? "movies" : "tv shows";

  return data?.results.length === 0 ? (
    <div className="noRecommend">
      <ContentWrapper>
        <div className="carouselTitle">Recommendations</div>
        <p className="notAvailableText">
          We don't have enough data to suggest any {noText} based on{" "}
          {nameDetail}.
        </p>
      </ContentWrapper>
    </div>
  ) : (
    <Carousel
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Recommendation;
