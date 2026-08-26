import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/responsive.css";

import Home from "./pages/Home/Home";
import CustomerLogin from "./pages/CustomerLogin/CustomerLogin";
import StoreLogin from "./pages/StoreLogin/StoreLogin";
// import AppInstallOverlay from './components/AppInstallOverlay';

import PWAInstallPrompt from "./components/PWAInstallPrompt";

function App() {
  return (
    <BrowserRouter>

      {/* Existing PWA */}

      {/* Custom 2-second Install Popup */}
      <PWAInstallPrompt />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/customer-login"
          element={<CustomerLogin />}
        />

        <Route
          path="/store-login"
          element={<StoreLogin />}
        />

        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "60vh",
                display: "grid",
                placeItems: "center",
                fontSize: "30px",
                fontWeight: "800",
              }}
            >
              404 - Page Not Found
            </div>
          }
        />

      </Routes>
            {/* <AppInstallOverlay />   ← yeh line end mein daalna */}


    </BrowserRouter>
  );
}

export default App;