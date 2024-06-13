import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { pdfjs } from 'react-pdf';

// components
import Forget from "../pages/forget";
import Login from "../pages/login";
import Register from "../pages/register/Register";

import Layout from "./Layout"; 
import Author269 from "../pages/login/author269";

// context
import { useUserState } from "../context/UserContext";
import CompanyRegister from "../pages/register/companyRegister";
import candidateCPV from "../pages/register/candidateCPV";

import Layouts from "../pages/share/Shortlist";
import ApproveMail from "../pages/mailApproval/ApproveMail";
import PageNotFound from "./page_not_found/PageNotFound";
import CandidateCPVconfirmation from "../pages/register/CandidateCPVconfirmation";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <HashRouter baseName="/v1">
      <Switch>
        <Route exact path="/v1" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/approvalMail" component={ApproveMail} />
        <PublicRoute path="/register" component={Register} />
        <PublicRoute path="/companyRegister" component={CompanyRegister} />
        <PublicRoute path="/auth/forget/:id" component={Forget} />
        <PublicRoute path="/author269" component={Author269} />
        <PublicRoute path="/candidateCPV" component={candidateCPV} />
        <PublicRoute path="/candidateConfirmationCPV" component={CandidateCPVconfirmation} />
        <PublicRoute path="/shortlist" component={Layouts} />
        <Route path="" component={PageNotFound} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }


  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated === null ? (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
