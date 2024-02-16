import React, { useState } from "react";
import { Link } from "react-router-dom";
import i18n from '../../config/i18n'


import ModalLoading from "../Reservation/ModalLoading/ModalLoading";

import logo from "../../assets/images/logo.jpg";

import "./Header.css";

const Header = () => {
  //Toogle for open modal loading animation
  const [isLoading, setIsLoading] = useState(false)

  //HANDLE FOR CHANGE LANGUAGE
  const onChangeLang = (lang) => {
    i18n.changeLanguage(lang)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    },300)
  }

  return (
    <div className="header">
      <div className="header_logo_lang">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <select class="form-select form-select-lg" style={{width: '100px'}} aria-label="Default select example" onChange={(e) => onChangeLang(e.target.value)}>
          <option value="kz">Қаз</option>
          <option value="ru" selected>Рус</option>
        </select>
        {/* <div className="lang">
          <span className="lang_text" onClick={(e) => onChangeLang('kz')} >КАЗ</span>
          <span className="lang_text" onClick={(e) => onChangeLang('ru')}>РУС</span>
        </div> */}
      </div>
      {
        isLoading && <ModalLoading isLoading={isLoading}/>
      }
    </div>
  );
};

export default Header;
