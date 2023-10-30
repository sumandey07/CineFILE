import React from "react";
import CarouselItem from "../../../components/carousel/CarouselItem";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";

const PersonList = () => {
  const { data, loading } = useFetch(`/person/popular`);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Popular People</span>
      </ContentWrapper>
      <CarouselItem data={data?.results} loading={loading} />
    </div>
  );
};

export default PersonList;
