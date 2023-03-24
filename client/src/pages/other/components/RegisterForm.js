import api from "../../../api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../store/slices/auth-slice";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePass, setRePass] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== rePass) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await api.post("/users/register", {
        username,
        email,
        password,
        rePass,
      });
      dispatch(setUserToken(response.data));
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-register-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="user-name"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="user-email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="user-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="user-repassword"
            placeholder="Confirm Password"
            value={rePass}
            onChange={(e) => setRePass(e.target.value)}
          />
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
