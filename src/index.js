// React and React-DOM
import React from 'react';
import ReactDOM from 'react-dom';

// Redux and Middleware
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga'

//Google Analytics
import ReactGA from 'react-ga';

// Material-UI
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme"
import 'typeface-roboto';

import App from './App';
import rootReducer from "./store/rootReducer"
import rootSaga from "./sagas"
import ErrorBoundary from "./containers/ErrorBoundary/ErrorBoundary"


// Load Roboto typeface
require('typeface-roboto')

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// compose to combine store enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      // mount Saga on the Store
      sagaMiddleware
    )
  )
);

// then run the saga
sagaMiddleware.run(rootSaga)

// tracking ID for "ForBase-App" on Google Analytics
ReactGA.initialize('UA-48967212-5');
ReactGA.pageview(window.location.pathname + window.location.search);


ReactDOM.render(
  <ErrorBoundary
    render={() => (
      <div>An error occurred in this page, please go back and refresh</div>
    )}
  >
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);