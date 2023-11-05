import React, { useRef, useState, useEffect } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import "./style.scss";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const width = window.matchMedia("(min-width: 768px)");
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <IoIosArrowDropleftCircle
          color="white"
          size={36}
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <IoIosArrowDroprightCircle
          color="white"
          size={36}
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div key={item.id} className="carouselItem">
                  <div className="posterBlock">
                    <div
                      key={item.id}
                      onClick={() =>
                        navigate(`/${item.media_type || endpoint}/${item.id}`)
                      }>
                      <Img src={posterUrl} />
                      <CircleRating rating={item.vote_average.toFixed(1)} />
                    </div>
                    {width.matches ? (
                      <Genres
                        className="genres"
                        data={item.genre_ids.slice(0, 2)}
                        media={item.media_type || endpoint}
                      />
                    ) : (
                      <Genres
                        className="genres"
                        data={item.genre_ids.slice(0, 1)}
                        media={item.media_type || endpoint}
                      />
                    )}
                  </div>
                  <div
                    className="textBlock"
                    onClick={() =>
                      navigate(`/${item.media_type || endpoint}/${item.id}`)
                    }>
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item?.release_date || item?.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
