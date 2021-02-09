import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Meal from "./containers/Meal";
import VolunteerSignUp from "./containers/VolunteerSignUp";

export default function Routes() {
  return (
    <Switch>

      <Route exact path="/Volunteer_Registration">
        <VolunteerSignUp />
      </Route>

      <Route exact path="/Request_Meal">
        <Meal />
      </Route>

      <Route exact path="/signup">
        <Signup />
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