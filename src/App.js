import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegistPage from "./views/RegistPage";
import ItemsPage from "./views/ItemsPage";
import FormPage from "./views/FormPage";

function App() {

  const paths = {
    homePage: "/",
    loginPage: "/login",
    registPage: "/register",
    itemsPage: "/main",
    formPage: "/form",
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
    {
      path: paths.formPage,
      render: () => <FormPage />,
    }
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