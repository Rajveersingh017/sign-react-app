import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import MealPreface from "./containers/MealPreface";
import VolunteerSignUp from "./containers/VolunteerSignUp";
import ResetPassword from "./containers/ResetPassword";
import Settings from "./containers/Settings";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";
import Edit_Profile from "./containers/Edit_Profile";
import AgencySignUp from "./containers/AgencySignUp";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import UserInformation from "./containers/UserInfo";
import Test from "./containers/Test";
import AdminUserData from "./containers/AdminUserData";
import AdminHome from "./containers/AdminHome";
import AdminUpdateFood from "./containers/ManageMeals";
import   UserData  from "./contextData/UserData";


export default function Routes() {
  const [userInfo,setUserInfo] = useState({
      address: "",
      phoneNumber: "",
      clientName: "",
      clientCity: "",
      neighbourhood: "",
      adultsHome: "",
      childrenHome: "",
      clientAllergies: ""
  });
  return (
    <Switch>
      <UserData.Provider value={{userInfo,setUserInfo}}>


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
        <MealPreface />
      </AuthenticatedRoute >

        <AuthenticatedRoute  exact path="/UserInformation">
          <UserInformation />
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
      
      
      <Route exact path="/test">
        <Test />
      </Route>
      

      <Route exact path="/">
        <Home />
      </Route>
      </UserData.Provider>

      
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>

      
      
    </Switch>
  );
}