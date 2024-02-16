import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function UserDataView2() {
    const { t } = useTranslation()
    const [user, setUser] = useState(null);
    useEffect(() => {
        //GET INFO ABOUT APPLICANT FROM STORAGE
        const userData = JSON.parse(sessionStorage.getItem("user"))
        setUser(userData)
    }, []);

    return (
        <div className="d-flex w-100 flex-column my-2">
            <p className="ticket_text_aside">
                {t("iin")}: <span className="fw-bold">{user?.iin}</span>
            </p>

            <p className="ticket_text_aside">
                {t("fullName")}: <span className="fw-bold">{user?.fullname}</span>
            </p>
        </div>
    );
}