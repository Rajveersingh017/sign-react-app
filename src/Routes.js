import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ResetPassword from "./containers/ResetPassword";

export default function Routes() {
  return (
    <Switch>

      <Route exact path="/login/reset">
       <ResetPassword />
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