import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import StyledButton from "../Components/Buttons";
import "./resetPassword.css";
import Aos from "aos";
import "aos/dist/aos.css";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    Aos.init({ duration: 1000, once: true, delay: 3 }); // 1000ms = 1s
  }, []);

  useEffect(() => {
    const resetData = JSON.parse(localStorage.getItem("passwordReset"));

    if (!token || !resetData) {
      toast.error("Invalid or expired reset link");
      navigate("/forgot-password");
      return;
    }

    if (resetData.token !== token || Date.now() > resetData.expiry) {
      toast.error("Reset link expired or invalid");
      navigate("/forgot-password");
    }
  }, [token, navigate]);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      setError(
        "Password must contain:\n• At least one uppercase letter\n• At least one lowercase letter\n• At least one digit (0-9)\n• At least one special character (@$!%*?&)\n• Minimum 8 characters"
      );
      return;
    }

    const resetData = JSON.parse(localStorage.getItem("passwordReset"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email === resetData.email ? { ...u, password } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("passwordReset");

    toast.success("Password reset successful! Please log in 🔐");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="resetPasswordDiv" data-aos="fade-up">
      <h2>Reset Password</h2>

      <form onSubmit={handleResetPassword} className="resetPasswordForm">
        <div className="inputDiv">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="inputDiv">
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <p style={{ color: "red", marginTop : "20px"}}>{error}</p>

        <StyledButton type="submit">Reset Password</StyledButton>
      </form>
    </div>
  );
}
