import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { useTranslation } from "react-i18next";

import { Trans } from 'react-i18next';


export default function TicketPracticeExam() {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [examId, setExamId] = useState(null);
  const [appNumber, setAppNumber] = useState(null);
  const [kpp, setKpp] = useState(null);
  const [category, setCategory] = useState(null);
  const [department, setDepartment] = useState(null);
  const [address, setAddress] = useState(null);
  const { t } = useTranslation()

  useEffect(() => {
    const examId = sessionStorage.getItem("examId");
    setExamId(JSON.parse(examId));
    const appNumber = sessionStorage.getItem("appNumber");
    setAppNumber(JSON.parse(appNumber));
    const kpp = sessionStorage.getItem("kpp");
    setKpp(JSON.parse(kpp));
    //GET INFO APPLICANT
    const user = sessionStorage.getItem("user");
    setUser(JSON.parse(user));
    //GET DATE EXAM APPLICANT ENROLLED
    const date = sessionStorage.getItem("date");;
    setDate(JSON.parse(date));
    const category = sessionStorage.getItem("category");
    setCategory(JSON.parse(category));
    const department = sessionStorage.getItem("department");
    setDepartment(JSON.parse(department));

    const address = sessionStorage.getItem("address");
    setAddress(JSON.parse(address));

    //TRANSFORM TIME CUT SECONDS
    const time = JSON.parse(date);
    const [hours, minutes] = time.time.split(":");
    const timeWithoutSeconds = `${hours}:${minutes}`;
    setTime(timeWithoutSeconds)
  }, []);

  const downloadPdf = () => {
    const content = document.getElementsByTagName('html')[0].cloneNode(true);
    const btn = content.getElementsByClassName('btn btn-success')[0];
    const header = content.getElementsByClassName('header_logo_lang')[0];
    const lang = content.getElementsByClassName('form-select form-select-lg')[0];
    const center = content.getElementsByTagName('center')[0];

    center.removeChild(btn);
    header.removeChild(lang);
    html2pdf(content);
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center mt-5">
        <div id="ticket" className="d-flex flex-column h-50 w-75 border rounded border-dark p-4">
          <h3 className="text-center">
            {t("talonDigital")}
            {/* Цифровой талон №  */}
            {appNumber}</h3>
          <label className="my-2">
            <span className="ticket_text_aside">
              {t("iin")}:&nbsp;
              {/* ИИН:  */}
              <span className="fw-bold">{user?.iin}</span>
            </span>
            <span>{ }</span>
          </label>
          <label className="my-2">
            <span className="ticket_text_aside">
              {t("department")}:&nbsp;
              {/* Отделение:  */}
              <span className="fw-bold">
                <span className="fw-bold">{department}</span>
              </span>
            </span>
          </label>
          <label className="my-2">
            <span className="ticket_text_aside">
              {t("category")}:&nbsp;
              {/* Категория:  */}
              <span className="fw-bold">
                <span className="fw-bold">{category}</span>
              </span>
            </span>
          </label>
          <label className="my-2">
            <span className="ticket_text_aside">
              КПП: <span className="fw-bold">
                <span className="fw-bold">{kpp == "MT" ? "МКПП" : "АКПП"}</span>
              </span>
            </span>
          </label>
          <label className="my-2">
            <span className="ticket_text_aside">
              {t("talonServiceType")}
              {/* Тип услуги:  */}
              <b>
                {t("talonService")}
                {/* Первичное получение прав */}
              </b>
              <span className="fw-bold"></span>
            </span>
            <span className="fw-bold">{user?.service}</span>
          </label>
          <div className="my-2 w-100">
            <span className="ticket_text_aside text-wrap">
              {t("talonData")}
              {/* Дата: */}
            </span>
            <span className="fw-bold mx-2">
              {new Date(date?.date).toLocaleDateString()}
            </span>
          </div>

          <div className="my-2 w-100">
            <span className="ticket_text_aside text-wrap">
              {t("talonTime")}
              {/* Время: */}
            </span>
            <span className="fw-bold mx-2">{time}</span>
          </div>

          <div className="my-2 w-100">
            <span className="ticket_text_aside text-wrap">
              {t("talonAddress")}
              {/* Адрес: */}
            </span>
            <span className="fw-bold mx-2">{address}</span>
          </div>

          <p className="text-center text-muted fw-bold mt-4">
            <Trans
              i18nKey="talonNote"
              components={{
                span: <span style={{ color: 'red' }} />
              }}
            />
          </p>

          {/* <p className="text-center text-muted">
            <a href="https://booking.gov4c.kz/">https://booking.gov4c.kz/</a>
          </p> */}


          <p className="text-center text-danger">
            {t("talonSave")}
            {/* Сохраните этот талон */}
          </p>
        </div >
      </div >
      <br></br>
      <center>
        <button onClick={downloadPdf} type="button" className="btn btn-success">
          {t("talonPDF")}
          {/* Скачать PDF */}

        </button>
      </center>
    </>
  );
}
