import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import ApiContextProvider from "./api/ApiContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <ApiContextProvider>
        <App />
      </ApiContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
