import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaLock, FaFacebookF } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../api";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../store/slices/auth-slice";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Please specify your password")
    .min(8, "The password should have a minimum length of 8"),
});

const LoginForm = ({ onHide }) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    try {
      const response = await api.post("/users/login", {
        email: values.email,
        password: values.password,
      });
      dispatch(setUserToken(response.data));
      onHide();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <Container className="auth-form login-form">
      <Row>
        <Col>
          <h2 className="text-center">Sign In</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="email">
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
            </Form.Group>
            <Form.Group controlId="password">
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
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-btn">
              Submit
            </Button>
          </Form>
          <div className="separator">OR</div>
          <Button variant="primary" className="facebook-login-btn">
            <FaFacebookF /> Login with Facebook
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
