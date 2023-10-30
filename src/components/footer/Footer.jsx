import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./style.scss";
import Img from "../lazyLoadImage/Img";
import logo from "../../assets/logo.png";
import cinefile from "../../assets/cinefile.png";

const Footer = () => {
  const redirect = () => {
    window.open(
      "https://github.com/sumandey07/CineFILE/discussions/new?category=q-a",
      "_blank"
    );
  };

  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="img">
          <Img className="image" src={logo} />
          <Img className="logoImg" src={cinefile} />
        </div>
        <div className="form">
          <form action="sendEmail()">
            <input
              type="text"
              className="rounded-pill"
              placeholder="Normal text"
            />
            <input
              type="text"
              className="rounded-pill"
              placeholder="Normal text"
            />
            <input
              type="text"
              className="rounded-pill"
              placeholder="Normal text"
            />
            <input
              type="submit"
              className="rounded-pill"
              placeholder="Normal text"
            />
          </form>
        </div>
        <br />
        <ul className="menuItems">
          <NavLink className="menuItem" to="/terms">
            Terms of Use
          </NavLink>
          <NavLink className="menuItem" to="/privacy">
            Privacy Policy
          </NavLink>
          <span className="menuItem" onClick={() => redirect()}>
            FAQ
          </span>
          <NavLink className="menuItem" to="/about">
            About
          </NavLink>
        </ul>
        <div className="detail text-center align-items-center ms-4 d-flex flex-column my-4">
          <div className="socialIcons">
            <a href="https://www.facebook.com/iamsuman99/" target="_blank">
              <span className="icon">
                <FaFacebookF size={20} />
              </span>
            </a>
            <a href="https://www.instagram.com/sumanhere_/" target="_blank">
              <span className="icon">
                <FaInstagram size={20} />
              </span>
            </a>
            <a href="https://twitter.com/iam_sumandey" target="_blank">
              <span className="icon">
                <FaTwitter size={20} />
              </span>
            </a>
            <a href="https://www.linkedin.com/in/iamsumandey/" target="_blank">
              <span className="icon">
                <FaLinkedin size={20} />
              </span>
            </a>
          </div>
          <span className="name mb-5">Made with ❤️ by Suman Dey</span>
          <span className="copyright mb-0 text-muted">
            © {new Date().getFullYear()} CineFILE
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
