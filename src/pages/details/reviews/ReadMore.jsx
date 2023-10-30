import React, { useState } from "react";
import "./styles.scss";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="readmore">
      {isReadMore ? text.slice(0, 200) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "    ...Read more" : "    Show less"}
      </span>
    </p>
  );
};

export default ReadMore;
