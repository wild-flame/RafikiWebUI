// React and React-DOM
import React from 'react';
import ReactDOM from 'react-dom';

// Redux and Middleware
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

// Material-UI
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import App from './App';
import rootReducer from "./store/rootReducer"
import ErrorBoundary from "./containers/ErrorBoundary/ErrorBoundary"


// compose to combine store enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      // add saga or thunk here
    )
  )
);

const theme = createMuiTheme({
  palette: {
    primary: {
      // deepblue
      main: "#1a237e"
    },
    secondary: {
      // red
      main: "#c62828"
    }
  },
  typography: {
    htmlFontSize: 14,
    // Migration to typography v2
    useNextVariants: true
  }
});


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