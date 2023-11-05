import avatar from "@assets/avatar.png";
import ContentWrapper from "@components/contentWrapper/ContentWrapper";
import Img from "@components/lazyLoadImage/Img.jsx";
import useFetch from "@hooks/useFetch";
import dayjs from "dayjs";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BiLogoGmail } from "react-icons/bi";
import { BsFillShareFill } from "react-icons/bs";
import {
  FaFacebookF,
  FaImdb,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaFacebook, FaRegCopy, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import ReadMore from "../../details/reviews/ReadMore.jsx";
import "./style.scss";

const Info = ({ detail, loading }) => {
  const [text, setText] = useState(window.location.href);
  const [shows, setShows] = useState(false);
  const { url } = useSelector((state) => state.home);
  const { id } = useParams();
  const { data: externalId, loading: externalIdLoading } = useFetch(
    `/person/${id}/external_ids`
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Link Copied to clipboard", {
        position: "bottom-right",
        autoClose: 1000,
        type: "success",
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    } catch (err) {
      toast("Unable to copy to clipboard", {
        position: "bottom-right",
        autoClose: 1000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      console.error("Unable to copy to clipboard.", err);
    }
  };

  const isBirthday =
    detail?.birthday?.length > 0
      ? `${dayjs(detail.birthday).format("MMMM DD, YYYY")}`
      : "Unknown";

  let age =
    detail?.birthday?.length > 0
      ? `(${dayjs().diff(detail?.birthday, "year", false)} years old)`
      : "";

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
                    <BsFillShareFill
                      onClick={() => setShows(true)}
                      className="shareIcon bg-white rounded-2 p-1"
                      role="button"
                      size={26}
                    />
                    {shows && (
                      <ContentWrapper>
                        <Modal
                          size="lg"
                          show={shows}
                          onHide={() => setShows(false)}>
                          <Modal.Header closeButton>
                            <Modal.Title className="fs-6 user-select-none">
                              Share this person's profile with others
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="m-3 d-flex flex-column">
                            <span className="mb-3">Copy Link to share:</span>
                            <div className="mb-4 d-flex flex-row align-items-center">
                              <input
                                className="form-control"
                                disabled
                                type="url"
                                value={text}
                              />
                              <FaRegCopy
                                size={32}
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                data-bs-title="Copy Link to clipboard"
                                className="ms-3 border border-1 border-dark rounded p-1"
                                role="button"
                                onClick={copy}
                              />
                            </div>
                            <div className="mt-2 align-items-center">
                              <span className="me-4">Share on:</span>
                              <EmailShareButton
                                subject={`${detail?.name} - "CineFILE"`}
                                body="Check out this page on cinefile and don't forget to share it with others"
                                separator="::"
                                url={window.location.href}
                                className="me-4">
                                <BiLogoGmail size={25} />
                              </EmailShareButton>
                              <FacebookShareButton
                                quote="Check out this person's profile on CineFILE"
                                hashtag="#cinefile"
                                url={`https://cine-file.vercel.app/${window.location.pathname}`}
                                className="me-4">
                                <FaFacebookF size={20} />
                              </FacebookShareButton>
                              <TelegramShareButton
                                title={`${detail?.name} - "CineFILE"`}
                                url={window.location.href}
                                className="me-4">
                                <FaTelegram size={20} />
                              </TelegramShareButton>
                              <TwitterShareButton
                                title={`${detail?.name} - "CineFILE"`}
                                hashtags={["#cinefile", "#movies", "#tvshows"]}
                                url={window.location.href}
                                className="me-4">
                                <FaXTwitter size={20} />
                              </TwitterShareButton>
                              <WhatsappShareButton
                                title={`${detail?.name} - "CineFILE"`}
                                url={window.location.href}
                                className="me-4">
                                <FaWhatsapp size={20} />
                              </WhatsappShareButton>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </ContentWrapper>
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{`${detail.name}`}</div>
                    <div className="subtitle">
                      {detail.known_for_department}
                      <span className="imdb">
                        {externalId?.imdb_id?.length > 0 && (
                          <FaImdb
                            color="yellow"
                            role="button"
                            onClick={() =>
                              window.open(
                                `https://imdb.com/name/${externalId?.imdb_id}`,
                                "_blank"
                              )
                            }
                            size={24}
                          />
                        )}
                        {externalId?.facebook_id?.length > 0 && (
                          <FaFacebook
                            color="deepskyblue"
                            className="ms-3"
                            role="button"
                            onClick={() =>
                              window.open(
                                `https://facebook.com/${externalId?.facebook_id}`,
                                "_blank"
                              )
                            }
                            size={23}
                          />
                        )}
                        {externalId?.youtube_id?.length > 0 && (
                          <FaYoutube
                            role="button"
                            color="red"
                            className="ms-3"
                            onClick={() =>
                              window.open(
                                `https://youtube.com/${externalId?.youtube_id}`,
                                "_blank"
                              )
                            }
                            size={23}
                          />
                        )}
                        {externalId?.tiktok_id?.length > 0 && (
                          <FaTiktok
                            color="white"
                            role="button"
                            className="ms-3"
                            onClick={() =>
                              window.open(
                                `https://tiktok.com/${externalId?.tiktok_id}`,
                                "_blank"
                              )
                            }
                            size={22}
                          />
                        )}
                        {externalId?.instagram_id?.length > 0 && (
                          <FaInstagram
                            role="button"
                            color="fuchsia"
                            className="ms-3"
                            onClick={() =>
                              window.open(
                                `https://instagram.com/${externalId?.instagram_id}`,
                                "_blank"
                              )
                            }
                            size={22}
                          />
                        )}
                        {externalId?.twitter_id?.length > 0 && (
                          <FaXTwitter
                            color="white"
                            role="button"
                            className="ms-3"
                            onClick={() =>
                              window.open(
                                `https://twitter.com/${externalId?.twitter_id}`,
                                "_blank"
                              )
                            }
                            size={22}
                          />
                        )}
                      </span>
                    </div>
                    <div className="birthday user-select-none">
                      Date of Birth:
                      <span className="ms-2 opacity-50">
                        {isBirthday} {age}
                      </span>
                    </div>
                    <div className="birthPlace user-select-none">
                      Birthplace:
                      <span className="ms-2 opacity-50">
                        {detail.place_of_birth}
                      </span>
                    </div>
                    <div className="overview user-select-none">
                      <div className="heading">Biography</div>
                      {detail.biography.length === 0 ? (
                        <article className="description">
                          No Biography Available
                        </article>
                      ) : (
                        <article className="description user-select-none">
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
