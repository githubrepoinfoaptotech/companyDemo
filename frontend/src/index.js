import React from "react";
import { createRoot } from "react-dom/client"; // Updated import
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "./themes";
import App from "./components/App";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import "./index.css"; 
import './fonts/arialRounded.ttf';
import { ResumeDataProvider } from "./context/CandidateDataContext";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <LayoutProvider>
    <UserProvider>
      <ResumeDataProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ResumeDataProvider>
    </UserProvider>
  </LayoutProvider>
);
