import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Meal from "./containers/Meal";
import VolunteerSignUp from "./containers/VolunteerSignUp";
import ResetPassword from "./containers/ResetPassword";
import Settings from "./containers/Settings";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";
import Edit_Profile from "./containers/Edit_Profile";
import AgencySignUp from "./containers/AgencySignUp";

export default function Routes() {
  return (
    <Switch>

      <Route exact path="/Agency_Registration">
        <AgencySignUp></AgencySignUp>
      </Route>
      <Route exact path="/Volunteer_Registration">
        <VolunteerSignUp />
      </Route>

      <Route exact path="/Request_Meal">
        <Meal />
      </Route>

      <Route exact path="/Edit_Profile">
        <Edit_Profile />
      </Route>

      <Route exact path="/settings/email">
        <ChangeEmail />
      </Route>

      <Route exact path="/settings/password">
        <ChangePassword />
      </Route>

      <Route exact path="/login/reset">
       <ResetPassword />
      </Route>

      <Route exact path="/signup">
        <Signup />
      </Route>

      <Route exact path="/settings">
        <Settings />
      </Route>  

      <Route exact path="/login">
       <Login />
      </Route>

      <Route exact path="/">
        <Home />
      </Route>
      
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>

      
      
    </Switch>
  );
}