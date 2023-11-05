import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

import "./style.scss";

import noResults from "../../assets/no-results.png";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
import MovieCard from "../../components/movieCard/MovieCard";
import PersonCard from "../../components/personCard/PersonCard";
import Spinner from "../../components/spinner/Spinner";
import { fetchDataFromApi } from "../../utils/api";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const searchResultHeader = `${query} search results - CineFILE`;

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      <Helmet>
        <title>{searchResultHeader}</title>
        <meta
          name="description"
          content="Search results for the query(movies, tv shows or person) you are looking for."
        />
      </Helmet>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}>
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") {
                    return (
                      <PersonCard key={index} data={item} fromSearch={true} />
                    );
                  } else {
                    return (
                      <MovieCard key={index} data={item} fromSearch={true} />
                    );
                  }
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="part">
              <Img className="noResultImg" src={noResults} />
              <span className="resultNotFound">Sorry, Results not found!</span>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
