import { useState } from "react";
import { useAuth } from "../Context/authContext";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import styles from "./login.module.css";
import StyledButton from "../Components/Buttons";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function Login() {
  const { login, user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [eyeOpen, setEyeOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(email, password);
      toast.success(`Welcome back 👋`)
      navigate(redirectTo);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.handleSubmitDiv}>
      <h2 className={styles.loginHeader}>Login</h2>
      <p className={styles.loginDescription}>
        Shop your styles, save top picks to your wishlist, track those orders &
        train with us.
      </p>
      <div className={styles.inputFieldsDiv}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address*"
          className={styles.loginInputFields}
          required
        />
      </div>

      <div className={styles.passwordDiv}>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password*"
          type={eyeOpen == true ? "text" : "password"}
          className={styles.loginInputFields}
          required
        />
        {eyeOpen == true ? (
          <FaEyeSlash
            className={styles.eyeIcon}
            onClick={() => setEyeOpen((prevValue) => !prevValue)}
          />
        ) : (
          <FaEye
            className={styles.eyeIcon}
            onClick={() => setEyeOpen((prevValue) => !prevValue)}
          />
        )}
      </div>

      <StyledButton className={styles.loginBtn}>Log in</StyledButton>
      <p>
        Don't have an account?{" "}
        <NavLink className={styles.signUpNavLink} to={"/signup"}>
          Sign up
        </NavLink>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
