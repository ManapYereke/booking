import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";


function TheoryExamVerification() {
    const [user, setUser] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [examId, setExamId] = useState(null);
    const [appNumber, setAppNumber] = useState(null);
    const [kpp, setKpp] = useState(null);
    const [category, setCategory] = useState(null);
    const [department, setDepartment] = useState(null);
    const [address, setAddress] = useState(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

    //GET APPLICANT INFO FROM REDUX
    const userData = useSelector((state) => state.userData.userData);
    const [departmentId, setDepartmentId] = useState(userData.department_id);
    //SELECTED KPP IF APPLICANT HAVE CATEGORY "B"
    const [kppApp, setKPP] = useState("MT");
    //SET ERROR WHEN SEND DATA AND TIME FOR RESERVATION
    const [errorText, setErrorText] = useState("");
    //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
    const [notTheoryExam, setNotTheoryExam] = useState("");

    //APPLICANT SELECTED DATE AND TIME SEND DATA
    const handleSubmitTheoryExam = () => {
        const obj = {
            user_id: userData.id,
            exam_id: examId,
        };

        postUserExamData(obj);
    };

    //POST DATA TO SERVER AFTER CHOISE APPLICANT DATE AND TIME
    const postUserExamData = (user_exam_data) => {
        const url = "/api/t1/theory/enroll/queue/";
        const token = userData.token;
        fetch(url, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
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
                    sessionStorage.setItem("appNumber", JSON.stringify(res.app_number));
                    navigate("/reservation/theory-exam/ticket");

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

    useEffect(() => {
        const examId = sessionStorage.getItem("examId");
        setExamId(JSON.parse(examId));
        const appNumber = sessionStorage.getItem("appNumber");
        setAppNumber(JSON.parse(appNumber));
        const kpp = sessionStorage.getItem("kpp");
        setKpp(JSON.parse(kpp));
        const category = sessionStorage.getItem("category");

        setCategory(JSON.parse(category));
        const department = sessionStorage.getItem("department");

        setDepartment(JSON.parse(department));
        //GET INFO APPLICANT
        const user = sessionStorage.getItem("user");
        setUser(JSON.parse(user));
        //GET DATE EXAM APPLICANT ENROLLED
        const date = sessionStorage.getItem("date");;
        setDate(JSON.parse(date));

        if (date) {
            const parsedDate = JSON.parse(date);
            if (parsedDate && parsedDate.time) {
                const [hours, minutes] = parsedDate.time.split(":");
                const timeWithoutSeconds = `${hours}:${minutes}`;
                setTime(timeWithoutSeconds);
            }
        }

    }, []);

    return (
        <>
            <div className="d-flex flex-column align-items-center mt-5">
                <div id="ticket" className="d-flex flex-column p-4 width-50 border rounded border-dark mx-auto">
                    <h3 className="text-center">
                        {t("preliminaryInfo")}
                        {/* Предварительная информация*/}
                    </h3>

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
                            {t("fullName")}:&nbsp;
                            {/* ФИО:  */}
                            <span className="fw-bold">{user?.fullname}</span>
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
                </div>
            </div >


            <p className="h5 text-center text-danger my-4">
                <strong>
                    {t("verificationNote")}
                </strong>
            </p>

            <center>
                <button type="button" className="btn btn-danger mb-4" onClick={() => window.location.href = 'https://booking.gov4c.kz/'}>
                    {t("verificationDecline")}
                    {/* Отменить */}
                </button>

                <br></br>

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        handleSubmitTheoryExam();
                    }}
                >
                    {t("verificationApprove")}
                    {/* Подтвердить */}
                </button>
            </center>
        </>
    );
}

export default TheoryExamVerification;