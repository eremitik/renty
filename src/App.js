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

export default function App() {
  return (
    <ThemeProvider theme={theme}> 
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <React.Fragment>
          <div>
            <Navbar />
            <Toolbar />
              <Route exact path="/login" component={LoginPage}></Route>
              <Route exact path="/register" component={RegistPage}></Route>
              <Route exact path="/main" component={ItemsPage}></Route>
              <Route exact path="/form" component={FormPage}></Route>
              <Route exact path="/profile" component={ProfilePage}></Route>
              <Route exact path="/order" component={OrderPage}></Route>
          </div>
          </React.Fragment>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}