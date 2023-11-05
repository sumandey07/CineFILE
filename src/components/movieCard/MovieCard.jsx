import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import Img from "../lazyLoadImage/Img";
import "./style.scss";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const width = window.matchMedia("(min-width: 768px)");
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  return (
    <div className="movieCard">
      <div className="posterBlock">
        <div
          onClick={() =>
            navigate(`/${data.media_type || mediaType}/${data.id}`)
          }>
          <Img className="posterImg" src={posterUrl} />
          {!fromSearch && (
            <React.Fragment>
              <CircleRating rating={data.vote_average.toFixed(1)} />
            </React.Fragment>
          )}
        </div>
        {width.matches ? (
          <Genres
            media={mediaType}
            className="genres"
            data={data.genre_ids.slice(0, 2)}
          />
        ) : (
          <Genres
            media={mediaType}
            className="genres"
            data={data.genre_ids.slice(0, 1)}
          />
        )}
      </div>
      <div
        className="textBlock"
        onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}>
        <span className="title">{data.title || data.name}</span>
        {data?.release_date?.length > 0 && (
          <span className="date">
            {dayjs(data?.release_date).format("MMM D, YYYY")}
          </span>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
