import React from "react";
import { Link } from "react-router-dom";
//import Menu from "./Menu/Menu";
//import MenuNewDesign from "../MenuNewDesign/MenuNewDesign";

import driver_license from "../../assets/images/driver_license.jpg";

import { useTranslation } from "react-i18next";
//import { MenuHoverContext } from "../../Context/Context";

import "./Home.css";
//import { Container } from "react-bootstrap";

import logo from "../../assets/images/logo.jpg";

export default function Home() {
  const { t } = useTranslation();

  // hover or not menu item for resize h1
  //  const { isHover, setIsHover } = useContext(MenuHoverContext);


  return (
    <>
      <div className="header_text_block">
        <div className="header_text_block_item w-100" >
          <h1 className="header_text">
            {t("title")}
          </h1>
        </div>
        <div className="header_text_block_item">
          <img
            src={driver_license}
            className="driver_img"
            alt="Водительское удостоверение"
          />
        </div>
      </div>
      <a href="https://www.gov.kz/uploads/2023/11/22/b22df9370ac12734f9616f93c9741865_original.46379170.pdf" download className="header_link" style={{ color: '#0F914C' }}>
        {t("testsPdd")}
      </a>
      <div style={{ padding: '0% 15% 0px' }} className="bg-white py-5">
        <div class="container overflow-hidden">
          <div class="row gx-5">
            <div class="col">
              <Link to={"/reservation"}>
                <div class="p-4 rounded d-flex flex-column align-items-center border bg-white cursor-pointer mb-2">
                  <img
                    src={t("menu.0.menu_img")}
                    alt="водительское удостоверения"
                    className="p-3"
                    height={150}
                  />
                  <h3 className="text-dark text-center">{t("menu.0.menu_name")}</h3>
                </div>
              </Link>
            </div>
            <div class="col">
              <Link to={"/stream"}>
                {/* <a href="https://egov.kz/cms/kk/articles/poluchenie_pravab" target="_blank" rel="noopener noreferrer"> */}
                <div class="p-4 rounded d-flex flex-column align-items-center border bg-white cursor-pointer mb-2">
                  <img
                    src={t("menu.1.menu_img")}
                    alt="водительское удостоверения"
                    className="p-3"
                    height={150}
                  />
                  <h3 className="text-dark">{t("menu.1.menu_name")}</h3>
                </div>
              </Link>
              {/* </a> */}
            </div>
          </div>
        </div>
      </div>




      <br></br>


      {/* <div className="header_text_block d-flex flex-column align-items-start bg-light bg-gradient py-5">
      <div>
        <h1 className="fs-1">{t("menu.0.menu_name")}</h1>
        <div className="mt-3">
          <Link to={"/reservation/practice-exam"} className="btn btn-outline-success mx-2 my-1"><span className="fs-5">{t("btn_title_practce_exam")}</span></Link>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="fs-1">{t("menu.2.menu_name")}</h1>
        <div className="mt-3">
          <Link to={"/traffic-rules"} className="btn btn-outline-success mx-2 my-1"><span className="fs-5">Скачать на казахском</span></Link>
          <Link to={"/traffic-rules"} className="btn btn-outline-success mx-2 my-1"><span className="fs-5">Скачать на русском</span></Link>
        </div>
      </div>
    </div> */}




      <footer className="footer-row">
        <div className="row align-center">
          <div className="col-12 header-row-top">
            <div className="logo-text-block">
              <Link to="/">
                <img className="logo2" src={logo} alt="logo" />
              </Link>
              <div className="text">
                <span>
                  {/* НАО «Государственная корпорация» */}
                  {t("stateCorp")}
                </span>
                <span>
                  {/* «Правительство для граждан» */}
                  {t("gov4c")}
                </span>
              </div>
            </div>

            <div className="social">
              <a href="https://www.instagram.com/gov4c.kz/" target="_blank">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="8" fill="white"></rect>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9165 14.5166C10.9165 13.0167 10.9165 12.2668 11.2985 11.7411C11.4218 11.5713 11.5711 11.422 11.7409 11.2986C12.2667 10.9166 13.0166 10.9166 14.5165 10.9166H21.4832C22.9831 10.9166 23.733 10.9166 24.2587 11.2986C24.4285 11.422 24.5778 11.5713 24.7012 11.7411C25.0832 12.2668 25.0832 13.0167 25.0832 14.5166V21.4833C25.0832 22.9832 25.0832 23.7331 24.7012 24.2589C24.5778 24.4287 24.4285 24.578 24.2587 24.7013C23.733 25.0833 22.9831 25.0833 21.4832 25.0833H14.5165C13.0166 25.0833 12.2667 25.0833 11.7409 24.7013C11.5711 24.578 11.4218 24.4287 11.2985 24.2589C10.9165 23.7331 10.9165 22.9832 10.9165 21.4833V14.5166ZM17.9998 14.25C15.9289 14.25 14.2498 15.929 14.2498 18C14.2498 20.0709 15.9289 21.75 17.9998 21.75C20.0708 21.75 21.7498 20.0709 21.7498 18C21.7498 15.929 20.0708 14.25 17.9998 14.25ZM17.9998 20.3437C16.708 20.3437 15.6561 19.2918 15.6561 18C15.6561 16.7071 16.708 15.6562 17.9998 15.6562C19.2917 15.6562 20.3436 16.7071 20.3436 18C20.3436 19.2918 19.2917 20.3437 17.9998 20.3437ZM22.5308 13.9687C22.5308 14.2447 22.3071 14.4684 22.0311 14.4684C21.7551 14.4684 21.5314 14.2447 21.5314 13.9687C21.5314 13.6927 21.7551 13.469 22.0311 13.469C22.3071 13.469 22.5308 13.6927 22.5308 13.9687Z" fill="#22262F"></path>
                </svg>
              </a>
              <a href="https://www.facebook.com/gov4c" target="_blank">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="8" fill="white"></rect>
                  <path d="M21.853 10.5033L19.8542 10.5C17.6087 10.5 16.1575 12.0294 16.1575 14.3966V16.1932H14.1478C13.9741 16.1932 13.8335 16.3378 13.8335 16.5162V19.1193C13.8335 19.2977 13.9743 19.4421 14.1478 19.4421H16.1575V26.0105C16.1575 26.1889 16.2981 26.3333 16.4718 26.3333H19.0938C19.2675 26.3333 19.4081 26.1887 19.4081 26.0105V19.4421H21.7579C21.9316 19.4421 22.0722 19.2977 22.0722 19.1193L22.0732 16.5162C22.0732 16.4306 22.04 16.3485 21.9811 16.2879C21.9223 16.2273 21.8421 16.1932 21.7587 16.1932H19.4081V14.6702C19.4081 13.9382 19.5779 13.5666 20.5062 13.5666L21.8527 13.5661C22.0262 13.5661 22.1668 13.4215 22.1668 13.2432V10.8261C22.1668 10.6481 22.0264 10.5036 21.853 10.5033Z" fill="#22262F"></path>
                </svg>
              </a>
              <a href="https://t.me/gov4c_resmi" target="_blank">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="8" fill="white"></rect>
                  <path d="M16.3857 19.5717L16.1376 23.0617C16.4926 23.0617 16.6464 22.9092 16.8307 22.7261L18.4951 21.1355L21.9439 23.6611C22.5764 24.0136 23.022 23.828 23.1926 23.0792L25.4564 12.4718L25.457 12.4711C25.6576 11.5361 25.1189 11.1705 24.5026 11.3999L11.1964 16.4942C10.2882 16.8467 10.302 17.353 11.042 17.5824L14.4439 18.6405L22.3457 13.6961C22.7176 13.4499 23.0557 13.5861 22.7776 13.8324L16.3857 19.5717Z" fill="#22262F"></path>
                </svg>
              </a>
              <a href="https://twitter.com/gov4c" target="_blank">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="8" fill="white"></rect>
                  <path d="M18 14.875C18 13.1562 19.4453 11.7266 21.1641 11.75C21.766 11.7569 22.3531 11.9376 22.8548 12.2702C23.3565 12.6028 23.7514 13.0733 23.9922 13.625H26.75L24.2266 16.1484C24.0637 18.6833 22.9416 21.0609 21.0884 22.798C19.2352 24.5351 16.7901 25.5012 14.25 25.5C11.75 25.5 11.125 24.5625 11.125 24.5625C11.125 24.5625 13.625 23.625 14.875 21.75C14.875 21.75 9.875 19.25 11.125 12.375C11.125 12.375 14.25 15.5 18 16.125V14.875Z" fill="#22262F"></path>
                </svg>
              </a>
            </div>

            <div className="call-center">
              <p className="lonely-call">1414</p>
              <div className="text">
                {/* Единый контакт-центр */}
                {t("callCenter")}

                <br></br>
                <span>
                  {/* (Звонок бесплатный) */}
                  {t("callFree")}

                </span>
              </div>
            </div>




          </div>

        </div>
      </footer>
    </>
  );
}


