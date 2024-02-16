import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";


function TrialExamVerification() {
    const [user, setUser] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [exam_id, setExamId] = useState(null);
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

    // APPLICANT SELECTED DATE AND TIME SEND DATA
    const handleSubmitTrialExam = () => {
        const obj = {
            user_id: userData.id,
            examId: exam_id,
            department_id: departmentId,
            category: category,
            kpp: kppApp,
        };

        postUserExamData(obj);
    };

    // const handleSubmitTrialExam = () => {
    //     // Detect mobile device
    //     const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    //     if (isMobile) {
    //         // If on a mobile device, redirect to the desired URL
    //         window.location.href = 'https://kaspi.kz/pay/TestDrivingFee?service_id=6655&10599=1&10600=MJ-Z-Z-SPSC&amount=3700';
    //     } else {
    //         // Continue with the existing flow for non-mobile devices
    //         const obj = {
    //             user_id: userData.id,
    //             examId: exam_id,
    //             department_id: departmentId,
    //             category: category,
    //             kpp: kppApp,
    //         };

    //         postUserExamData(obj);
    //     }
    // };

    //POST DATA TO SERVER AFTER CHOISE APPLICANT DATE AND TIME
    const postUserExamData = (user_exam_data) => {
        navigate("/reservation/trial-exam/payment");
    };

    useEffect(() => {
        const exam_id = sessionStorage.getItem("exam_id");
        setExamId(JSON.parse(exam_id));
        const appNumber = sessionStorage.getItem("appNumber");
        setAppNumber(JSON.parse(appNumber));
        const kpp = sessionStorage.getItem("kpp");
        setKpp(JSON.parse(kpp));
        const category = sessionStorage.getItem("category");
        console.log('Category:', category); // Add this
        setCategory(JSON.parse(category));
        const department = sessionStorage.getItem("department");
        console.log('Department:', department); // And this
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

        // if (date) {
        //     const parsedDate = JSON.parse(date);
        //     if (parsedDate && parsedDate.time) {
        //         const timesWithoutSeconds = parsedDate.time.map(time => {
        //             const [hours, minutes] = time.split(":");
        //             return `${hours}:${minutes}`;
        //         });
        //         setTime(timesWithoutSeconds);
        //     }
        // }

        // if (date) {
        //     const parsedDate = JSON.parse(date);
        //     if (parsedDate && Array.isArray(parsedDate.time)) {
        //         const timesWithoutSeconds = parsedDate.time.map(time => {
        //             const [hours, minutes] = time.split(":");
        //             return `${hours}:${minutes}`;
        //         });
        //         setTime(timesWithoutSeconds);
        //     }
        // }



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
                        {/* <span className="fw-bold mx-2">{time ? time.join(', ') : ''}</span> */}
                    </div>

                    <p className="h6 text-info text-center ">
                        {t("dtp")}
                    </p>

                </div >
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
                        handleSubmitTrialExam();
                    }}
                >
                    {t("verificationApprove")}
                    {/* Подтвердить */}
                </button>
            </center>
        </>
    );
}

export default TrialExamVerification;