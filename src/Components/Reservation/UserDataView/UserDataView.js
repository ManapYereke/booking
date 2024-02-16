import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function UserDataView() {
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
      {/*<p className="ticket_text_aside">
        {t("city")}: <span className="fw-bold">{user?.city}</span>
      </p>
      <p className="ticket_text_aside">
        {t("department")}: <span className="fw-bold">{user?.department}</span>
  </p>*/}
      <p className="ticket_text_aside">
        {t("category")}: <span className="fw-bold">{user?.category}</span>
      </p>
    </div>
  );
}
