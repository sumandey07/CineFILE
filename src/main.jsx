import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
const helmetContext = { name: "CineFILE" };

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  </Provider>
);
