import React, { useEffect, useContext } from 'react';
// import { useDispatch } from "react-redux";
// import { getItems } from "./actions/item";
// import { useSelector } from "react-redux";
import { storeToken } from './helper';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegistPage from "./views/RegistPage";
import ItemsPage from "./views/ItemsPage";
import { Context } from "./Store";





function App() {

  const [state, dispatch] = useContext(Context);
  // console.log(dispatch)


  useEffect(() => {
    storeToken(dispatch);
  }, [dispatch]);

  const paths = {
    homePage: "/",
    loginPage: "/login",
    registPage: "/register",
    itemsPage: "/items",
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
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
export default App;