import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import SideMenu from "./components/SideMenu/SideMenu";
import TopMenu from "./components/TopMenu/TopMenu";
import Home from "./components/Home/Home";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./App.css";
import "./components/styles/sb-admin-2.min.css";
import Students from "./components/Students/Students";
import Professors from "./components/Professors/Professors";
import Staff from "./components/Staff/Staff";

const App = () => {
  return (
    <div className="App" id="wrapper">
      <BrowserRouter>
        <SideMenu />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopMenu />

            <div className="container-fluid">
              <Switch>
                <Route exact path={`/`} component={Home}></Route>
                <Route exact path={`/administration`} component={Staff}></Route>
                <Route
                  exact
                  path={`/enseignants`}
                  component={Professors}
                ></Route>
                <Route exact path={`/etudiants`} component={Students}></Route>
              </Switch>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={5000} />
      </BrowserRouter>
    </div>
  );
};

export default App;
