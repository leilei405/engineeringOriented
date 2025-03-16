import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ConfigProvider } from "antd";
import "./styles/global.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <ConfigProvider>
          <App />
        </ConfigProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
