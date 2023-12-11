import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AddressBook from "../pages/Admin/Main/AddressBook";
import Company from "../pages/Admin/Company/Company";
import Members from "../pages/Admin/Auth/Members";
import Login from "../pages/Admin/Auth/Login";
import MainPage from "../pages/Client/MainPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const useRoute = currentUser => {
  if(currentUser) {
    return (
      <Switch>
        <Route
          exact
          path={["/", "address_book"]}
          component={() => <AddressBook user={currentUser} />}
        />
        <Route
          path="/company"
          component={() => <Company user={currentUser} />}
        />
        <Route
          path="/members"
          component={() => <Members />}
        />
        <Redirect to="/" />
      </Switch>
    );
  }
  else {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={() => <MainPage />}
        />
        <Route
          exact
          path="/login"
          component={ Login }
        />
        <Route
          path="*"
          component={ NotFoundPage }
        />
      </Switch>
    );
  }
};