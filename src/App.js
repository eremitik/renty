import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toolbar from '@material-ui/core/Toolbar';
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegistPage from "./views/RegistPage";
import ItemsPage from "./views/ItemsPage";
import FormPage from "./views/FormPage";
import ProfilePage from "./views/ProfilePage";
import OrderPage from "./views/OrderPage";
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightRegular: 700,
  },
});

function App() {

  const paths = {
    homePage: "/",
    loginPage: "/login",
    registPage: "/register",
    itemsPage: "/main",
    formPage: "/form",
    profilePage: "/profile",
    orderPage: "/order",
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
    },
    {
      path: paths.profilePage,
      render: () => <ProfilePage />,
    },
    { 
      path: paths.orderPage,
      render: () => <OrderPage />,
    }
  ];

  return (
  <ThemeProvider theme={theme}> 
    <HashRouter>
        <Navbar />
        <Toolbar />
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
  </ThemeProvider>
  );
}
export default App;