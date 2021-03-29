import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.render(
  <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>,
  document.getElementById("root")
);
