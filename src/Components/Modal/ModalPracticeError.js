import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const ModalPracticeError = ({isTheoryResModal,setShow}) => {
  

  const handleClose = () => setShow(false);

  return (
    <Modal show={isTheoryResModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ошибка</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы не прошли теоритический экзамен.</Modal.Body>
    </Modal>
  );
};

export default ModalPracticeError;
