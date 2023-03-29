import React from "react";
import Modal from "react-bootstrap/Modal";

const LoginRegisterModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
};

export default LoginRegisterModal;
