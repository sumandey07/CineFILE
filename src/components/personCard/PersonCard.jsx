import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import Img from "../lazyLoadImage/Img";
import avatar from "../../assets/avatar.png";
import { useNavigate } from "react-router-dom";

const PersonCard = ({ data, fromSearch }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.profile_path
    ? url.profile + data.profile_path
    : avatar;
  return (
    <div className="personCard" onClick={() => navigate(`/person/${data.id}`)}>
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch}
      </div>
      <div className="textBlock">
        <span className="title">{data.name}</span>
      </div>
    </div>
  );
};

export default PersonCard;
