import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function ModalAppNumberError({ noAppNumber, setNoAppNumber }) {
    const { t } = useTranslation()
    const handleClose = () => setNoAppNumber(false);
    return (
        <Modal show={noAppNumber} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t("error")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {" "}
                {/* У вас ошибочный номер заявки. */}
                {t("noAppNumber")}
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
