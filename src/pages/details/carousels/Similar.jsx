import React from "react";
import ContentWrapper from "@components/contentWrapper/ContentWrapper";
import Carousel from "@components/carousel/Carousel";
import useFetch from "@hooks/useFetch";
import "./styles.scss";

const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
  const { data: name, loading: nameLoading } = useFetch(`/${mediaType}/${id}`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  const nameDetail = mediaType === "movie" ? `${name?.title}` : `${name?.name}`;

  const noText = mediaType === "movie" ? "movies" : "tv shows";

  return data?.results.length === 0 ? (
    <div className="noSimilar">
      <ContentWrapper>
        <div className="carouselTitle">{title}</div>
        <p className="notAvailableText">
          We don't have enough data to suggest any {noText} based on{" "}
          {nameDetail}.
        </p>
      </ContentWrapper>
    </div>
  ) : (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Similar;
