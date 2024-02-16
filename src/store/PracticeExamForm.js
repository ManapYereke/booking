import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setData } from "../../../../store/slices/ReservationTheoryData";

import UserDataView from "../../UserDataView/UserDataView";
import ModalLoading from "../../ModalLoading/ModalLoading";
import { setDataUser } from "../../../../store/slices/userDataSlice";
import { useTranslation } from "react-i18next";


const PracticeExamForm = () => {
  const { t } = useTranslation()
  //LOADING ANIMATION
  const [loading, setLoading] = useState(false);
  //SET TODAY DATE FOR DATEPICKER
  const [today, setToday] = useState(null);

  //IF DATE IN THIS DAY NOT EXAMS
  const [dateError, setDateError] = useState(false);
  // DATE FREE EXAM LIST FOR PRACTICE
  const [dateList, setDateList] = useState([]);
  // APPLICANT SELECTED DATE
  const [date, setDate] = useState("");
  //APPLICANT SELECTED TIME
  const [time, setTime] = useState(null);
  //SET EXAMID
  const [examId, setExamId] = useState(null);
  //SELECTED KPP IF APPLICANT HAVE CATEGORY "B"
  const [kpp, setKPP] = useState("");
  //SET ERROR WHEN SEND DATA AND TIME FOR RESERVATION
  const [errorText, setErrorText] = useState("");
  //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
  const [notTheoryExam, setNotTheoryExam] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //GET APPLICANT INFO FROM REDUX
  const userData = useSelector((state) => state.userData.userData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    selectCity: "",
    selectAddress: "",
    selectDate: "",
    IIN: "",
    mode: "onChange",
  });

  //SELECT DATE
  const onChangeSelectDate = (value) => {
    setDate(value);

    const sortedTime = dateList.filter((item) => item.date.includes(value));

    dispatch(setData(sortedTime));
    setTime(sortedTime);
  };

  //SELECT TIME
  const onChangeSelectTime = (value) => {
    const obj = time.filter((item) => item.time.includes(value));

    const timeObj = {
      date: obj[0]?.date,
      time: obj[0]?.time,
    };

    const obj1 = sessionStorage.getItem("date");
    if (obj1 === null) {
      sessionStorage.setItem("date", JSON.stringify(timeObj));
    } else {
      sessionStorage.setItem("date", JSON.stringify(timeObj));
    }
    setExamId(obj[0]?.id);
  };

  //GET FREE PRACTICE EXAM
  // const getFreeExamPractice = async (id_depart) => {
  //   const url = "/api/practice/free/exams/";
  //   const username = "admin";
  //   const password = "admin";

  //   const id = id_depart;
  //   const categoryName = userData.category;
  //   const kpp = userData.kpp === "Автомат" ? "автомат" : "механика";

  //   fetch(url, {
  //     headers: {
  //       Authorization: "Basic " + btoa(username + ":" + password),
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Headers": "Content-Type",
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
  //     },
  //     method: "POST",
  //     body: JSON.stringify({
  //       department_id: id,
  //       category: categoryName,
  //       kpp: kpp,
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error(`Request failed with status code ${response.status}`);
  //       }
  //     })
  //     .then((data) => {
  //       if (data.length === 0) {
  //         setDateError(true);
  //         setDateList(data);
  //       } else {
  //         setDateError(false);
  //         setDateList(data);
  //       }
  //     })
  //     .catch(function (res) {});
  // };

  //POST DATA TO SERVER AFTER CHOISE APPLICANT DATE AND TIME
  const postUserExamData = (user_exam_data) => {
    const url = "/api/practice/enroll/queue/";
    const username = "admin";
    const password = "admin";

    fetch(url, {
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      },
      method: "POST",
      body: JSON.stringify(user_exam_data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setErrorText(response.status);
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .then((res) => {
        //IF APPLICANT ENROLLED TO PRACTICE EXAM
        if (res.enrolled) {
          navigate("/reservation/practice-exam/ticket");
        }
        //APPLICANT NOT ENRLLED GET ERROR FROM SERVER
        else if (res.error) {
          setNotTheoryExam(res.error);
        }
      })
      .catch(function (res) {
        setErrorText(res);
      });
  };

  //APPLICANT SELECTED DATE AND TIME SEND DATA
  const handleSubmitPracticeExam = () => {
    const obj = {
      user_id: userData.id,
      exam_id: examId,
    };

    postUserExamData(obj);
    setLoading(true);

    //LOADING ANIMATE
    setTimeout(() => {
      setLoading(false);
    }, 500);
    reset();
  };

  // const userData = JSON.parse(sessionStorage.getItem("user"))
  useEffect(() => {
    const todayDate = new Date().toISOString().slice(0, 10);
    setToday(todayDate);
    getFreeExamPractice(userData.department_code);
  }, []);

  return (
    <div className="form_input_date_item">
      {/* SHOW APPLICANT INFO */}
      <div className="d-flex align-items-start justify-content-center form-control my-4 ">
        <UserDataView />
      </div>
      <h2>{errorText}</h2>
      {/* APPLICANT NOT PASS THEORY EXAM */}
      {notTheoryExam.length !== 0 ? <h2>{notTheoryExam}</h2> : null}
      <form
        onSubmit={handleSubmit(handleSubmitPracticeExam)}
        className="d-flex flex-column w-100"
      >
        {/* IF APPLICANT HAVE CATEGORY "B" */}
        {userData.kpp === "B" && (
          <>
            <p className="my-2 text-danger fs-3">
              Обязательно выберите вид КПП, который вы указали при регистрации.
            </p>
            <select
              className="form-select"
              onChange={(e) => onChangeSelectKPP(e.target.value)}
            >
              <option selected disabled value="">Выберите КПП</option>
              <option value="MT">Механика</option>
              <option value="AT">Автомат</option>
            </select>
          </>
        )}
        {/* ERROR */}
        {dateError ? (
          <p className="fs-5 my-2 text-danger">
            К сожалению в текущий день нету записей
          </p>
        ) : null}

        {/* SELECT DATE */}
        <p className="my-2">{t("selectDate")}</p>
        <input
          className="form-control "
          {...register("selectDate", { required: true })}
          type="date"
          min={today || dateList[0]?.date}
          max={dateList[dateList.length - 1]?.date}
          disabled={dateList.length === 0}
          onChange={(e) => onChangeSelectDate(e.target.value)}
        />
        {/* ERROR*/}
        {errors?.selectDate && (
          <p className="error_text text-danger my-2">Выберите дату и время</p>
        )}
        {/* ERROR */}
        {time?.length === 0 ? (
          <p className="fs-5 my-2 text-danger">
            К сожалению в текущий день нету записей
          </p>
        ) : null}

        {/* SELECT TIME */}
        <p className="my-2">{t("time")}</p>
        <select
          className="form-select"
          {...register("selectTime", { required: true })}
          disabled={date === "" || time?.length === 0}
          onChange={(e) => onChangeSelectTime(e.target.value)}
        >
          <option value="">Выберите время</option>
          {time?.map((time) => (
            <option key={time.id}>{time.time}</option>
          ))}
        </select>
        <div className="d-flex align-items-center justify-content-center w-100 mt-3">
          <button className="btn btn-danger mx-2" onClick={() => reset()}>
            Отмена
          </button>
          <button
            className="btn btn-success mx-2"
            type="submit"
            disabled={examId === null}
          >
            Подтвердить
          </button>
        </div>
      </form>
      {loading && <ModalLoading isLoading={loading} />}
    </div>
  );
};

export default PracticeExamForm;
