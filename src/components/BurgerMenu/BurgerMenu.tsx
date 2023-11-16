import React, { FC, useState } from "react";

interface BurgerMenuProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

const BurgerMenu: FC<BurgerMenuProps> = ({ header, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return <>{isMenuOpen ? <div>{children}</div> : null}</>;
};

export default BurgerMenu;
