import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function ModalActiveTicket({ hasActiveTicket, setHasActiveTicket, examData }) {
    const { t } = useTranslation()
    const handleClose = () => setHasActiveTicket(false);

    return (
        <Modal show={hasActiveTicket} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t("error")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {" "}
                {/* У вас уже есть активный талон. Данные были высланы в виде SMS. Проверьте свои сообщения. */}
                {t("hasActiveTicket")}

                <div style={{ borderBottom: "1px solid #ccc", margin: "10px 0" }} /> {/* Horizontal line */}

                {examData && (
                    <div>
                        <p>{t("iin")}: {examData.iin}</p>
                        <p>{t("examDate")}: {examData.date}</p>
                        <p>{t("examTime")}: {examData.time}</p>
                        <p>{t("examDepartment")}: {examData.department}</p>
                    </div>
                )}

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
