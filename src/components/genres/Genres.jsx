import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import { useState, useEffect } from "react";
import Spinner from "../../components/spinner/Spinner";

let filters = {};

const Genres = ({ data, media }) => {
  const { genres } = useSelector((state) => state.home);
  const [value, setValue] = useState(null);
  const [genre, setGenre] = useState(null);
  const [res, setRes] = useState(null);
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  // const { mediaType } = useParams();
  const { data: genresData } = useFetch(`/genre/${media}/list`);

  // const fetchInitialData = () => {
  //   setLoading(true);
  //   fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
  //     setValue(res);
  //     setPageNum((prev) => prev + 1);
  //     setLoading(false);
  //   });
  // };

  // const fetchNextPageData = () => {
  //   fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
  //     (res) => {
  //       if (value?.results) {
  //         setValue({
  //           ...value,
  //           results: [...value?.results, ...res.results],
  //         });
  //       } else {
  //         setValue(res);
  //       }
  //       setPageNum((prev) => prev + 1);
  //     }
  //   );
  // };

  // useEffect(() => {
  //   filters = {};
  //   setValue(null);
  //   setPageNum(1);
  //   setGenre(null);
  //   fetchInitialData();
  // }, [mediaType]);

  // const onChange = (selectedItems, action) => {
  //   if (action.name === "genres") {
  //     setGenre(selectedItems);
  //     if (action.action !== "clear") {
  //       let genreId = selectedItems.map((g) => g.id);
  //       genreId = JSON.stringify(genreId).slice(1, -1);
  //       filters.with_genres = genreId;
  //     } else {
  //       delete filters.with_genres;
  //     }
  //   }
  //   setPageNum(1);
  //   fetchInitialData();
  // };

  const goto = (media) => {
    console.log(media);
    navigate(`/explore/${media}`);
  };

  return (
    <div className="genres">
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
