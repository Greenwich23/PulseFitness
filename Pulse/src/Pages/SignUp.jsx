import { useState } from "react";
import { useAuth } from "../Context/authContext";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import styles from "./login.module.css";
import StyledButton from "../Components/Buttons";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  //   const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [eyeOpen, setEyeOpen] = useState(false);

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" }); // "December"
  const currentYear = currentDate.getFullYear();
  const memberSince = currentMonth + " " + currentYear;

  const handleSubmit = (e) => {
    e.preventDefault();

    // ❌ Block submission if passwords don't match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      signup(name, email, password, phoneNumber, memberSince);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  // let confirmError = "";

  // if (password == confirmPassword) {
  //   confirmError = "";
  // } else if (confirmPassword == "") {
  //   confirmError = "";
  // } else {
  //   confirmError = "Passwords must match";
  // }

  return (
    <form onSubmit={handleSubmit} className={styles.handleSubmitDiv}>
      <h2 className={styles.loginHeader}>Sign Up</h2>
      <p className={styles.loginDescription}>
        Shop your styles, save top picks to your wishlist, track those orders &
        train with us.
      </p>
      <div className={styles.inputFieldsDiv}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name*"
          type="text"
          className={styles.loginInputFields}
          required
        />
      </div>

      <div className={styles.inputFieldsDiv}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address*"
          className={styles.loginInputFields}
          required
        />
      </div>

      <div className={styles.inputFieldsDiv}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number*"
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

      <div className={styles.passwordDiv}>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password*"
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
      {error && <p style={{ color: "red" }}>{error}</p>}

      <StyledButton className={styles.loginBtn}>Sign Up</StyledButton>
      <p>
        Don't have an account?{" "}
        <NavLink className={styles.signUpNavLink} to={"/login"}>
          Log in
        </NavLink>
      </p>
    </form>
  );
}
