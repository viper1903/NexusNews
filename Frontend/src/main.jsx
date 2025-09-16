import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SummaryProvider } from "./context/SummaryContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SummaryProvider>
        <App />
      </SummaryProvider>
    </AuthProvider>
  </StrictMode>
);
