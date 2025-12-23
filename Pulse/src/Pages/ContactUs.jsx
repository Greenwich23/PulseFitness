import { FaPhone } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { BiMessageRounded } from "react-icons/bi";
import "./contactUs.css";
import { FaLocationDot } from "react-icons/fa6";
import StyledButton from "../Components/Buttons";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function ContactUs() {
  const [emailJsReady, setEmailJsReady] = useState(false);

  // ✅ FIXED: For emailjs-com, initialization is SYNCHRONOUS
  useEffect(() => {
    // Debug: Check if environment variable exists
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    console.log("Public Key loaded:", publicKey ? "YES" : "NO");

    if (!publicKey) {
      console.error("❌ VITE_EMAILJS_PUBLIC_KEY is missing!");
      toast.error(
        "Email service configuration error. Please refresh the page."
      );
      return;
    }

    try {
      // For emailjs-com, .init() does NOT return a promise
      emailjs.init(publicKey);
      console.log("✅ EmailJS initialized (emailjs-com)");
      setEmailJsReady(true);
    } catch (error) {
      console.error("❌ EmailJS initialization failed:", error);
      toast.error("Failed to initialize email service");
    }
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!emailJsReady) {
      toast.error("Please wait, email service is still initializing...");
      return;
    }

    // ✅ FIXED: Check all required environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS environment variables:");
      console.log("Service ID:", serviceId ? "Present" : "Missing");
      console.log("Template ID:", templateId ? "Present" : "Missing");
      console.log("Public Key:", publicKey ? "Present" : "Missing");

      toast.error(
        "Email service configuration incomplete. Please contact support."
      );
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, e.target, publicKey)
      .then(() => {
        toast.success("Message sent successfully 📧");
        e.target.reset();
      })
      .catch((error) => {
        console.error("EmailJS send error:", error);
        toast.error("Failed to send message ❌");
      });
  };

  return (
    <div className="contactUsPage">
      <div className="contactUsDiv">
        <h1>Get in Touch</h1>
        <p>
          Have questions? We're here to help. Reach out to our team and we'll
          respond as soon as possible.
        </p>
      </div>
      <hr className="customHr" />
      <div className="contactUsInfoDiv">
        <div className="contactUsInfo">
          <h2>Contact Information</h2>
          <p className="contactUsInfoDesc">
            Whether you need help with an order, have questions about our
            products, or want to collaborate with us, we'd love to hear from
            you.
          </p>
          <div className="contactUsInfoCard">
            <div className="iconsDiv">
              <CiMail className="contactUsIcons" />
            </div>
            <div className="contactUsInfoText">
              <h3>Email</h3>
              <p>pulsefitnesswears@gmail.com</p>
              <p>greenftw@gmail.com</p>
            </div>
          </div>
          <div className="contactUsInfoCard">
            <div className="iconsDiv">
              <FaPhone className="contactUsIcons" />
            </div>
            <div className="contactUsInfoText">
              <h3>Phone</h3>
              <p>+234-80-970-970-18</p>
              <p>Mon-Fri, 9am-6pm EST</p>
            </div>
          </div>
          <div className="contactUsInfoCard">
            <div className="iconsDiv">
              <FaLocationDot className="contactUsIcons" />
            </div>
            <div className="contactUsInfoText">
              <h3>Headquarters</h3>
              <p>Wuse Zone 3, lukulu street</p>
              <p>Abuja, Nigeria 900285</p>
            </div>
          </div>
          <hr />
          <div className="contactUsInfoWorkTime">
            <h3>Store Hours</h3>
            <div className="hoursDiv">
              <p>Monday - Friday</p>
              <p>10:00AM - 8:00PM</p>
            </div>
            <div className="hoursDiv">
              <p>Saturday</p>
              <p>10:00AM - 6:00PM</p>
            </div>
            <div className="hoursDiv">
              <p>Sunday</p>
              <p>12:00PM - 5:00PM</p>
            </div>
          </div>
        </div>
        <form className="contactUsFormDiv" onSubmit={sendEmail}>
          <h2>Send us a Message</h2>
          <div className="contactUsFormFields">
            <label htmlFor="">Name *</label>
            <input type="text" placeholder="Your name" required name="name" />
          </div>
          <div className="contactUsFormFields">
            <label htmlFor="">Email *</label>
            <input
              type="email"
              placeholder="your@gmail.com"
              required
              name="email"
            />
          </div>
          <div className="contactUsFormFields">
            <label for="subject">Subject *</label>

            <select id="subject" name="title">
              <option value="">-- Select a subject --</option>
              <option value="ng">Order & Inquiry</option>
              <option value="us">Product Question</option>
              <option value="uk">Shipping & Returns</option>
              <option value="ca">Feedback</option>
              <option value="ca">Partnership Opportunity</option>
              <option value="ca">Others</option>
            </select>
          </div>
          <div className="contactUsFormFields">
            <label htmlFor="">Message *</label>
            <textarea
              placeholder="How can we help you?...."
              required
              className="contactMessageDiv"
              name="message"
            ></textarea>
          </div>
          {/* <StyledButton>
              <BiMessageRounded /> Send Message
            </StyledButton> */}
          <button className="sendMessageBtn" type="submit">
            <BiMessageRounded className="sendMessageIcon" /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
