import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function ModalTheoryExam({ notPassExam, setNotPassExam }) {
  const { t } = useTranslation()
  const handleClose = () => setNotPassExam(false);
  return (
    <Modal show={notPassExam} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("error")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        {/* Вы не сдали теоритический экзамен. */}
        {t("notPassedTheory")}
      </Modal.Body>
      <Modal.Footer>
        <Link to="/reservation">
          <Button variant="primary" onClick={handleClose}>
            ОК
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}
