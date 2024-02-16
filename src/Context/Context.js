import { createContext, useMemo, useState } from "react";

export const MenuHoverContext = createContext({ isHover: false });

export const MenuHoverProvider = ({ children }) => {
  const [isHover, setIsHover] = useState(false);

  const value = useMemo(() => ({ isHover, setIsHover }), [isHover]);
  return (
    <MenuHoverContext.Provider value={value}>
      {children}
    </MenuHoverContext.Provider>
  );
};
