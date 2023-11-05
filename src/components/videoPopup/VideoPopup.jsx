import React from "react";
import ReactPlayer from "react-player/youtube";
import { VscChromeClose } from "react-icons/vsc";
import { FaYoutube } from "react-icons/fa";
import "./style.scss";

const VideoPopup = ({
  show,
  setShow,
  value,
  setValue,
  videoId,
  setVideoId,
}) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
    setValue("");
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="rounded videoPlayer align-items-center">
        <div className="name">
          <FaYoutube color="red" className="me-3" size={30} />
          {value}
        </div>
        <div className="closeBtn">
          <VscChromeClose size={22} onClick={hidePopup} />
        </div>
        {videoId == null ? (
          <div className="noVideo">No Video Available</div>
        ) : (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            className="class"
            width="99%"
            height="99%"
          />
        )}
      </div>
    </div>
  );
};

export default VideoPopup;
