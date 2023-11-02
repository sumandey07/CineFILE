import React, { useState } from "react";
import { SiImdb } from "react-icons/si";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import avatar from "../../../assets/avatar.png";
import ReadMore from "../../details/reviews/ReadMore.jsx";

const Info = ({ detail, loading }) => {
  // const [show, setShow] = useState(false);
  // const { mediaType, id } = useParams();
  const { url } = useSelector((state) => state.home);
  // const _genres = detail?.also_known_as?.map((g) => g.id);

  const navigate = (id) => {
    window.open(`https://www.imdb.com/name/${id}`, "_blank");
  };

  return (
    <div className="personInfo">
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
                    <div className="title">{`${detail.name}`}</div>
                    <div className="subtitle">
                      {detail.known_for_department}
                      <span className="imdb opacity-100">
                        Profile:
                        <button
                          className="ms-3"
                          onClick={() => navigate(detail.imdb_id)}>
                          <SiImdb size={28} />
                        </button>
                      </span>
                    </div>
                    <div className="birthday">
                      Date of Birth:
                      <span className="ms-2 opacity-50">
                        {dayjs(detail.birthday).format("MMMM DD, YYYY")}
                      </span>
                    </div>
                    <div className="birthPlace">
                      Birthplace:
                      <span className="ms-2 opacity-50">
                        {detail.place_of_birth}
                      </span>
                    </div>
                    <div className="overview">
                      <div className="heading">Biography</div>
                      {detail.biography.length === 0 ? (
                        <article className="description">
                          No Biography Available
                        </article>
                      ) : (
                        <article className="description">
                          <ReadMore>{detail.biography}</ReadMore>
                        </article>
                      )}
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
