import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route 
 } from 'react-router-dom'

import LandingPage from "./containers/LandingPage/LandingPage"
import SignIn from "./containers/SignInPage/SignIn"
import SignUp from "./containers/SignUpPage/SignUp"
import ConsoleOverview from "./containers/ConsoleOverview/ConsoleOverview"


const NoMatch = ({ location }) => (
  <h3>No page found for <code>{location.pathname}</code></h3>
)


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            component={LandingPage}
          />
          <Route
            exact
            path='/sign-in'
            component={SignIn}
          />
          <Route
            exact
            path='/sign-up'
            component={SignUp}
          />
          <Route
            // exact
            path='/console'
            component={ConsoleOverview}
          />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
