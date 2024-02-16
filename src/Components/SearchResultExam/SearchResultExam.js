import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router";

import { FaUserAlt } from "react-icons/fa";

import { getDepartmentById } from "../../helpers/ApiRequestList";

import "./SearchResultExam.css";

const SearchResultExam = () => {
  const [userData, setUserData] = useState(null);
  const [department, setDepartment] = useState(null)

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  const handleHomePage = () => {
    navigate("/");
  };

  const getDepartment = async (id) => {
    const response = await getDepartmentById(id)
    sessionStorage.setItem('departmentSearchResult', JSON.stringify(response))
  }

  useEffect(() => {
    const userDataStorage = sessionStorage.getItem('user')
    const res = JSON.parse(userDataStorage)[0]

    setUserData(res)

    getDepartment(res?.fields?.department)
    const department = sessionStorage.getItem('departmentSearchResult')
    setDepartment(JSON.parse(department))

  }, [department])

  return (
    <main className="search_result_exam_offset">
      <div className="d-flex w-100 px-5 mt-5 justify-content-around">
        <div className="d-flex h-100 justify-content-center">
          <FaUserAlt className="icon" />
        </div>
        <div className="d-flex flex-column w-50 align-items-start">
          <p className="ticket_text_aside">
            ФИО: <span className="text_data">{userData?.fields?.fullname}</span>{" "}
          </p>
          <p className="ticket_text_aside">
            ИИН: <span className="text_data">{userData?.fields?.iin}</span>
          </p>
          <p className="ticket_text_aside">
            Отделение: <span className="text_data">{department?.name}</span>
          </p>
          <p className="ticket_text_aside">
            {/* Тип услуги: <span className="text_data">{userData[0]?.fields?.service}</span> */}
          </p>
          <p className="ticket_text_aside">
            Дата и время для сдачи практического экзамена:{" "}
            <span className="text_data">
              Дата и время для сдачи практического экзамена
            </span>
          </p>
          <p className="ticket_text_aside">
            Статус ТЭ: <span className="text_data">{userData?.fields?.statusT ? "СДАН" : "НЕ СДАН"}</span>
          </p>
          <p className="ticket_text_aside">
            Статус ТЭ: <span className="text_data">{userData?.fields?.statusP ? "СДАН" : "НЕ СДАН"}</span>
          </p>
        </div>
      </div>
      <div className="d-flex w-100 align-items-center justify-content-center mt-5">
        <button className="btn btn-danger mx-2" onClick={() => handleCancel()}>
          Отмена
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => handleHomePage()}
        >
          Главная страница
        </button>
      </div>
    </main>
  );
};

export default SearchResultExam;
