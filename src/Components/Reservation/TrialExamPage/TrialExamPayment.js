import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import kaspiQR0 from "../../../assets/images/kaspiQR0.png";
import kaspiQR from "../../../assets/images/kaspiQR.png";
import kaspiQR2 from "../../../assets/images/kaspiQR2.png";
import kaspiQR3 from "../../../assets/images/kaspiQR3.png";
import kaspiQR4 from "../../../assets/images/kaspiQR4.png";
import kaspiQR5 from "../../../assets/images/kaspiQR5.png";
import payMobile from "../../../assets/images/payMobile.png";


function TrialExamPayment() {
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
    const [numberOfTimeSlots, setNumberOfTimeSlots] = useState(0);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsButtonDisabled(false);
        }, 10000);

        return () => clearTimeout(timer); // This will clear the timer when the component unmounts


    }, []);

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
    const handleSubmitPayment = () => {
        const obj = {
            exam_id: examId,
            user_id: userData.id,
            // department_id: departmentId,
            // category: category,
            // kpp: kppApp,
        };

        postUserExamData(obj);
    };

    //POST DATA TO SERVER AFTER CHOISE APPLICANT DATE AND TIME
    const postUserExamData = (user_exam_data) => {
        const url = "/api/trial/enroll/queue/";
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
                    navigate("/reservation/trial-exam/ticket");

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
        const examId = sessionStorage.getItem("exam_id");
        setExamId(JSON.parse(examId));
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

        // const dateStr = sessionStorage.getItem("date");
        // if (dateStr) {
        //     const parsedDate = JSON.parse(dateStr);
        //     if (parsedDate && Array.isArray(parsedDate.time)) {
        //         setNumberOfTimeSlots(parsedDate.time.length);
        //         // Accessing the number of time slots


        //         // Rest of your logic...
        //     } else {
        //         console.error("Parsed date is invalid or does not contain a time array");
        //     }
        // } else {
        //     console.error("No date found in sessionStorage");
        // }

        let parsedDate = null;
        let timesWithoutSeconds = null;



        const time = JSON.parse(date);
        const [hours, minutes] = time.time.split(":");
        const timeWithoutSeconds = `${hours}:${minutes}`;
        setTime(timeWithoutSeconds)

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

        // console.log('Time:', time); // Add this
        // console.log(parsedDate.time.length); // And this
        // console.log(date.time.length); // And this
        // console.log(time.length); // And this
        // console.log(timesWithoutSeconds.length); // And this





    }, []);

    return (
        <>
            <div className="d-flex flex-column align-items-center mt-5">
                <div id="ticket" className="d-flex flex-column p-4 width-50 border rounded border-dark mx-auto">
                    <h3 className="text-center">
                        {t("payment")}
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





                    {
                        isMobile ?
                            <a href="https://kaspi.kz/pay/TestDrivingFee?service_id=6655&10599={}&10600=MJ-A-Z-SPSC6&amount=3700" target="_blank" rel="noopener noreferrer">
                                <img src={payMobile} alt="Kaspi QR" style={{ width: '250px', height: 'auto' }} />
                            </a>
                            :
                            <img src={kaspiQR0} alt="Kaspi QR" />
                    }



                    {/* <img src={numberOfTimeSlots === 1 ? kaspiQR :
                        numberOfTimeSlots === 2 ? kaspiQR2 :
                            numberOfTimeSlots === 3 ? kaspiQR3 :
                                numberOfTimeSlots === 4 ? kaspiQR4 :
                                    kaspiQR5} alt="Kaspi QR" /> */}

                </div >
            </div >

            {/* <p className="h5 text-center text-danger my-4">
                <strong>
                    {t("verificationNote")}
                </strong>
            </p> */}



            <center>
                <button type="button" className="btn btn-danger my-4" onClick={() => window.location.href = 'https://booking.gov4c.kz/'}>
                    {t("verificationDecline")}
                    {/* Отменить */}
                </button>

                <br></br>

                <button
                    type="button"
                    className="btn btn-success mb-5"
                    disabled={isButtonDisabled}
                    onClick={() => {
                        handleSubmitPayment();
                    }}
                >
                    {t("paid")}
                    {/* Подтвердить */}
                </button>
            </center>
        </>
    );
}

export default TrialExamPayment;