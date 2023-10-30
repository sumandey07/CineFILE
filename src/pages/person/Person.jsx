import React, { useState, useEffect } from "react";
import Img from "../../components/lazyLoadImage/Img";
import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import PersonCard from "../../components/personCard/PersonCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const Person = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/person/popular`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/person/popular?page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    setData(null);
    setPageNum(1);
    fetchInitialData();
  },[]);

  return (
    <div className="personPage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">Popular People</div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  return <PersonCard key={index} data={item} />;
                })}
              </InfiniteScroll>
            ) : (
              <div className="part">
                <Img className="noResultImg" src={noResults} />
                <span className="resultNotFound">
                  Sorry, Results not found!
                </span>
              </div>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Person;
