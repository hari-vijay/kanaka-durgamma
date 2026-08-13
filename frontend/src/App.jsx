import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import DasaraTicker from "./components/DasaraTicker";
import Hero from "./components/Hero";
import QuickLinks from "./components/QuickLinks";
import DasaraSection from "./components/DasaraSection";
import UpdatesSection from "./components/UpdatesSection";
import AboutTemple from "./components/AboutTemple";
import TempleHistory from "./components/TempleHistory";
import TemplePillars from "./components/TemplePillars";
import VillageSection from "./components/VillageSection";
import GallerySection from "./components/GallerySection";
import DonationSection from "./components/DonationSection";
import DeekshaSection from "./components/DeekshaSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UpdatesPage from "./pages/UpdatesPage";
import DasaraSchedule from "./pages/DasaraSchedule";
import GalleryPage from "./pages/GalleryPage";

import { getTempleStatus } from "./services/templeApi";
import { TempleProvider } from "./context/TempleContext";
import { LanguageProvider } from "./context/LanguageContext";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";


function Home() {

  const [backendStatus, setBackendStatus] =
    useState("");

  useEffect(() => {

    getTempleStatus()
      .then((data) => {

        setBackendStatus(data);

      })
      .catch((error) => {

        console.error(
          "Backend connection failed:",
          error
        );

        setBackendStatus(
          "Backend connection failed"
        );

      });

  }, []);


  return (
    <>
      {/* =========================================
          HOME / TOP TARGET
      ========================================= */}

      <div id="home">

        <Navbar />

        <DasaraTicker variant="top" />

        <Hero />

      </div>


      <DasaraTicker variant="hero" />

      <QuickLinks />

      <DasaraSection />

      <UpdatesSection />

      <AboutTemple />

      <TempleHistory />

      <TemplePillars />

      <VillageSection />

      <GallerySection />

      <DonationSection />

      <DeekshaSection />

      <ContactSection />

      <Footer />


      {/* Temporary backend test */}

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          padding: "10px 16px",
          borderRadius: "8px",
          background: "#136d5b",
          color: "white",
          fontSize: "12px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        {backendStatus ||
          "Connecting to backend..."}
      </div>

    </>
  );
}


/* =========================================================
   PROTECTED ADMIN ROUTE
========================================================= */
function ProtectedAdminRoute() {

  const [checking, setChecking] =
    useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {

    let mounted = true;

    const checkAdminSession = async () => {

      try {

        const response = await fetch(
          `${API_BASE_URL}/admin/session`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to check admin session"
          );
        }

        const data =
          await response.json();

        if (!mounted) {
          return;
        }

        setAuthenticated(
          data.authenticated === true
        );

      } catch (error) {

        console.error(
          "Admin session check failed:",
          error
        );

        if (mounted) {
          setAuthenticated(false);
        }

      } finally {

        if (mounted) {
          setChecking(false);
        }

      }

    };

    checkAdminSession();

    return () => {
      mounted = false;
    };

  }, []);

  if (checking) {

    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffaf2",
          color: "#5e0808",
          fontFamily: "inherit",
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        Checking administrator access...
      </main>
    );

  }

  if (!authenticated) {

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }

  return <AdminDashboard />;

}


/* =========================================================
   APP
========================================================= */

function App() {

  return (

    <BrowserRouter>

      <TempleProvider>

        <LanguageProvider>

          <Routes>

            {/* MAIN WEBSITE */}

            <Route
              path="/"
              element={<Home />}
            />


            {/* ALL TEMPLE UPDATES */}

            <Route
              path="/updates"
              element={<UpdatesPage />}
            />


            {/* FULL DASARA SCHEDULE */}

            <Route
              path="/dasara-schedule"
              element={<DasaraSchedule />}
            />


            {/* FULL GALLERY */}

            <Route
              path="/gallery"
              element={<GalleryPage />}
            />


            {/* ADMIN LOGIN */}

            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />


            {/* PROTECTED ADMIN DASHBOARD */}

            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute />
              }
            />


            {/* FALLBACK */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>

        </LanguageProvider>

      </TempleProvider>

    </BrowserRouter>

  );

}

export default App;