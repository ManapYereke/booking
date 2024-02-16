import React from "react";


import MenuItem from "./MenuItem/MenuItem";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const { t } = useTranslation();

  return (
    <>
      {t("menu", { returnObjects: true }).map((menu) => (
        <MenuItem menu={menu} key={menu.id} />
      ))}
    </>
  );
};

export default Menu;
