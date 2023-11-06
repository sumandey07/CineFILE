import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Info from "../personDetail/info/Info";
import MovieCredit from "./movieCredit/MovieCredit";
import "./style.scss";
import TVCredit from "./tvCredit/TVCredit";

const Persondetail = ({}) => {
  const { id } = useParams();
  const { data, loading } = useFetch(`/person/${id}`);

  const title = `${data?.name} - CineFILE`;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content="Information about the person you are looking for. It includes his date of birth, birthplace and details about the movies and tv shows that the person has participated in."
        />
      </Helmet>
      <Info detail={data} loading={loading} />
      <MovieCredit key={id} id={id} />
      <TVCredit key={id.id} id={id} />
    </div>
  );
};

export default Persondetail;
