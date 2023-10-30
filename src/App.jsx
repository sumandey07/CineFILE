import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres, getPeople } from "./store/homeSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Persondetail from "./pages/personDetail/Persondetail";
import Person from "./pages/person/Person";
import Privacy from "./pages/privacy/Privacy";
import Terms from "./pages/terms/Terms";
import PageNotFound from "./pages/404/PageNotFound";
import About from "./pages/about/About";
import ScrollArrow from "./components/scrollArrow/ScrollArrow";

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
        {/* <Route path="/search/" element={<SearchCategory />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <ScrollArrow />
    </BrowserRouter>
  );
}

export default App;
