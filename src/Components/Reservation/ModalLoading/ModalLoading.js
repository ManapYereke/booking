import React from "react";
import Spinner from 'react-bootstrap/Spinner';

import "./ModalLoading.css";

const ModalLoading = (props) => {
  const { isLoading } = props;


  return (
    <div className={isLoading ? "modal_loading" : "none"}>
        <div className="modal_container">
            {
              isLoading && 
              <Spinner  animation="border" className="size_loading_circle" size="sm"/>
            }
        </div>
    </div>
  );
}

export default ModalLoading;
