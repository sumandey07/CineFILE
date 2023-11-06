import PosterFallback from "@assets/no-poster.png";
import CircleRating from "@components/circleRating/CircleRating";
import ContentWrapper from "@components/contentWrapper/ContentWrapper";
import Genres from "@components/genres/Genres";
import Img from "@components/lazyLoadImage/Img.jsx";
import VideoPopup from "@components/videoPopup/VideoPopup";
import useFetch from "@hooks/useFetch";
import dayjs from "dayjs";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BiLogoGmail } from "react-icons/bi";
import { BsFillShareFill } from "react-icons/bs";
import { FaFacebookF, FaPlay, FaWhatsapp, FaImdb } from "react-icons/fa";
import {
  FaRegCopy,
  FaTelegram,
  FaXTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import "./style.scss";

const DetailsBanner = ({ video, crew }) => {
  let keys, names, certifications;
  const [text, setText] = useState(window.location.href);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [shows, setShows] = useState(false);
  const [value, setValue] = useState("");
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { data: externalId } = useFetch(`/${mediaType}/${id}/external_ids`);
  const { url } = useSelector((state) => state.home);
  const _genres = data?.genres?.map((g) => g.id);
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter((f) => f.job === "Story" || f.job === "Writer");
  const navigate = useNavigate();

  if (mediaType == "movie") {
    const { data: movieCertify } = useFetch(`/movie/${id}/release_dates`);
    certifications =
      movieCertify?.results?.find((c) => c.iso_3166_1 === "US") !== undefined
        ? movieCertify?.results?.find((c) => c.iso_3166_1 === "US")
        : movieCertify?.results?.find((c) => c.release_dates !== undefined);
  } else {
    const { data: tvCertify } = useFetch(`/tv/${id}/content_ratings`);
    certifications =
      tvCertify?.results?.find((c) => c.iso_3166_1 === "US") !== undefined
        ? tvCertify?.results?.find((c) => c.iso_3166_1 === "US")
        : tvCertify?.results?.find((c) => c.rating !== undefined);
  }

  for (let i = 0; i < video?.length; i++) {
    const videoType = video[i].type;
    if (
      videoType === "Trailer" ||
      videoType === "Teaser" ||
      videoType === "Official Trailer" ||
      videoType === "Clip"
    ) {
      names = video[i].name;
      keys = video[i].key;
    }
  }

  const budget = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    maximumSignificantDigits: 2,
    notation: "compact",
    currencyDisplay: "symbol",
  }).format(data?.budget);

  const revenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    maximumSignificantDigits: 2,
    notation: "compact",
    currencyDisplay: "symbol",
  }).format(data?.revenue);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const certify =
    mediaType === "tv"
      ? certifications?.rating
      : certifications?.release_dates?.filter(
          (c) => c.certification !== undefined
        )[0].certification;

  const share = mediaType === "movie" ? "movie" : "tv show";

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

  const sendTo = (i) => {
    const id = director[i].id;
    navigate(`/person/${id}`);
  };

  const sends = (i) => {
    const id = writer[i].id;
    navigate(`/person/${id}`);
  };

  const send = (i) => {
    const id = data?.created_by[i].id;
    navigate(`/person/${id}`);
  };

  const isReleaseDate =
    data?.release_date === undefined
      ? ""
      : `(${dayjs(data?.release_date).format("YYYY")})`;

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
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
                              Share this {share} with others
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
                                subject={`${
                                  data?.name || data?.title
                                } - CineFILE`}
                                body="Check out this page on cinefile and don't forget to share it with others"
                                separator="::"
                                url={window.location.href}
                                className="me-4">
                                <BiLogoGmail size={25} />
                              </EmailShareButton>
                              <FacebookShareButton
                                title={`${
                                  data?.name || data?.title
                                } - CineFILE`}
                                quote="Share this movie with others"
                                hashtag="#cinefile"
                                url={`https://cine-file.vercel.app/${window.location.pathname}`}
                                className="me-4">
                                <FaFacebookF size={20} />
                              </FacebookShareButton>
                              <TelegramShareButton
                                title={`${
                                  data?.name || data?.title
                                } - CineFILE`}
                                url={window.location.href}
                                className="me-4">
                                <FaTelegram size={20} />
                              </TelegramShareButton>
                              <TwitterShareButton
                                title={data?.name || data?.title}
                                hashtags={["#cinefile", "#movie", "#tvshow"]}
                                url={window.location.href}
                                className="me-4">
                                <FaXTwitter size={20} />
                              </TwitterShareButton>
                              <WhatsappShareButton
                                separator="::"
                                title={`${
                                  data?.name || data?.title
                                } - CineFILE`}
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
                    <div className="title">
                      {`${data?.name || data?.title} ${isReleaseDate}`}{" "}
                    </div>
                    <div className="subtitle mt-1">
                      {certify?.length > 0 && (
                        <span className="certify me-2 px-1 rounded-2 border-1 border border-white">
                          {certify}
                        </span>
                      )}
                      {data.tagline}
                    </div>
                    {_genres?.length === 0 ? (
                      ""
                    ) : (
                      <div className="d-flex contain mt-4 flex-row">
                        <Genres
                          data={_genres}
                          media={mediaType}
                          className="genres"
                        />
                      </div>
                    )}

                    <div className="mt-2">
                      <span className="imdb">
                        {externalId?.imdb_id?.length > 0 && (
                          <FaImdb
                            color="yellow"
                            role="button"
                            onClick={() =>
                              window.open(
                                `https://imdb.com/title/${externalId?.imdb_id}`,
                                "_blank"
                              )
                            }
                            size={22}
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
                            size={21}
                          />
                        )}
                      </span>
                    </div>

                    <div className="rows">
                      <div className="score">
                        <CircleRating
                          className="circleRating"
                          rating={data.vote_average?.toFixed(1)}
                        />
                        <div className="infos">
                          <span className="info1">User</span>
                          <span className="info2">Score</span>
                        </div>
                      </div>
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setValue(names);
                          setVideoId(keys);
                        }}>
                        <FaPlay className="icon" size={19} />
                        {mediaType === "movie" ? (
                          <span className="text">Watch Trailer</span>
                        ) : (
                          <span className="text">Watch Clip</span>
                        )}
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data?.release_date).format("DD MMM YYYY")}{" "}
                            {data?.production_countries[0]?.iso_3166_1?.length >
                              0 && (
                              <span>
                                ({data?.production_countries[0]?.iso_3166_1})
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span
                              key={i}
                              role="button"
                              onClick={() => sendTo(i)}>
                              {d.name}
                              {director.length - 1 !== i && " , "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer?.map((d, i) => (
                            <span
                              key={i}
                              role="button"
                              onClick={() => sends(i)}>
                              {d.name}
                              {writer.length - 1 !== i && " , "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.production_companies?.length > 0 && (
                      <div className="infoSS">
                        <span className="textSS bold">
                          Production Companies:{" "}
                        </span>
                        <span className="textSS">
                          {data?.production_companies?.map((d, i) => (
                            <span key={i}>
                              {d.name}{" "}
                              {d?.origin_country?.length > 0 && (
                                <span>({d.origin_country})</span>
                              )}
                              {data?.production_companies?.length - 1 !== i &&
                                " , "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i} role="button" onClick={() => send(i)}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && " , "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.budget > 0 && (
                      <div className="info">
                        <span className="text bold">Budget: </span>
                        <span className="text">{budget}</span>
                      </div>
                    )}

                    {data?.revenue > 0 && (
                      <div className="info">
                        <span className="text bold">Revenue: </span>
                        <span className="text">{revenue}</span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  value={value}
                  setValue={setValue}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
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

export default DetailsBanner;
