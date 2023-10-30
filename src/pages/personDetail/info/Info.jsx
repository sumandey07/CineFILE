import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import avatar from "../../../assets/avatar.png";

const Info = ({ detail, loading }) => {
  const [show, setShow] = useState(false);
  const { mediaType, id } = useParams();
  const { url } = useSelector((state) => state.home);
  const _genres = detail?.also_known_as?.map((g) => g.id);

  return (
    <div className="detailsBanners">
      {!loading ? (
        <>
          {!!detail && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.profile + detail.profile_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {detail.profile_path ? (
                      <Img
                        className="posterImg"
                        src={url.profile + detail.profile_path}
                      />
                    ) : (
                      <Img className="posterImg" src={avatar} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${detail.name}`}
                      {/* (${dayjs(detail?.release_date).format("YYYY")}) */}
                    </div>
                    <div className="subtitle">
                      {detail.known_for_department}
                    </div>
                    {/* <Genres data={_genres} className="genres" /> */}
                    <div className="subtitle">{detail.place_of_birth}</div>
                    <div className="overview">
                      <div className="heading">Biography</div>
                      <div className="description">{detail.biography}</div>
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default Info;
