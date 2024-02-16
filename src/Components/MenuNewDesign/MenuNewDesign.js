import React, { useState } from "react";

import "./MenuNewDesign.css";
import { useNavigate } from "react-router";

const MenuNewDesign = () => {
  const [theoryInput, setTheoryInput] = useState(false);
  const [practiceInput, setPracticeInput] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="d-flex w-100 flex-column">
      <div className="menu_box">
        <div className="menu_box_item">
          <span>Электронное бронирование</span>
        </div>
        <div className="menu_box_item">
          <div className="iin_input_block">
            <span onClick={() => navigate("reservation/theory-exam")}>
              Теория
            </span>
          </div>
          <div className="iin_input_block">
            <span onClick={() => navigate("reservation/practice-exam")}>
              Практика
            </span>
          </div>
        </div>
      </div>
    </div>



// {/* <div className="d-flex w-100 flex-column">
//     <div className="menu_box">
//         <div className="menu_box_item" onClick={() => navigate("reservation/theory-exam")}>
//             <span>Электронное бронирование - Теория</span>
//         </div>
//         <div className="menu_box_item" onClick={() => navigate("reservation/practice-exam")}>
//             <span>Электронное бронирование - Практика</span>
//         </div>
//         {/* Add more menu items here */}
//     </div>
// </div> */}



  );
};

export default MenuNewDesign;
