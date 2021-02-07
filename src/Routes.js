import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ResetPassword from "./containers/ResetPassword";
import Settings from "./containers/Settings";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";


export default function Routes() {
  return (
    <Switch>

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