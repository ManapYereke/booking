import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setData } from "../../../store/slices/ReservationTheoryData";

import UserDataView3 from "../UserDataView/UserDataView3";
import ModalLoading from "../ModalLoading/ModalLoading";
import { setDataUser } from "../../../store/slices/userDataSlice";
import { useTranslation } from "react-i18next";


const TrialExamForm = () => {
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
  // const [exam_id, setExamId] = useState(null);
  const [exam_id, setExamId] = useState([]);

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
  const categories = ['B'];
  const [departmentId, setDepartmentId] = useState(userData.department_id);
  const [category, setCategory] = useState(userData.category);
  const [city, setCity] = useState(userData.city);
  const [dateBlock, setDateBlock] = useState(false);
  const [address, setAddress] = useState(userData.address);
  const [hasDriverLicense, setHasDriverLicense] = useState(false);


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

  // const uniqueDatesWithTime = dateList.filter(
  //   (item, index, self) =>
  //     self.findIndex((date) => date.date === item.date) === index
  // );

  const uniqueDatesWithTime = Array.isArray(dateList) ? dateList.filter(
    (item, index, self) =>
      self.findIndex((date) => date.date === item.date) === index
  ) : [];

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

  //SELECT KPP
  const onChangeSelectKPP = (value) => {
    setKPP(value);
    // Вызов функции getFreeExamPractice при выборе опции селектора "AT" или "MT"
    // if (value === "AT" || value === "MT") {
    //   getFreeExamPractice(value);
    // }
  };
  //SHOW SELECTORS OF DATE AND TIME
  const dateButtonClick = () => {
    if (hasDriverLicense) {
      setDateBlock(false);
      document.getElementById('category-select').disabled = true;
      document.getElementById('city-select').disabled = true;
      document.getElementById('department-select').disabled = true;
      document.getElementById('chooseDateBtn').style.display = 'none';
      if (document.getElementById('kpp-select')) {
        document.getElementById('kpp-select').disabled = true;
      }
    } else {
      setDateBlock(true);
      getFreeExamTrial(kppApp);
      document.getElementById('category-select').disabled = true;
      document.getElementById('city-select').disabled = true;
      document.getElementById('department-select').disabled = true;
      document.getElementById('chooseDateBtn').style.display = 'none';
      if (document.getElementById('kpp-select')) {
        document.getElementById('kpp-select').disabled = true;
      }
    }
  }

  //SELECT DATE
  const onChangeSelectDate = (value) => {
    setDate(value);

    const sortedTime = dateList.filter((item) => item.date.includes(value));

    dispatch(setData(sortedTime));
    setTime(sortedTime);
  };


  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleTimeChange = (event) => {
    if (event.target.checked) {
      const newTime = event.target.value;
      const timeObj = {
        date: date,
        time: newTime
      };
      sessionStorage.setItem("date", JSON.stringify(timeObj));

      const obj = time.find((item) => item.time.includes(newTime));

      if (obj && obj.id) {
        // Replace the exam_id array with a new array containing only the new id
        setExamId([obj.id.toString()]);
      }

      // Replace the selectedTimes array with a new array containing only the new time
      setSelectedTimes([newTime]);
    }
  };

  // const handleTimeChange = (event) => {
  //   if (event.target.checked) {
  //     if (selectedTimes.length < 1) {
  //       setSelectedTimes(prevTimes => {
  //         const newTimes = [...prevTimes, event.target.value];
  //         newTimes.sort();
  //         const timeObj = {
  //           date: date,
  //           time: newTimes
  //         };
  //         sessionStorage.setItem("date", JSON.stringify(timeObj));

  //         const obj = time.find((item) => item.time.includes(event.target.value));

  //         if (obj && obj.id) {
  // Convert obj.id to string and add to the exam_id array
  //       setExamId(prevIds => [...prevIds, obj.id.toString()]);
  //     }

  //     return newTimes;
  //   });
  // }
  //   } else {
  //     setSelectedTimes(prevTimes => {
  //       const newTimes = prevTimes.filter(time => time !== event.target.value);
  //       const timeObj = {
  //         date: date,
  //         time: newTimes
  //       };
  //       sessionStorage.setItem("date", JSON.stringify(timeObj));

  //       const obj = time.find((item) => item.time.includes(event.target.value));
  //       if (obj && obj.id) {
  //         // Remove the obj.id from the exam_id array
  //         setExamId(prevIds => prevIds.filter(id => id !== obj.id.toString()));
  //       }

  //       return newTimes;
  //     });
  //   }
  // };

  const onChangeSelectTime = (value) => {
    const obj = time.find((item) => item.time.includes(value));

    if (obj) {
      const timeObj = {
        date: obj.date,
        time: obj.time,
      };

      console.log("Current time state:", time);


      sessionStorage.setItem("date", JSON.stringify(timeObj));
      setExamId(obj.id);
      console.log("Setting exam_id to:", obj.id);
    }
  };

  //APPLICANT SELECTED DATE AND TIME SEND DATA
  const handleSubmitTrialExam = () => {
    console.log("Submitting with exam_id:", exam_id);

    const obj = {
      user_id: userData.id,
      exam_id: exam_id, //array was examId
      department_id: departmentId,
      category: category,
      kpp: kppApp,
    };

    console.log("obj", obj);

    postUserExamData(obj);
    setLoading(true);
    sessionStorage.setItem("exam_id", JSON.stringify(exam_id));
    console.log("exam_id", exam_id);
    sessionStorage.setItem("kpp", JSON.stringify(kppApp));
    sessionStorage.setItem("category", JSON.stringify(category));
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
    const url = "/api/trial/cities/";
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
    const url = "/api/trial/departments/";
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

  //GET FREE PRACTICE EXAM
  const getFreeExamTrial = async (kpp) => {
    // "/api/practice/free/exams/";
    const url = "/api/trial/free/exams/";
    const iin = sessionStorage.getItem("iin").replace(/[^0-9]/g, "");
    const token = userData.token;
    fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "iin": iin,
        "department_id": departmentId,
        "category": category,
        "kpp": kpp,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .then((data) => {
        if (data.error == "Ошибка: Данная услуга предназначена только для лиц без водительских удостоверений") {
          console.log("Ошибка: Данная услуга предназначена только для лиц без водительских удостоверений");
          setHasDriverLicense(true);
        } else {
          if (data.length === 0) {
            setDateError(true);
            setDateList(data);
          } else {
            setDateError(false);
            setDateList(data);
          }
        }
      }

      )
      .catch(function (res) { });
  };

  //POST DATA TO SERVER AFTER CHOISE APPLICANT DATE AND TIME
  // const postUserExamData = (user_exam_data) => {
  //   const url = "/api/practice/enroll/queue/";
  //   const token = userData.token;
  //   fetch(url, {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify(user_exam_data),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         setErrorText(response.status);
  //         throw new Error(`Request failed with status code ${response.status}`);
  //       }
  //     })
  //     .then((res) => {
  //       //IF APPLICANT ENROLLED TO PRACTICE EXAM
  //       if (res.enrolled) {
  //         sessionStorage.setItem("appNumber", JSON.stringify(res.app_number));
  //         // navigate("/reservation/practice-exam/ticket");
  //         navigate("/reservation/practice-exam/verification");
  //       }
  //       //APPLICANT NOT ENRLLED GET ERROR FROM SERVER
  //       else if (res.error) {
  //         setNotTheoryExam(res.error);
  //       }
  //     })
  //     .catch(function (res) {
  //       setErrorText(res);
  //     });
  // };

  const postUserExamData = (user_exam_data) => {
    navigate("/reservation/trial-exam/verification");
  };

  useEffect(() => {
    const todayDate = new Date().toISOString().slice(0, 10);
    setToday(todayDate);
    //getFreeExamPractice(userData.department_code, token.access);
    if (userData.category !== 'B') {
      onChangeSelectKPP("MT");
    }
    // Fetching data for dropdowns // NEW MENU FUNCTIONS
    fetchCities();
    fetchDepartments();
  }, []);
  //END OF NEW MENU FUNCTIONS

  //HTML

  return (
    <div className="form_input_date_item">
      {/* SHOW APPLICANT INFO */}
      <div className="d-flex align-items-start justify-content-center form-control my-4 ">
        <UserDataView3 />
      </div>
      <h2>{errorText}</h2>
      {/* APPLICANT NOT PASS THEORY EXAM */}
      {notTheoryExam.length !== 0 ? <h2>{notTheoryExam}</h2> : null}

      <form className="fs-5"
        onSubmit={handleSubmit(handleSubmitTrialExam)}
      >
        {/* ================SELECT CITY================ */}
        <div class="form-group mb-3">
          <label for="city-select">
            {/*Выберите город*/}
            {t("selectCity")}
          </label>
          <select class="form-select" id="city-select" onChange={(e) => onChangeCity(e.target.value)}>
            <option selected disabled value="">
              {t("selectCity")}
            </option>
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
            {/* {departments
              .filter((department) => department.city == document.getElementById('city-select').value)
              .map((department) => (
                <option
                  key={department.id}
                  value={department.id} */}
            {/* selected={department.id == userData.department_id} */}
            {/* > */}
            {/* {department.name}
                 </option> */}
            {/* ))}  */}

            {Array.isArray(departments) && departments
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
            {/*departments.map((department) => (
              <option key={department.id} value={department.id} selected={department.id == userData.department_id}>{department.name}</option>
            ))*/}
          </select>
        </div>

        {/* ================SELECT CATEGORY================ */}

        <div class="form-group mb-3">
          <label for="category-select" className="fs-5">
            {/* Выберите категорию */}
            {t("selectCategory")}
          </label>
          <select class="form-select" id="category-select" {...register("selectCategory", { required: true })} onChange={(e) => onChangeSelectCategory(e.target.value)}>
            <option selected disabled value="">
              {t("selectCategory")}
            </option>
            {categories.map((category) => (
              <option value={category} selected={category == userData.category}>{category}</option>
            ))}
          </select>
          {/* <small class="text-danger fs-5">
             Предупреждение категория
          {t("warningCategory")} 
          </small> */}
        </div>

        {/* <div class="form-group mb-3">
          <label for="category-select" className="fs-5">
            {t("selectCategory")}
          </label>
          <select
            class="form-select"
            id="category-select"
            {...register("selectCategory", { required: true })}
            onChange={(e) => onChangeSelectCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                selected={category === userData.category}
                disabled={category !== 'B'}
                hidden={category !== 'B'}
              >
                {category}
              </option>
            ))}
          </select>
        </div> */}

        {category === "B" && (<div class="form-group mb-3">
          <label for="kpp-select" className="fs-5">
            {/* ВидКПП */}
            {t("typeKPP")}
          </label>
          <select class="form-select" id="kpp-select" onChange={(e) => onChangeSelectKPP(e.target.value)}>
            {<option selected disabled value="MT">
              {/* Выберите КПП */}
              {t("selectKPP")}</option>}
            <option value="MT">Механика </option>
            <option value="AT">Автомат</option>
          </select>

          <small class="text-danger fs-5">
            {/*Пожалуйста, выберите указанный при регистрации вид КПП.*/}
            {t("warningKPP")}
          </small>
        </div>)
        }

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

                {setHasDriverLicense && (
                  uniqueDatesWithTime.map((item) => (
                    <option
                      key={item.id}
                      value={item.date}
                    >
                      {item.date}
                    </option>
                  ))
                )}


              </select>

              {/* ERROR*/}
              {/* {errors?.selectDate && ( */}
              {/* // <small class="text-danger"> */}
              {/* Выберите дату*/}
              {/* {t("selectDate")} */}
              {/* </small> */}
              {/* // <p className="error_text text-danger my-2">Выберите дату и время</p> */}
              {/* // )} */}
              {/* ERROR */}


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
              {/* <label for="time-select">{t("time")}</label>
              <select
                id="time-select"
                className="form-select"
                {...register("selectTime", { required: true })}
                disabled={date === "" || time?.length === 0}
                onChange={(e) => onChangeSelectTime(e.target.value)}
              >
                <option value=""> */}
              {/* * Выберите время */}
              {/* {t("selectTime")}
                </option>
                {time?.map((time) => (
                  <option key={time.id}>{time.time}</option>
                ))}
              </select> */}

              <div className="form-group mb-3">
                <label htmlFor="time-select">{t("selectTime")}</label>
                <div id="time-select" className="form-control form-group-lg">
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {time?.map((time, index) => (
                      <div key={index}>
                        <input
                          // type="checkbox"
                          type="radio"
                          id={`time-${index}`}
                          name="time"
                          value={time.time}
                          onChange={handleTimeChange}
                        />
                        <label htmlFor={`time-${index}`}>{time.time}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>




            </div>

            {hasDriverLicense && <p className="text-danger fs-3">{t("hasDriverLicense")}</p>}

            <div class="form-group text-center">

              <p className="text-center mt-5">
                {t("winterSMS")}
              </p>

              <button className="btn btn-danger mx-5" onClick={() => navigate(-2)}>{/* Отмена */}{t("cancel")}</button>


              <button
                className="btn btn-success mx-5"

                type="submit"
                disabled={selectedTimes.length === 0}
              // disabled={exam_id === null}


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

export default TrialExamForm;
