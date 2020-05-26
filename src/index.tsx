import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Admin from 'layouts/Admin';
import LoginPage from 'layouts/LoginPage';
import LandingPage from 'layouts/LandingPage/LandingPage';

import * as serviceWorker from './serviceWorker';
import 'assets/css/material-dashboard-react.css?v=1.8.0';


const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/landing-page" component={LandingPage} />
      <Redirect from="/" to="/landing-page" />
    </Switch>
  </Router>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
