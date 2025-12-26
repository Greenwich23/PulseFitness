import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import StyledButton from "../Components/Buttons";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import './forgotPassword.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000, once: true, delay: 3 }); // 1000ms = 1s
  }, []);

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email);

    // SECURITY: don’t reveal if email exists or not
    if (!user) {
      toast.success("If this email exists, a reset link has been sent.");
      return;
    }

    setLoading(true);

    // 🔐 generate token
    const token =
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2);

    // ⏳ token expires in 30 minutes
    const resetData = {
      email: user.email,
      token,
      expiry: Date.now() + 1000 * 60 * 30,
    };

    localStorage.setItem("passwordReset", JSON.stringify(resetData));

    // 🔗 reset link
    const resetLink = `${window.location.origin}/reset-password?token=${token}`;

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_PASSWORD_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_PASSWORD_TEMPLTE_ID,
        {
          email: user.email,
          name: user.name || "User",
          link: resetLink,
          company_name: "Pulse",
        },
        import.meta.env.VITE_EMAILJS_PASSWORD_PUBLIC_KEY
      );

      toast.success("Password reset link sent! Check your email 📩");
      //   navigate('/resetPassword')
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgotPasswordDiv" data-aos="fade-up">
      <h2 style={{ textAlign: "center" }}>Forgot Password</h2>

      <form onSubmit={handleForgotPassword}>
        <p style={{ textAlign: "center", marginTop: "15px" }}>Email address</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginTop: "5px" }}
        />

        <StyledButton
          type="submit"
          disabled={loading}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </StyledButton>
      </form>
    </div>
  );
}
