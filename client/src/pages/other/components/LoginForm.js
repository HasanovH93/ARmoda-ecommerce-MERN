import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="login-form-container">
      <div className="login-register-form">
        <form>
          <input type="text" name="user-name" placeholder="Username" />
          <input type="password" name="user-password" placeholder="Password" />
          <div className="button-box">
            <div className="login-toggle-btn">
              <input type="checkbox" />
              <label className="ml-10">Remember me</label>
              <Link to={process.env.PUBLIC_URL + "/"}>Forgot Password?</Link>
            </div>
            <button type="submit">
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
