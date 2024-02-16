import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setData } from "../../../store/slices/ReservationTheoryData";

import UserDataView2 from "../UserDataView/UserDataView2";
import ModalLoading from "../ModalLoading/ModalLoading";
import { setDataUser } from "../../../store/slices/userDataSlice";
import { useTranslation } from "react-i18next";


const TheoryExamForm = () => {
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
  const [kppApp, setKPP] = useState("MT");
  //SET ERROR WHEN SEND DATA AND TIME FOR RESERVATION
  const [errorText, setErrorText] = useState("");
  //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
  const [notTheoryExam, setNotTheoryExam] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //GET APPLICANT INFO FROM REDUX
  const userData = useSelector((state) => state.userData.userData);
  //NEW MENUS
  const [cities, setCities] = useState([]);
  const [departments, setDepartments] = useState([]);
  // const categories = ['A1', 'B1', 'A', 'B', 'C1', 'C', 'D1', 'D', 'BE', 'C1E', 'CE', 'D1E', 'DE'];
  const [departmentId, setDepartmentId] = useState(userData.department_id);
  const [category, setCategory] = useState(userData.category);
  const [city, setCity] = useState(userData.city);
  const [dateBlock, setDateBlock] = useState(false);
  const [address, setAddress] = useState(userData.address);

  const getExcludedSundays = () => {
    const todayDate = new Date();
    const excludedDates = [];

    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(todayDate);
      currentDate.setDate(currentDate.getDate() + i);

      if (currentDate.getDay() === 0) { // Sunday
        excludedDates.push(currentDate.toISOString().split('T')[0]);
      }
    }

    return excludedDates;
  };

  const uniqueDatesWithTime = dateList.filter(
    (item, index, self) =>
      self.findIndex((date) => date.date === item.date) === index
  );

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

  //SELECT CITY
  const onChangeCity = (value) => {
    setCity(value);
    const filteredDepartments = departments.filter((department) => department.city == value);
    if (filteredDepartments.length > 0) {
      setDepartmentId(filteredDepartments[0].id);
    }
  }
  //SELECT DEPARTMENT
  const onChangeSelectDepartment = (value) => {
    setDepartmentId(value);
  }
  //SELECT CATEGORY
  const onChangeSelectCategory = (value) => {
    setCategory(value);
  }

  //SHOW SELECTORS OF DATE AND TIME
  const dateButtonClick = () => {

    setDateBlock(true);
    getFreeExamTheory();

    document.getElementById('city-select').disabled = true;
    document.getElementById('department-select').disabled = true;
    document.getElementById('chooseDateBtn').style.display = 'none';
  }

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

  //APPLICANT SELECTED DATE AND TIME SEND DATA
  const handleSubmitTheoryExam = () => {
    const obj = {
      user_id: userData.id,
      exam_id: examId,
      department_id: departmentId,
    };

    postUserExamData(obj);
    setLoading(true);
    sessionStorage.setItem("examId", JSON.stringify(examId));
    const department = departments.find((department) => department.id == departmentId);
    sessionStorage.setItem("department", JSON.stringify(department.name));
    sessionStorage.setItem("address", JSON.stringify(department.address));

    //LOADING ANIMATE
    setTimeout(() => {
      setLoading(false);
    }, 500);
    reset();
  };

  //fetches
  // ===========NEW DROPDOWN MENU FUNCTIONS========================
  //GET CITIES
  const fetchCities = async () => {
    const url = "/api/cities/";
    const token = userData.token;
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCities(data);
  };

  // //GET DEPARTMENTS
  const fetchDepartments = async () => {
    const url = "/api/t1/theory/departments/";
    const token = userData.token;
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setDepartments(data);
  };

  const getFreeExamTheory = async () => {
    const iin = sessionStorage.getItem("iin").replace(/[^0-9]/g, "");
    const department_id = departmentId;
    const token = userData.token;
    const url = `/api/t1/theory/exams/`;

    try {
      const response = await fetch(url + iin + "/" + department_id + "/", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setDateError(true);
          setDateList(data);
        } else {
          setDateError(false);
          setDateList(data);
        }
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      // Handle error
      console.error("An error occurred:", error);
      // You can set a state to display an error message to the user
      // setStateForError("An error occurred while fetching data.");
    }
  };

  const postUserExamData = (user_exam_data) => {
    navigate("/reservation/theory-exam/verification");
  };

  useEffect(() => {
    const todayDate = new Date().toISOString().slice(0, 10);
    setToday(todayDate);
    fetchCities();
    fetchDepartments();
  }, []);
  //END OF NEW MENU FUNCTIONS

  //HTML

  return (
    <div className="form_input_date_item">
      {/* SHOW APPLICANT INFO */}
      <div className="d-flex align-items-start justify-content-center form-control my-4 ">
        <UserDataView2 />
      </div>
      <h2>{errorText}</h2>
      {/* APPLICANT NOT PASS THEORY EXAM */}
      {notTheoryExam.length !== 0 ? <h2>{notTheoryExam}</h2> : null}

      <form className="fs-5"
        onSubmit={handleSubmit(handleSubmitTheoryExam)}
      >
        {/* ================SELECT CITY================ */}
        <div class="form-group mb-3">
          <label for="city-select">
            {/*Выберите город*/}
            {t("selectCity")}
          </label>
          <select class="form-select" id="city-select" onChange={(e) => onChangeCity(e.target.value)}>
            {cities.map((city) => (
              <option key={city.id} value={city.id} selected={city.name == userData.city}>{city.name}</option>
            ))}
          </select>
        </div>

        {/* ================SELECT DEPARTMENT================ */}
        <div class="form-group mb-3">
          <label for="department-select">
            {/*Выберите департамент*/}
            {t("selectDepartment")}

          </label>
          <select class="form-select" id="department-select" onChange={(e) => onChangeSelectDepartment(e.target.value)}>
            <option selected disabled value="">
              {t("selectDepartment")}
            </option>
            {departments
              .filter((department) => department.city == document.getElementById('city-select').value)
              .map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                /*selected={department.id == userData.department_id}*/
                >
                  {department.name}
                </option>
              ))}

          </select>
        </div>

        {/* ================SELECT CATEGORY================ */}

        {/*Кнопка Выбрать дату*/}
        <center>
          <button
            className="btn btn-success my-2"
            id="chooseDateBtn"
            type="button"
            onClick={dateButtonClick}
          >
            {/*Выбрать дату и время*/}
            {t("selectDateButton")}
          </button>
        </center>
        {/* ===========ВЫБЕРИТЕ ДАТУ============== */}
        {dateBlock && (
          <div className="date">
            <div class="form-group mb-3">
              {/* SELECT DATE */}
              <label for="date-picker">{t("selectDateTitle")}</label>
              <select
                id="date-picker"
                className="form-control form-group-lg form-select"
                {...register("selectDate", { required: true })}
                onChange={(e) => onChangeSelectDate(e.target.value)}
              >
                <option selected disabled value="">
                  {t("selectDate")}
                </option>

                {uniqueDatesWithTime.map((item) => (
                  <option
                    key={item.id}
                    value={item.date}
                  >
                    {item.date}
                  </option>
                ))}
              </select>


              {dateError ? (
                <small class="text-danger">
                  {/* К сожалению на текущий день записи нет. */}
                  {t("notFoundRecord")}
                </small>
                // <p className="fs-5 my-2 text-danger">К сожалению в текущий день нету записей</p>
              ) : null}
            </div>

            {/* ================ВЫБЕРИТЕ ВРЕМЯ============== */}

            <div class="form-group mb-5">
              {/* SELECT TIME */}
              <label for="time-select">{t("time")}</label>
              <select
                id="time-select"
                className="form-select"
                {...register("selectTime", { required: true })}
                disabled={date === "" || time?.length === 0}
                onChange={(e) => onChangeSelectTime(e.target.value)}
              >
                <option value="">
                  {/* Выберите время */}
                  {t("selectTime")}
                </option>
                {time?.map((time) => (
                  <option key={time.id}>{time.time}</option>
                ))}
              </select>
            </div>
            <div class="form-group text-center">
              <button className="btn btn-danger mx-5" onClick={() => navigate(-2)}>
                {/* Отмена */}{t("cancel")}</button>

              <button
                className="btn btn-success mx-5"
                type="submit"
                disabled={examId === null}

              >{/* Подтвердить */} {t("approve")}</button>
            </div>

            <p className="text-center mt-5">
              {t("smsNote")}
            </p>

          </div>)
        }
      </form >
      {loading && <ModalLoading isLoading={loading} />}
    </div >
  );
};

export default TheoryExamForm;
