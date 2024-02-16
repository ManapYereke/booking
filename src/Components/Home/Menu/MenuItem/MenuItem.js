import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import { MenuHoverContext } from "../../../../Context/Context";

import "./MenuItem.css";

export default function MenuItem({ menu }) {
  // const { isHover, setIsHover } = useContext(MenuHoverContext);s
  const [hovered, setHovered] = useState(false);

  //Mouse enter event listener
  const mouseEnter = (e) => {
    setHovered(true);
    // setIsHover(true);
  };

  //Mouse leave mouse leave
  const onMouseLeave = () => {
    setHovered(false);
    // setIsHover(false);
  };

  useEffect(() => {
    setHovered(false);
  }, []);

  

  return (
    <Link to={menu.link}>
    <div
      className={hovered ? "menu_item_hover" : "menu_item"}
      style={{ backgroundColor: menu.menu_bg_color }}
      onMouseEnter={(e) => mouseEnter(e)}
      onMouseLeave={(e) => onMouseLeave(e)}
    >
      <div
        
        className={hovered ? "header_text " : "menu_item_text "}
        style={{ color: menu.color_text }}
      >
        {menu.menu_name}
      </div>
      <img
        src={menu.menu_img}
        className={hovered ? "menu_img_block" : "menu_img"}
        alt={menu.menu_name}
      />
    </div>
    </Link>
  );
}
