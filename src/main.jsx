// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FormularProvider } from "./context/formularContext/FormularContext.jsx";

createRoot(document.getElementById("root")).render(
  <FormularProvider>
    <App />
  </FormularProvider>
);
