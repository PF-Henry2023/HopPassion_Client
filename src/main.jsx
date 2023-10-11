import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store/store.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos CSS de Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min"; // Importa los archivos JavaScript de Bootstrap
// import { Auth0Provider } from "@auth0/auth0-react"//

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    {/* <Auth0Provider
      domain="dev-ke2kmb45sqnv6r5n.us.auth0.com"
      clientId="dsc7eeRWlWw1ITKEGTXsE1OqNN7TMfQR"
      redirect_uri={window.location.origin}
      audience="http://localhost:3001"
      scope="openid profile email"
    > */}
      <App />
    {/* </Auth0Provider> */}
    </BrowserRouter>
  </Provider>
);
