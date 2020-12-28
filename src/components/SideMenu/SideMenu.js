import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillDashboard } from "react-icons/ai";
import { GiTeacher } from "react-icons/gi";
import { MdSchool } from "react-icons/md";
const SideMenu = () => {
  let [leftMenuVisibility, setLeftMenuVisibility] = useState(false);

  function changeLeftMenuVisibility() {
    setLeftMenuVisibility(!leftMenuVisibility);
  }

  function getCollapseClass() {
    return leftMenuVisibility ? "" : "collapsed";
  }

  return (
    <Fragment>
      <div className="toggle-area">
        <button
          className="btn btn-primary toggle-button"
          onClick={() => changeLeftMenuVisibility()}
        >
          <i className="fas fa-bolt"></i>
        </button>
      </div>

      <ul
        className={`navbar-nav bg-gradient-primary-green sidebar sidebar-dark accordion ${getCollapseClass()}`}
        id="collapseMenu"
      >
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/"
        >
          <div className="sidebar-brand-icon icon-green rotate-n-15">
            <i className="fas fa-bolt"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            Gestion <sup>Département</sup>
          </div>
        </Link>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <Link className="nav-link" to={"/"}>
            <AiFillDashboard size="1.6rem" /> <span>Tableau de bord</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Gestion</div>

        <li className="nav-item">
          <Link className="nav-link" to={`/administration`}>
            <BsFillPeopleFill size="1.4rem" />
            <span> Cadre Administratif</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={`/enseignants`}>
            <GiTeacher size="1.4rem" /> <span> Enseignants</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={`/etudiants`}>
            <MdSchool size="1.4rem" /> <span> Etudiants</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
      </ul>
    </Fragment>
  );
};

export default SideMenu;
