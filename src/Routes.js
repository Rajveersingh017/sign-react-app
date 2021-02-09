import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
<<<<<<< HEAD
import Meal from "./containers/Meal";
import VolunteerSignUp from "./containers/VolunteerSignUp";
=======
import ResetPassword from "./containers/ResetPassword";
import Settings from "./containers/Settings";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";

>>>>>>> bbec4008f6d4ecaa3a31b02cb58d730641d0e07d

export default function Routes() {
  return (
    <Switch>

<<<<<<< HEAD
      <Route exact path="/Volunteer_Registration">
        <VolunteerSignUp />
      </Route>

      <Route exact path="/Request_Meal">
        <Meal />
=======
      <Route exact path="/settings/email">
        <ChangeEmail />
      </Route>

      <Route exact path="/settings/password">
        <ChangePassword />
      </Route>

      <Route exact path="/login/reset">
       <ResetPassword />
>>>>>>> bbec4008f6d4ecaa3a31b02cb58d730641d0e07d
      </Route>

      <Route exact path="/signup">
        <Signup />
      </Route>
<<<<<<< HEAD
=======

      <Route exact path="/settings">
        <Settings />
      </Route>  
>>>>>>> bbec4008f6d4ecaa3a31b02cb58d730641d0e07d

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