import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

//COMPONENTS
import ModalLoading from "../ModalLoading/ModalLoading";
import TrialExamForm from "./TrialExamForm";
import ModalPracticeError from "../../Modal/ModalPracticeError";
import ModalCongratPractice from "../../Modal/ModalCongratPractice";
import ReactCountdownClock from "react-countdown-clock";
import ErrorVerifyPage from "../../ErrorPage/ErrorVerifyPage";
import ModalTheoryExam from "../../Modal/ModalTheoryExam";
import OTPInput, { ResendOTP } from "otp-input-react";

import ModalActiveTicket from "../../Modal/ModalActiveTicket";

import { getCurrentLanguage } from "../../../config/i18n";

import trialAgreement from "/home/erbulan/booking/src/assets/images/trialAgreement.pdf";
import trialAgreement_kz from "/home/erbulan/booking/src/assets/images/trialAgreement_kz.pdf";

//REDUX
import { setDataUser } from "../../../store/slices/userDataSlice";

//ICON
import { IoIosArrowBack } from "react-icons/io";

//API REQUEST FUNCTION
import {
  verifyUserByIIN,
  verifySMSCode,
} from "../../../helpers/ApiRequestList";

const TrialExamPage = () => {
  //USE TRANSLATE LANG
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [examData, setExamData] = useState(null);


  //SHOW FORM SELECT DATE AND TIME FOR EXAM AFTER VERIFY APPLICANT
  const [isVerify, setIsVerify] = useState(false);
  //SHOW LOADING ANIMATION MODAL
  const [isloading, setIsLoading] = useState(false);
  //IF APPLICANT NOT FOUND SHOW ERROR
  const [isUser, setIsUser] = useState(false);

  //SHOW MODALS
  const [congartModal, setCongartModal] = useState(false);
  const [isTheoryResModal, setIsTheoryResModal] = useState(false);

  //TOOGLE SHOW INPUT VERIFY CODE
  const [messageBlock, setMessageBlock] = useState(false);
  //SECONDS FOR TIMER
  const [seconds, setSeconds] = useState(180);
  //FOR DISABLED BUTTON IF TIMER OUT OF TIME
  const [disBtn, setDisBtn] = useState(false);


  //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
  const [notPassExam, setNotPassExam] = useState(false);


  //SHOW ERROR IF APPLICANT INPUT WRONG VERIFY CODE
  const [isWrongCode, setIsWrongCode] = useState(false);
  const [isWrongIIN, setIsWrongIIN] = useState(false);
  const [OTP, setOTP] = useState("");

  //show error if user has already active ticket
  const [hasActiveTicket, setHasActiveTicket] = useState(false);

  //Expired ticket or 503 error
  const [expiredAppNumber, setExpiredAppNumber] = useState(false);
  const [responseError, setResponseError] = useState(false);

  //bmgNote hide
  const [isTextVisible, setIsTextVisible] = useState(true);

  const token = useSelector(state => state.token.token)

  const [showInfo, setShowInfo] = useState(false);

  const currentLanguage = getCurrentLanguage();

  const [isAgreed, setIsAgreed] = React.useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    IIN: "",
    APP_NUMBER: "",
    mode: "onChange",
    message: "",
  });

  const dispatch = useDispatch();
  const { btoa } = window;
  //SEND IIN TO DATABASE TO VERIFY USER
  const verifyUser = async (iin, app_number, token) => {
    // try {
    //   const response = await verifyUserByIIN(iin,token);

    //   //APPLICANT FIND IN DATABASE
    //   if (response.success) {
    //     sessionStorage.setItem("iin", JSON.stringify(iin));
    //     //SHOW INPUT OTP TO VERIFY CODE
    //     setMessageBlock(true);
    //   }
    //   //APLICANT NOT FOUND
    //   else {
    //     setMessageBlock(false)
    //     //APPLICANT NOT FOUND ERROR
    //     isUser(true);
    //   }
    // } catch (e) {
    //   // navigate("/error-verify-page");
    // }

    // var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET', /*headers: myHeaders, */redirect: 'follow'
    };
    fetch("/api/verify/" + iin + "/", requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .then(result => {
        if (result.success) {
          sessionStorage.setItem("iin", JSON.stringify(iin));
          // sessionStorage.setItem("app_number", JSON.stringify(app_number));

          //SHOW INPUT OTP TO VERIFY CODE
          setMessageBlock(true);
        }
        else if (result.error) {
          setIsWrongIIN(true);
        }
        //APLICANT NOT FOUND
        else {
          setMessageBlock(false)
          //APPLICANT NOT FOUND ERROR
          isUser(true);
        }
      })
      .catch(error => console.log('error', error));
  };



  //SEND SMS CODE FROM USER
  const sendVerifyCodeApplicant = async (verify_code, token) => {
    const url = "/api/trial/verify/"

    const storageData = sessionStorage.getItem("iin");
    // const storageData2 = sessionStorage.getItem("app_number");

    const obj = {
      "iin": JSON.parse(storageData),
      // "app_number": JSON.parse(storageData2),
      "code": verify_code,
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      iin: JSON.parse(storageData),
      // app_number: JSON.parse(storageData2),
      code: verify_code
    });


    fetch(url, {
      headers: myHeaders,
      method: "POST",
      body: raw
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        setResponseError(true);
        throw new Error(`INITIAL Request failed with status code ${response.status}`);
      }
    })
      .then((data) => {
        if (data.error) {
          //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
          // setIsVerify(true)
          if (data.error == "Заявитель не сдал теоретический экзамен") {
            setMessageBlock(false)
            setNotPassExam(true);
            setOTP("");
            //console.log(data.error);	
            // console.log(data)	
          }
        }
        //APLICANT INPUT WRONG VERIFY CODE
        else if (data.error === false) {
          //SHOW ERROR APPLICANT INPUT WRONG VERIFY CODE

          setMessageBlock(true)
          setIsWrongCode(true);
          setOTP("")
          // console.log(2)
        }
        //OK
        else {
          //console.log(data);
          setNotPassExam(false);
          setIsVerify(true);
          dispatch(setDataUser(data));
          setMessageBlock(false)
          setOTP("")
          // console.log(3)
        }

        // } 
      })
    /*.catch(function (res) {
      console.log(res,'\texcept');
      return res
    });*/
  };

  // IF THE TIMER IS OUT OF TIME TOOGLE DISABLED BUTTON "Забронировать"
  const timeDone = () => {
    setDisBtn(true);
  };

  // SEND SMS CODE AGAIN
  const SendMessageAgain = () => {
    setDisBtn(false);
    //RESTART TIMER
    setSeconds((seconds) => (seconds += 10));
    const storageData = sessionStorage.getItem("iin");
    // const storageData2 = sessionStorage.getItem("app_number");
    verifyUser(JSON.parse(storageData));
  };

  //SUBMIT - SEND IIN AND GET VERIFY CODE
  const getMessage = (data) => {
    verifyUser(data.IIN, data.APP_NUMBER, token.access);
  };

  //SEND SMS CODE FROM APPLICANT TO CHECK
  const verifyOTP = () => {

    sendVerifyCodeApplicant(OTP, token.access);
    if (isVerify)
      submit();
  }
  const submit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    setMessageBlock(false);
    //sendVerifyCodeApplicant(OTP, token.access);
    reset();
  };

  useEffect(() => {
    //console.log(token.access)
  }, [isVerify, seconds, notPassExam, OTP, token]);

  return (
    <div className="offset_theory_exam_page flex-column">

      <div className="d-flex w-100 mt-4">
        <button className="btn_back" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
          {t("goBack")}
        </button>
      </div>

      <div className="d-flex w-100 text-center flex-column mt-4">
        <h2>{t("titlePageTrialExam")}</h2>
      </div>

      <div className="d-flex w-100 text-start align-items-center justify-content-center">
        {!isVerify ? (
          <form
            className={messageBlock ? "hide" : "form_input"}
            onSubmit={handleSubmit(getMessage)}
          >



            {/* <p className="text-center mt-5">
              {currentLanguage === 'ru' ? (
                <>
                  {t("trialAgreement").split("договором оферты")[0]}
                  <a href={trialAgreement} target="_blank">договором оферты</a>
                  {t("trialAgreement").split("договором оферты")[1]}
                </>
              ) : currentLanguage === 'kz' ? (
                <>
                  {t("trialAgreement").split("қолдану шарттарымен")[0]}
                  <a href={trialAgreement} target="_blank">қолдану шарттарымен</a>
                  {t("trialAgreement").split("қолдану шарттарымен")[1]}
                </>
              ) : (
                t("trialAgreement")
              )}
            </p> */}

            <p className="mt-5">{t("head_text_input")}</p>

            <p style={{ display: 'flex', alignItems: 'left', width: '100%' }}>
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
                style={{ marginRight: '10px' }} // Adjust as needed

              />
              {currentLanguage === 'ru' ? (
                <>
                  {t("trialAgreement").split("договором оферты")[0]}
                  &nbsp;
                  <a href={trialAgreement} target="_blank">договором оферты</a>

                  {t("trialAgreement").split("договором оферты")[1]}
                </>
              ) : currentLanguage === 'kz' ? (
                <>
                  {t("trialAgreement").split("қолдану шарттарымен")[0]}
                  &nbsp;
                  <a href={trialAgreement_kz} target="_blank">қолдану шарттарымен</a>
                  &nbsp;
                  {t("trialAgreement").split("қолдану шарттарымен")[1]}
                </>
              ) : (
                t("trialAgreement")
              )}
            </p>

            {/* INPUT TICKET */}
            <input
              className="form-control input_w my-2"
              placeholder={t("iin")}
              maxLength="12"
              minLength="12"
              name="IIN"
              disabled={!isAgreed} // Disable the input if the user has not agreed
              {...register("IIN", {
                required: "Введите ИИН",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "ИИН состоит только из цифр",
                },
              })}
            />

            {/* <div className="input-container">
              <input
                className="form-control input_w my-2"
                placeholder={t("applicationNumber")}
                maxLength="12"
                minLength="12"
                name="APP_NUMBER"
                {...register("APP_NUMBER", {
                  required: "Введите ваш номер заявки",
                  pattern: {
                    value: /^(009|004)[0-9]{9}$/,
                    message: "Номер заявки должен состоять из 12 цифр и начинаться с 009 или 004",
                  },
                })}
              />
              <span onClick={toggleInfo} className="info-icon">
                ℹ️
              </span>
            </div>
            {showInfo && (
              <div className="info-message">
                {t("addInfo")}
              </div>
            )} */}

            {/* ERRORS FOR INPUT */}
            {errors.IIN && <p className="text-danger">{errors.IIN.message}</p>}
            {errors.APP_NUMBER && <p className="text-danger">{errors.APP_NUMBER.message}</p>}

            {/* ERROR NOT FOUND TICKTET */}
            {isUser && (
              <p className="text-danger my-2">{t("notIINFound")}</p>
            )}
            {isWrongIIN && <p className="text-danger fs-3">{t("wrongIIN")}</p>}

            {/* ERROR IF USER BOOKIG FOR PRACTICE EXAM */}

            {/* SUBMIT BUTTON */}
            <button
              className="btn btn-success btn_width my-3"
              type="submit"
              disabled={!isDirty || !isValid}
              onClick={() => setIsTextVisible(false)}
            >
              {/* Авторизоваться */}
              {t("btn_title_reservation")}
            </button>
          </form>
        ) : (
          // SHOW FORM TO SELECT DATE AND TIME TO RESERVATION PRACTICE EXAM
          <div className="d-flex w-100 text-start align-items-center justify-content-center">
            <TrialExamForm />
          </div>
        )}


      </div>

      {/* {isTextVisible && (
        <p className="text-center mt-3 text-muted">
          {t("bmgNote")}
        </p>
      )} */}

      {/* SHOW INPUT TO VERIFY CODE */}
      {messageBlock && (
        <div
          className="d-flex flex-wrap flex-column align-items-center justify-content-center w-100 mt-3"
        // onSubmit={handleSubmit(submit)}
        >
          <p className="px-3 text-center">
            {/* Введите отправленный на ваш телефон номер код. */}
            {t("enterOTP")}
          </p>

          <OTPInput
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={6}
            otpType="number"
            maxTime={seconds}
            disabled={seconds === 0}
            inputStyles={{
              border: "1px solid green",
              width: "44px",
              height: "44px",
              fontSize: "18px",
              borderRadius: "8px",
            }}
            focusStyle={{
              border: "1px solid green",
            }}
          />

          {/* ERROR APPLICANT NOT PASS THEORY EXAM */}
          {/* {notPassExam && <h2 className="text-danger text-center">Заявитель не сдал теоритический экзамен</h2>} */}

          <h2 className="text-danger text-center">{notPassExam}</h2>

          {/* ERROR APPLICANT  */}
          {isWrongCode && <p className="text-danger fs-3">{t("wrongOTP")}</p>}

          {/* ERROR EXPIRED APP NUMBER */}
          {expiredAppNumber && <p className="text-danger fs-3">{t("expiredAppNumber")}</p>}
          {/* Error like 500 */}
          {responseError && <p className="text-danger fs-3">Извините, произошла внутренняя ошибка сервера. Наши специалисты уже уведомлены о проблеме и работают над её устранением. Пожалуйста, попробуйте повторить запрос позже.</p>}

          <div className="d-flex flex-column w-50 align-items-center justify-content-center w-100 mt-3">
            <button
              className="btn btn-success mb-5"
              type="button"
              onClick={verifyOTP}
              disabled={disBtn || OTP.length < 6}
            >

              {/* Забронировать */}
              {t("bron")}
            </button>
            <button
              className="btn mb-3 btn-light"
              onClick={() => SendMessageAgain()}
              disabled={!disBtn}
            >
              {t("againOTP")}
            </button>
            {/* COUNT DOWN TIMER */}
            <ReactCountdownClock
              seconds={seconds}
              color="#6c757d"
              alpha={2}
              size={48}
              onComplete={timeDone}
            />
          </div>
        </div>
      )}

      {/* MODAL LOADING ANIMATE  */}
      {isloading && <ModalLoading isLoading={isloading} />}

      {/* SHOW MODAL ERROR */}
      <ModalPracticeError
        isTheoryResModal={isTheoryResModal}
        setShow={setIsTheoryResModal}
      />

      {/* SHOW CONGRATULATION MODAL */}
      <ModalCongratPractice
        congartModal={congartModal}
        setShow={setCongartModal}
      />

      <ModalTheoryExam notPassExam={notPassExam} setNotPassExam={setNotPassExam} />

      {/* SHOW ACTIVE TICKET MODAL */}
      <ModalActiveTicket
        hasActiveTicket={hasActiveTicket}
        setHasActiveTicket={setHasActiveTicket}
        examData={examData} // Pass the examData prop here
      />

    </div>
  );
};

export default TrialExamPage;