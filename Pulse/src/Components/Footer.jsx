import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerDiv">
        <div className="footerLinksContainer">
          <div className="footerLinkDiv">
            <h2>PULSE</h2>
            <p>Premium performance wear for the modern athlete.</p>
            <div className="footerSocialLinks">
              <a href=""><FaInstagram className="footerSocialLinksIcons"/></a>
              <a href=""><FaTwitter className="footerSocialLinksIcons"/></a>
              <a href="https://github.com/Greenwich23"><FaGithub className="footerSocialLinksIcons"/></a>
              <a href="https://www.linkedin.com/in/nosa-enabu-61a632310/"><FaLinkedin className="footerSocialLinksIcons"/></a>
            </div>
          </div>
          <div className="footerLinkDiv">
            <h3>SHOP</h3>
            <div className="shopLinksDiv">
              <NavLink className={"shopLinks"} to={"/"}>
                New Arrivals
              </NavLink>
              <NavLink className={"shopLinks"} to={"/women"}>
                Women
              </NavLink>
              <NavLink className={"shopLinks"} to={"/men"}>
                Men
              </NavLink>
              <NavLink className={"shopLinks"} to={"/accessories"}>
                Accessories
              </NavLink>
            </div>
          </div>
          <div className="footerLinkDiv">
            <h3>HELP</h3>
            <div className="shopLinksDiv">
              <NavLink className={"shopLinks"} to={"/contact"}>
                Customer Service
              </NavLink>
              <NavLink className={"shopLinks"} to={"/sizeguide"}>
                Size Guide
              </NavLink>
            </div>
          </div>
          <div className="footerLinkDiv">
            <h3>ABOUT</h3>
            <div className="shopLinksDiv">
              <NavLink className={"shopLinks"} to={"/about"}>
                Our Story
              </NavLink>
              <NavLink className={"shopLinks"} to={"/contact"}>
                Contact
              </NavLink>
            </div>
          </div>
        </div>
        <hr />
        <div className="footerCompany">
          <p className="pulseRights">&copy; 2025 Pulse. All rights reserved.</p>
          <div className="footerCompanyLinks">
            <NavLink className={"shopLinks"}>Privacy Policy</NavLink>
            <NavLink className={"shopLinks"}>Terms of Service</NavLink>
            <NavLink className={"shopLinks"}>Accessibilty</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
