import React, { useState } from "react";
import "./styles.scss";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <span className="readmore">
      {isReadMore ? text.slice(0, 250) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? (
          <span className="ms-3">...Read more</span>
        ) : (
          <span className="ms-3">Show less</span>
        )}
      </span>
    </span>
  );
};

export default ReadMore;
