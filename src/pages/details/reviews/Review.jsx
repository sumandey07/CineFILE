import React, { useRef } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { BsStar } from "react-icons/bs";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./style.scss";
import avatar from "../../../assets/avatar.png";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import dayjs from "dayjs";
import ReadMore from "./ReadMore";

const Review = ({ data, loading }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const go = () => {
    data?.map((item) => {
      item?.url ? window.open(`${item?.url}`, "_blank") : "";
    });
  };
  const goto = () => {
    let s = item?.author_details?.avatar_path;
    s = s.replace(/^https\:\/\/image\.tmdb\.org\/t\/p\/original\//g, "");
    console.log(s);
    return s;
  };

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - container.offsetWidth * 2
        : container.scrollLeft + container.offsetWidth * 2;
    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="block">
          <div className="posterBlock"></div>
          <div className="titleBlock">
            <div className="title skeleton"></div>
            <div className="titles skeleton"></div>
          </div>
        </div>
        <div className="textBlock">
          <div className="content skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="reviews">
      <ContentWrapper>
        <div className="carouselTitle">Reviews</div>
        <FaArrowAltCircleLeft
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <FaArrowAltCircleRight
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const reviewUrl = item?.author_details?.avatar_path
                ? url.poster + item?.author_details?.avatar_path ||
                  (() => goto())
                : avatar;
              return (
                <div
                  key={item.id}
                  className="carouselItem container border rounded-3"
                >
                  <div className="block">
                    <div className="posterBlock">
                      <Img
                        className="posterImg rounded-circle"
                        src={reviewUrl}
                      />
                    </div>
                    <div className="titleBlock">
                      <span className="title" onClick={() => go()}>
                        A Review By {item.author}
                      </span>
                      <span className="titles">
                        written by {item.author} on{" "}
                        {dayjs(item.created_at).format("MMM D, YYYY")}
                      </span>
                    </div>
                    <div className="rating border rounded-5">
                      <BsStar size={11} />
                      <span className="rate">
                        {(item?.author_details?.rating / 1).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="textBlock container">
                    <span className="content">
                      <ReadMore>{item.content}</ReadMore>
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

export default Review;
