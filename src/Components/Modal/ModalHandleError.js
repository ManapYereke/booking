import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const ModalPracticeError = ({errorMessage,setShow}) => {
  

  const handleClose = () => setShow("");

  return (
    <Modal show={errorMessage.length>0} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ошибка</Modal.Title>
      </Modal.Header>
      <Modal.Body>{{errorMessage}}</Modal.Body>
    </Modal>
  );
};

export default ModalPracticeError;
