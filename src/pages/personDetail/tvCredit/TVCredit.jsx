import Carousel from "@components/carousel/Carousel";
import ContentWrapper from "@components/contentWrapper/ContentWrapper";
import useFetch from "@hooks/useFetch";
import React from "react";
import "./style.scss";

const TVCredit = ({ id }) => {
  const { data, loading } = useFetch(`/person/${id}/tv_credits`);

  return data?.cast?.length === 0 ? (
    <div className="noTV">
      <ContentWrapper>
        <div className="carouselTitle">TV Credits</div>
        <p className="notAvailableText">
          We don't have enough data to show as his TV credits.
        </p>
      </ContentWrapper>
    </div>
  ) : (
    <Carousel
      title="TV Credits"
      data={data?.cast}
      loading={loading}
      endpoint="tv"
    />
  );
};

export default TVCredit;
