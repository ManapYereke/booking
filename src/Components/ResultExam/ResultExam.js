import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import ModalLoading from "../Reservation/ModalLoading/ModalLoading";
import { getUserByAppNumber } from "../../helpers/ApiRequestList";

import "./ResultExam.css";
import ModalNotFoundDT from "../Modal/ModalNotFoundDT";

const ResultExam = () => {
  const [isloading, setIsLoading] = useState(false);
  const [isDTFound,setisDTFound] = useState(false)
 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //use hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    numberDT: "",
  });

  const searchDigitalTicket = async (data) => {
    const response = await getUserByAppNumber(data.numberDT);
    
    const userDataStorage = sessionStorage.getItem("user")

    if(response.fields !== userDataStorage){
      sessionStorage.setItem('user',JSON.stringify(response))
    }
    
    if (response.find === false) {
      setisDTFound(true)
    } else {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/search-result-exam");
        setIsLoading(false);
      }, 3000);
    }

    reset();
  };

  useEffect(() => {}, []);

  return (
    <div className="offset_result_exam">
      <h4 className="text-center">Введите номер ЦТ</h4>
      <div className="d-flex align-items-center justify-content-center w-100 min-h-100 mt-5">
        <form
          onSubmit={handleSubmit(searchDigitalTicket)}
          className="d-flex flex-column w-100 align-items-center justify-content-center mt-2"
        >
          <input
            className="form-control w-50 input_res_exam"
            placeholder="Введите номер ЦТ"
            maxLength="12"
            minLength="12"
            type="text"
            name="numberDT"
            {...register("numberDT", {
              required: "Введите номер цифрового талона",
              minLength: {
                value: 12,
                message: "Введите валидный номер цифрового талона",
              },
              maxLength: {
                value: 12,
                message: "Введите валидный номер цифрового талона",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Цифровой талон состоит только из цифр",
              },
            })}
          />
          {errors?.numberDT && (
            <p className="error_text text-danger my-2">
              {errors.numberDT.message}
            </p>
          )}
          <div className="d-flex w-100 align-items-center justify-content-center my-5">
            <button
              type="submit"
              className="btn btn-success px-4 py-2"
              disabled={!isDirty || !isValid}
            >
              поиск
            </button>
          </div>
        </form>
      </div>
      {isloading && <ModalLoading isLoading={isloading} />}
      <ModalNotFoundDT isDTFound={isDTFound} setShow={setisDTFound}/>
    </div>
  );
};

export default ResultExam;
