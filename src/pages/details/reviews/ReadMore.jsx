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
      <pre onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...Read more" : "Show less"}
      </pre>
    </span>
  );
};

export default ReadMore;
