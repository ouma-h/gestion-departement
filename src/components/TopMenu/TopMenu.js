import React from "react";
import TopMenuAccount from "./TopMenuAccount";
import "./TopMenu.css";


const TopMenu = () => {

  return (
    <nav className="navbar navbar-expand navbar-light bg-custom-dark topbar static-top shadow">
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>
        <TopMenuAccount />
      </ul>
    </nav>
  );
};

export default TopMenu;
