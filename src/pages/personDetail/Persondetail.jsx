import React from "react";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import Info from "../personDetail/info/Info";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Persondetail = ({}) => {
  const { id } = useParams();
  const { data, loading } = useFetch(`/person/${id}`);
  const title = `${data?.name}` + " - CineFILE";
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content="Information about the person you are looking for."
        />
      </Helmet>
      <Info detail={data} loading={loading} />
      {/* <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} /> */}
    </div>
  );
};

export default Persondetail;
