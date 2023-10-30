import React, { useEffect, useRef, useState } from "react";
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
import logo from "../../assets/logo.png";
import cinefile from "../../assets/cinefile.png";
import emailjs from "@emailjs/browser";

const Footer = () => {
  useEffect(() => emailjs.init("zwx1hJPz27ZVIVlJA"), []);
  const emailRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    const serviceId = "service_new";
    const templateId = "template_new";
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        Name: nameRef.current.value,
        Email: emailRef.current.value,
        Message: messageRef.current.value,
      });
      alert("I ate your email!!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="img">
          <Img className="image" src={logo} />
          <Img className="logoImg" src={cinefile} />
        </div>
        <form
          onSubmit={sendEmail}
          className="mb-4 d-flex form flex-column gap-4 bg-white py-4 px-5 rounded">
          <input
            type="text"
            ref={nameRef}
            className="rounded py-3 border-0"
            placeholder="Your Name"
          />
          <input
            type="email"
            ref={emailRef}
            className="rounded py-3 border-0"
            placeholder="Email Address"
          />
          <input
            type="text"
            ref={messageRef}
            className="rounded py-5 px-3 border-0"
            placeholder="How can I help you?"
          />
          <input
            type="submit"
            disabled={loading}
            className="bg-primary text-white rounded-pill py-3 border-0"
          />
        </form>
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
