import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalNotFoundDT = ({ isDTFound,setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <Modal show={isDTFound} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ошибка</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы неправильно ввели номер цифрового талона</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalNotFoundDT;
