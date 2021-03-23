import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Meal from "./containers/MealPreface";
import VolunteerSignUp from "./containers/VolunteerSignUp";
import ResetPassword from "./containers/ResetPassword";
import Settings from "./containers/Settings";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";
import Edit_Profile from "./containers/Edit_Profile";
import AgencySignUp from "./containers/AgencySignUp";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import UserInfo from "./containers/UserInfo";

import AdminUserData from "./containers/AdminUserData";
import AdminHome from "./containers/AdminHome";
import AdminUpdateFood from "./containers/AdminUpdateFood";


export default function Routes() {
  return (
    <Switch>

      <AuthenticatedRoute exact path="/settings/email">
        <ChangeEmail />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/settings/password">
        <ChangePassword />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/login/reset">
       <ResetPassword />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/AdminUpdateFood">
            <AdminUpdateFood />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/AdminUserData">
            <AdminUserData />
      </AuthenticatedRoute>

      {/* <UnauthenticatedRoute exact path="/AdminHome">
            <AdminHome />
      </UnauthenticatedRoute> */}

      <AuthenticatedRoute exact path="/AdminHome">
            <AdminHome />
      </AuthenticatedRoute>

      <AuthenticatedRoute  exact path="/Request_Meal">
        <Meal />
      </AuthenticatedRoute >

      <AuthenticatedRoute  exact path="/userinfo">
        <UserInfo />
      </AuthenticatedRoute >

      <AuthenticatedRoute exact path="/Edit_Profile">
        <Edit_Profile />
      </AuthenticatedRoute>

      <AuthenticatedRoute  exact path="/settings">
        <Settings />
      </AuthenticatedRoute>  

      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>

      <UnauthenticatedRoute exact path="/login">
       <Login />
      </UnauthenticatedRoute>

      <UnauthenticatedRoute exact path="/Volunteer_Registration">
        <VolunteerSignUp />
      </UnauthenticatedRoute>

      <UnauthenticatedRoute exact path="/Agency_Registration">
        <AgencySignUp></AgencySignUp>
      </UnauthenticatedRoute>

      

      <Route exact path="/">
        <Home />
      </Route>

      {/* <Route exact path="/AdminHome">
        <AdminHome />
      </Route> */}
      
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>

      
      
    </Switch>
  );
}