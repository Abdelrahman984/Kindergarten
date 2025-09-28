import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { prefixer } from "stylis";

// Create an Emotion cache that applies the RTL plugin so MUI styles are flipped
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create an MUI theme with RTL direction
const theme = createTheme({
  direction: "rtl",
});

// Ensure the document direction is set (index.html already has dir="rtl" but this is defensive)
if (typeof document !== "undefined") {
  document.documentElement.dir = "rtl";
  document.body.dir = "rtl";
}

createRoot(document.getElementById("root")!).render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </CacheProvider>
);
