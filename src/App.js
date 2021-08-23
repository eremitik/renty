import React, { useEffect, useContext } from 'react';
// import { storeToken } from './helper';
import { HashRouter, BrowserRouter, Switch, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegistPage from "./views/RegistPage";
import ItemsPage from "./views/ItemsPage";
// import { Context } from "./Store";





function App() {


  const paths = {
    homePage: "/",
    loginPage: "/login",
    registPage: "/register",
    itemsPage: "/main",
  };

  const routes = [
    {
      path: paths.homePage,
      exact: true,
      render: () => <HomePage />,
    },
    {
      path: paths.loginPage,
      render: () => <LoginPage />,
    },
    {
      path: paths.registPage,
      render: () => <RegistPage />,
    },
    {
      path: paths.itemsPage,
      render: () => <ItemsPage />,
    },
  ];

  return (
    <HashRouter>
      <Navbar />
      <Switch>
        {routes.map((route) => (
          <Route
            path={route.path}
            exact={Boolean(route.exact)}
            render={route.render}
            key={route.path}
          />
        ))}
      </Switch>
    </HashRouter>
  );
}
export default App;