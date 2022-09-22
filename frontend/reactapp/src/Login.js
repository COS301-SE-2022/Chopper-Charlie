import { useState } from "react";
import { Link } from "react-router-dom";
import "./forms.css";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              navigate("/verify-email");
            })
            .catch((err) => alert(err.message));
        } else {
          navigate("/");
        }
      })
      .catch((err) => setError(err.message));
  };

  const SendEmail = (e) => {
    sendPasswordResetEmail(auth, email).then(() => {
      alert("Email has been sent, reset password with link");
    });
  };

  return (
    // <center>
    <div className="center">
      <div className="auth">
        <img src={require("./logo.png")} width="75%" height="75%" alt="Logo" />
        <h2>Login</h2>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={login} name="login_form">
          <input
            type="email"
            value={email}
            required
            placeholder="Enter your email"
            id="username"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            id="pass"
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <p type="button" id="link" onClick={SendEmail}>
            Forgot password
          </p>

          <div class="btn">
            <a href="/register">
              <button type="button" id="reg">
                Register
              </button>
            </a>
            <button id="login" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
      <img
        id="AB"
        src={require("./AB.png")}
        width="10%"
        height="9%"
        alt="Logo"
      />
    </div>
    // </center>
  );
}

export default Login;
