import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./style.scss";
import Img from "../lazyLoadImage/Img";
import cinefile from "../../assets/cinefile.png";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="img">
          <Img className="logoImg" src={cinefile} />
        </div>
        <div className="mid text-center pt-4 fs-3">Ready to Talk?</div>
        <a
          href="https://forms.gle/pUuRQ5fqMk8cunCp7"
          className="btn px-5 m-5 btn btn-danger text-decoration-none text-white rounded-pill py-3 border-0">
          Let's Talk
        </a>
        <ul className="menuItems p-0 mx-auto">
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
        <div className="detail text-center justify-center align-items-center d-flex flex-column my-4">
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
