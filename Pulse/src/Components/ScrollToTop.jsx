import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import './ScrollToTop.css'
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
   const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // or "smooth"
    });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button onClick={scrollToTop} className="scroll-to-top">
      <FaArrowUp />
    </button>
  );
}
