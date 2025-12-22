import { PiSpiral } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { LuSparkles } from "react-icons/lu";
import "./about.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true, delay: 3 }); // 1000ms = 1s
  }, []);

  return (
    <div className="aboutPage">
      <div className="aboutPageFirstection">
        <h2>About Pulse</h2>
        {/* <hr /> */}
        <div className="aboutOurStoryDiv">
          <div className="aboutPageText" data-aos="fade-right">
            <h3>Our Story</h3>
            <p className="aboutOurStoryDesc">
              Founded in 2024, Pulse was born from a simple belief: athletic
              wear should empower you to perform at your best while looking your
              best. We noticed a gap in the market for premium gym wear that
              truly balanced performance, style, and sustainability.
            </p>
            <p className="aboutOurStoryDesc">
              What started as a small collection of essential pieces has evolved
              into a comprehensive line of premium athletic wear designed for
              those who refuse to compromise. Every Pulse product is crafted
              with meticulous attention to detail, using cutting-edge fabrics
              and construction techniques.
            </p>
            <p className="aboutOurStoryDesc">
              We're more than just a brand—we're a community of athletes, yogis,
              runners, and fitness enthusiasts who believe that movement is
              medicine and that what you wear matters.
            </p>
          </div>
          <div className="aboutUsImage" data-aos="fade-left">
            <img
              src="https://images.unsplash.com/photo-1763701502944-f8ce0fd8a28b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdlYXIlMjBzdHVkaW98ZW58MXx8fHwxNzY1MjY4MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="aboutImage"
            />
          </div>
        </div>
      </div>
      <div className="aboutPageSecondSection">
        <h3>Our Mission & Values</h3>
        <p className="aboutPageSecondSectionDesc">
          We're committed to creating exceptional athletic wear that inspires
          confidence and performance
        </p>
        <div className="aboutUsCardsDiv">
          <div className="aboutUsCard">
            <div className="aboutUsCardIconDiv">
              <PiSpiral className="aboutUsCardIcon" />
            </div>
            <h4>Performance First</h4>
            <p>
              Every product is engineered with performance-enhancing features
              and premium materials that move with you.
            </p>
          </div>
          <div className="aboutUsCard">
            <div className="aboutUsCardIconDiv">
              <LuSparkles className="aboutUsCardIcon" />
            </div>
            <h4>Timeless Design</h4>
            <p>
              Minimalist aesthetics that transcend trends. Our pieces are
              designed to look as good as they perform..
            </p>
          </div>
          <div className="aboutUsCard">
            <div className="aboutUsCardIconDiv">
              <FaRegHeart className="aboutUsCardIcon" />
            </div>
            <h4>Sustainability</h4>
            <p>
              We're committed to responsible production, using recycled
              materials and ethical manufacturing practices.
            </p>
          </div>
          <div className="aboutUsCard">
            <div className="aboutUsCardIconDiv">
              <MdPeopleAlt className="aboutUsCardIcon" />
            </div>
            <h4>Community</h4>
            <p>
              Building a global community of individuals who inspire each other
              to push boundaries and achieve more.
            </p>
          </div>
        </div>
      </div>
      <div className="aboutPageThirdSection">
        <div className="aboutUsImagesContainer">
          <div className="aboutUsImagesDiv">
            <img
              src="https://images.unsplash.com/photo-1717500252709-05a73fc4f1da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZ3ltJTIwc3BhY2V8ZW58MXx8fHwxNzY1MjY4MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt=""
              className="aboutUsImages"
            />
          </div>
          <div className="aboutUsImagesDiv">
            <img
              src="https://images.unsplash.com/photo-1750698544794-bf1cd7038f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYnJhbmQlMjB0ZWFtfGVufDF8fHx8MTc2NTI2ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt=""
              className="aboutUsImages"
            />
          </div>
        </div>
        <div className="pulsePromiseDiv" data-aos="fade-up">
          <h2>The Pulse Promise</h2>
          <p>
            We stand behind every product we make. If you're not completely
            satisfied with your purchase, we'll make it right.
          </p>
          <div className="pulsePromiseCardsDiv">
            <div className="pulsePromiseCards">
              <h3>Premium Quality</h3>
              <p>
                Rigorously tested fabrics and construction for lasting
                performance
              </p>
            </div>
            <div className="pulsePromiseCards">
              <h3>30-Day Returns</h3>
              <p>Not happy? Return it within 30 days for a full refund</p>
            </div>
            <div className="pulsePromiseCards">
              <h3>Free Shipping</h3>
              <p>On all orders over $150, anywhere in the country</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
