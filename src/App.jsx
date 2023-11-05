import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import ScrollArrow from "@components/scrollArrow/ScrollArrow";
import PageNotFound from "@pages/404/PageNotFound";
import About from "@pages/about/About";
import Details from "@pages/details/Details";
import Explore from "@pages/explore/Explore";
import GenreList from "@pages/genreList/GenreList";
import Home from "@pages/home/Home";
import Person from "@pages/person/Person";
import Persondetail from "@pages/personDetail/Persondetail";
import Privacy from "@pages/privacy/Privacy";
import SearchResult from "@pages/searchResult/SearchResult";
import Terms from "@pages/terms/Terms";
import { getApiConfiguration, getGenres, getPeople } from "@store/homeSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { fetchDataFromApi } from "./utils/api";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
    peopleCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  const peopleCall = async () => {
    let promise = [];
    let endPoint = ["person"];
    let allPeople = {};

    endPoint.forEach((url) => {
      promise.push(fetchDataFromApi(`/${url}/popular`));
    });

    const data = await Promise.all(promise);
    data.map(({ people }) => {
      return people?.map((item) => (allPeople[item.id] = item));
    });

    dispatch(getPeople(allPeople));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/person/:id" element={<Persondetail />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/person" element={<Person />} />
        <Route path="/genre/:id/:name/:mediaType" element={<GenreList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
      <ScrollArrow />
    </BrowserRouter>
  );
}

export default App;
