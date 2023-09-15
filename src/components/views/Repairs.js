import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { AdvisorViews } from "./views/AdvisorViews";
import { AdvisorNavBar } from "./nav/AdvisorNavBar";
import "./Repairs.css";
import { isStaff } from "../utils/isStaff";
import { AdvisorRegister } from "./auth/AdvisorRegister";

export const Repairs = () => {

  return (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("sdrive")) {
            if (isStaff()) {
              return <>
                  <AdvisorNavBar />
                  <AdvisorViews />
                </>
            }
            else {
              return <>
                  <NavBar />
                  <ApplicationViews />
                </>
            }
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/registeradvisor">
        <AdvisorRegister />
      </Route>
    </>
  )
}