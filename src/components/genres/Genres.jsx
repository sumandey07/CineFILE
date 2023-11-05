import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Genres = ({ data, media }) => {
  const { genres } = useSelector((state) => state.home);
  const navigate = useNavigate();

  return (
    <div className="genres">
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        return (
          <div
            key={g}
            className="genre"
            onClick={() =>
              navigate(`/genre/${genres[g]?.id}/${genres[g]?.name}/${media}`)
            }>
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
