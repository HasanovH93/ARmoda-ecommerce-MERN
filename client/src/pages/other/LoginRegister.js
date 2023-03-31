import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Modal from "react-bootstrap/Modal";

const LoginRegisterContent = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="modal-25w">
      <Tab.Container defaultActiveKey="login">
        <Modal.Header closeButton>
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
        </Modal.Header>
        <Modal.Body>
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <LoginForm onHide={onHide} />
            </Tab.Pane>
            <Tab.Pane eventKey="register">
              <RegisterForm onHide={onHide} />
            </Tab.Pane>
          </Tab.Content>
        </Modal.Body>
      </Tab.Container>
    </Modal>
  );
};

export default LoginRegisterContent;
