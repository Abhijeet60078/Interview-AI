import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@/hooks/useTheme";
import "./index.css";
createRoot(document.getElementById("root")).render(_jsx(ThemeProvider, { children: _jsx(App, {}) }));
