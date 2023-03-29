import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const LoginRegisterContent = () => {
  return (
    <div className="login-register-wrapper">
      <Tab.Container defaultActiveKey="login">
        <Nav variant="pills" className="login-register-tab-list">
          <Nav.Item>
            <Nav.Link eventKey="login">
              <h4>Login</h4>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="register">
              <h4>Register</h4>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="login">
            <LoginForm />
          </Tab.Pane>
          <Tab.Pane eventKey="register">
            <RegisterForm />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default LoginRegisterContent;
