import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../api";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../store/slices/auth-slice";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock, FaFacebookF } from "react-icons/fa";

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

const RegisterForm = ({ onHide }) => {
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
      onHide();
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
    <Container className="auth-form register-form">
      <Row>
        <Col>
          <h2 className="text-center">Sign Up</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="username" className="sr-only">
                Username
              </Form.Label>
              <div className="input-icon">
                <FaUser />
                <Form.Control
                  type="text"
                  required
                  placeholder="Username"
                  className="border-bottom-only"
                  {...formik.getFieldProps("username")}
                />
              </div>
              {formik.touched.username && formik.errors.username ? (
                <div className="text-danger">{formik.errors.username}</div>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email" className="sr-only">
                Email address
              </Form.Label>
              <div className="input-icon">
                <FaEnvelope />
                <Form.Control
                  type="email"
                  required
                  placeholder="Email"
                  className="border-bottom-only"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password" className="sr-only">
                Password
              </Form.Label>
              <div className="input-icon">
                <FaLock />
                <Form.Control
                  type="password"
                  required
                  placeholder="Password"
                  className="border-bottom-only"
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="repeatPassword" className="sr-only">
                Repeat Password
              </Form.Label>
              <div className="input-icon">
                <FaLock />
                <Form.Control
                  type="password"
                  required
                  placeholder="Repeat Password"
                  className="border-bottom-only"
                  {...formik.getFieldProps("rePass")}
                />
              </div>
              {formik.touched.rePass && formik.errors.rePass ? (
                <div className="text-danger">{formik.errors.rePass}</div>
              ) : null}
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-btn">
              Submit
            </Button>
          </Form>
          <div className="separator">OR</div>
          <Button variant="primary" className="facebook-login-btn">
            <FaFacebookF /> Sign in with Facebook
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
