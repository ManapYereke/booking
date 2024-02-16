import React from "react";
import {Modal,Button} from 'react-bootstrap'
import { Link } from "react-router-dom";

const ModalCongratPractice = ({congartModal,setShow}) => {
    const handleClose = () => setShow(false);
  return (
    <Modal show={congartModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Поздравляем!!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Поздравляем вы успешно сдали практический экзамен!!!.
      </Modal.Body>
      <Modal.Footer>
        <Link to="/reservation/practice-exam">
          <Button variant="primary" onClick={handleClose}>
            Перейти на главную страницу 
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCongratPractice;
