import React, { useContext, useEffect } from 'react';
import { DataContext, Provider } from 'components/DataContext';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import {
  Router,
  Route,
  Switch,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import Admin from 'layouts/Admin';
import LoginPage from 'layouts/LoginPage';
import LandingPage from 'layouts/LandingPage/LandingPage';
// eslint-disable-next-line @typescript-eslint/no-unused-vars


import * as serviceWorker from './serviceWorker';
import 'assets/css/material-dashboard-react.css?v=1.8.0';

const hist = createBrowserHistory();

interface ComponentType {
  component: React.ComponentType<RouteComponentProps<{}>>;
  restricted?: boolean;
}

const PrivateRoute = ({
  component: Component,
  ...rest
}: RouteProps & ComponentType) => {
  const { data } = useContext(DataContext);
  const isLogin = !!data.user;
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/login" />}
    />
  );
};

const PublicRoute = ({
  component: Component,
  restricted,
  ...rest
}: RouteProps & ComponentType) => {
  const { data } = useContext(DataContext);
  const isLogin = !!data.user;
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLogin && restricted ? (
          <Redirect to="/admin" />
        ) : (
          <Component {...props} />
        )}
    />
  );
};

const OrigenRoute = () => {
  // TODO: 封装起来
  const { dispatch } = useContext(DataContext);
  useEffect(() => {
    const userString = localStorage.getItem('sessionToken');
    if (userString) {
      const user = JSON.parse(userString);
      //   console.log('user', user);
      //   defaultInitialState.user = user;
      dispatch({ type: 'login', user });
      //   setTimeout(() => {
      //     _dispatch({ type: 'login', user });
      //   }, 100);
    }
  }, [dispatch]);

  return (
    <Router history={hist}>
      <Switch>
        <PrivateRoute path="/admin" component={Admin} />
        <PublicRoute path="/login" restricted={true} component={LoginPage} />
        <Route path="/landing" component={LandingPage} />
        <Redirect from="/" to="/landing" />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <Provider config={{}}>
    <OrigenRoute />
  </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
