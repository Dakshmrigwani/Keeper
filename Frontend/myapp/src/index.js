import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./Context/ThemeContext";
import { sendToVercelAnalytics } from "./vitals";
import { FilteredDataProvider } from "./Context/FilteredDataContext";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-ffhbim08brg5m5b0.us.auth0.com"
    clientId="7wvIowG5DNh80LN5VKaZORhTxlatnN3o"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <FilteredDataProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </FilteredDataProvider>
    </Provider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(sendToVercelAnalytics);
