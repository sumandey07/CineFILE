import React from "react";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import Info from "../personDetail/info/Info";
import { useParams } from "react-router-dom";

const Persondetail = ({}) => {
  const { id } = useParams();
  const { data, loading } = useFetch(`/person/${id}`);
  return (
    <div>
      <Info detail={data} loading={loading} />
      {/* <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} /> */}
    </div>
  );
};

export default Persondetail;
