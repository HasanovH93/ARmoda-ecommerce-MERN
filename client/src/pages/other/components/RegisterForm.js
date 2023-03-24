import React from "react";

const RegisterForm = () => {
  return (
    <div className="login-form-container">
      <div className="login-register-form">
        <form>
          <input type="text" name="user-name" placeholder="Username" />
          <input type="password" name="user-password" placeholder="Password" />
          <input name="user-email" placeholder="Email" type="email" />
          <div className="button-box">
            <button type="submit">
              <span>Register</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
