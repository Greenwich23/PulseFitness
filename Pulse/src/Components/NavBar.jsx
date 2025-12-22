import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { FaBarcode, FaBars } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCartContext } from "../Context/cartContext";
import { useAuth } from "../Context/authContext";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const { cart } = useCartContext();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setOpen(() => false);
  }, [pathname]);

  return (
    <div className="navPage">
      <div className="navBar">
        <NavLink className={"logo"} to={"/"}>
          PULSE
        </NavLink>
        <div className="navLinksDiv">
          <NavLink
            className={({ isActive }) =>
              isActive ? "navLinks active" : "navLinks"
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink className={"navLinks"} to={"/women"}>
            Women
          </NavLink>
          <NavLink className={"navLinks"} to={"/men"}>
            Men
          </NavLink>
          <NavLink className={"navLinks"} to={"/accessories"}>
            Accessories
          </NavLink>
          <NavLink className={"navLinks"} to={"/contact"}>
            Contact Us
          </NavLink>
          <NavLink className={"navLinks"} to={"/about"}>
            About
          </NavLink>
        </div>
        <div className="navEssentials">
          {open == false ? (
            <FaBars className="barsIcon" onClick={() => setOpen(!open)} />
          ) : (
            <FiX className="barsIcon" onClick={() => setOpen(!open)} />
          )}
          {isAuthenticated ? (
            <NavLink to={"/profile"} className={"navEssentialsLinks"}>
              <IoPerson className="profileIcon" />
            </NavLink>
          ) : (
            <NavLink to={"/login"} className={"navLinks"}>
              Login
            </NavLink>
          )}
          <div className="cartDiv">
            <NavLink to={"/checkout"} className={"navEssentialsLinks"}>
              <BsCart className="cartIcon" />
            </NavLink>
            <p className="cartCount">{cart?.length}</p>
          </div>
        </div>
      </div>
      <div
        className={open == false ? "navLinksDropDown" : "navLinksDropDown open"}
      >
        <NavLink className="nav-links" to={"/"}>
          Home
        </NavLink>
        <NavLink className="nav-links" to={"/women"}>
          Women
        </NavLink>
        <NavLink className="nav-links" to={"/accessories"}>
          Accessories
        </NavLink>
        <NavLink className="nav-links" to={"/men"}>
          Men
        </NavLink>
        <NavLink className="nav-links" to={"/contact"}>
          Contact Us
        </NavLink>
        <NavLink className="nav-links" to={"/about"}>
          About
        </NavLink>
        {!isAuthenticated && (
          <NavLink className="nav-links" to={"/login"}>
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
