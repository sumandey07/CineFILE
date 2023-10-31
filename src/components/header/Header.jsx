import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { SlMenu } from "react-icons/sl";
import { SiBuymeacoffee } from "react-icons/si";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/cinefile.png";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [shows, setShows] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShows(false);
        setQuery("");
      }, 500);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShows(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShows(false);
  };

  const resetForm = () => {
    setQuery("");
  };

  const redirect = () => {
    window.open("https://github.com/sumandey07/CineFILE", "_blank");
  };

  const buymeacoffee = () => {
    window.open("https://www.buymeacoffee.com/sumankumarq", "_blank");
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else if (type === "tv") {
      navigate("/explore/tv");
    } else {
      navigate("/person");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="CINEFILE" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => redirect()}>
            <FaGithub size={18} />
          </li>
          <li className="menuItem" onClick={() => buymeacoffee()}>
            <SiBuymeacoffee size={18} />
          </li>
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem" onClick={() => navigationHandler("person")}>
            People
          </li>
          <li className="menuItem">
            <GoSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <GoSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {shows && (
        <ContentWrapper>
          <Modal size="lg" show={shows} onHide={() => setShows(false)}>
            <Modal.Body className="input-group" style={{ padding: "0" }}>
              <span className="input-group-text border-0 bg-light p-3 bg-opacity-0">
                <GoSearch />
              </span>
              <input
                className="border border-0 form-control form-floating bg-light p-3 shadow-none"
                type="text"
                placeholder="Search for a movie or tv show...."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <div className="input-group-text border-0 bg-light p-3 shadow-none">
                {query.length === 0 ? (
                  <span />
                ) : (
                  <VscChromeClose
                    type="button"
                    onClick={() => resetForm()}
                    className="btn-close shadow-none"
                    aria-label="Clear the query"
                  />
                )}
              </div>
            </Modal.Body>
          </Modal>
        </ContentWrapper>
      )}
    </header>
  );
};

export default Header;
