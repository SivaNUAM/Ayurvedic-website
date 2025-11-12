import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { LanguageProvider } from "./context/LanguageContext";
import "./index.css";
import "./tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
  </React.StrictMode>
);
