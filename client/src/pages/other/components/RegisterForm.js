import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../api";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../store/slices/auth-slice";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required."),
  password: Yup.string()
    .required("Please specify your password")
    .min(8, "The password should have a minimum length of 8"),
  rePass: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    rePass: "",
  };

  const onSubmit = async (values) => {
    try {
      const response = await api.post("/users/register", {
        username: values.username,
        email: values.email,
        password: values.password,
        rePass: values.rePass,
      });
      dispatch(setUserToken(response.data));
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="login-form-container">
      <div className="login-register-form">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error-message">{formik.errors.username}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="rePass">Confirm Password</label>
            <input
              type="password"
              name="rePass"
              value={formik.values.rePass}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.rePass && formik.errors.rePass ? (
              <div className="error-message">{formik.errors.rePass}</div>
            ) : null}
          </div>
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
