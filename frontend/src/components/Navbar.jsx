import { useState } from "react";


import {
  Heart,
  Menu,
  X,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const { language, setLanguage, t } =
    useLanguage();


  const closeMenu = () => {
    setIsMenuOpen(false);
  };


  // =========================================
  // SMOOTH SCROLL
  // =========================================


  const handleScroll = (event, id) => {
    event.preventDefault();


    const section =
      document.getElementById(id);


    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }


    closeMenu();
  };


  return (
    <header className="site-navbar">


      <div className="navbar-container">


        {/* Logo */}


        <a
          href="#home"
          className="navbar-brand"
          onClick={(event) =>
            handleScroll(event, "home")
          }
        >
          <div className="navbar-logo">
            🛕
          </div>


          <div className="navbar-brand-text">
            <span>Kanaka Durgamma</span>
            <strong>Temple</strong>
          </div>
        </a>



        {/* Desktop Navigation */}


        <nav className="navbar-links">


          <a
            href="#home"
            onClick={(event) =>
              handleScroll(event, "home")
            }
          >
            {t.navbar.home}
          </a>


          <a href="#about">
            {t.navbar.about}
          </a>


          <a href="#history">
            {t.navbar.history}
          </a>



          {/* Dasara / Live */}


          <a
            href="#dasara-section"
            className="navbar-dasara-link"
            onClick={(event) =>
              handleScroll(
                event,
                "dasara-section"
              )
            }
          >
            {t.navbar.dasara}


            <span className="navbar-new-badge">
              Live
            </span>
          </a>



          <a href="#gallery">
            {t.navbar.gallery}
          </a>


          <a href="#donate">
            {t.navbar.donate}
          </a>



          {/* Pillars */}


          <a
            href="#pillars"
            onClick={(event) =>
              handleScroll(event, "pillars")
            }
          >
            {t.navbar.pillars}
          </a>


          <a href="#village">
            {t.navbar.village}
          </a>


          <a href="#contact">
            {t.navbar.contact}
          </a>


        </nav>



        {/* Desktop Donate */}


        <a
          href="#donate"
          className="btn btn-gold navbar-donate"
        >
          <Heart size={16} />
          {t.navbar.donateNow}
        </a>


        {/* Language Switch */}

        <button
          type="button"
          className="navbar-language-switch"
          onClick={() =>
            setLanguage(
              language === "en"
                ? "te"
                : "en"
            )
          }
          aria-label={
            language === "en"
              ? "Switch to Telugu"
              : "Switch to English"
          }
          title={
            language === "en"
              ? "తెలుగు"
              : "English"
          }
        >
          {language === "en"
            ? "తెలుగు"
            : "EN"}
        </button>



        {/* Mobile Menu Button */}


        <button
          type="button"
          className="navbar-menu-button"
          onClick={() =>
            setIsMenuOpen(!isMenuOpen)
          }
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>


      </div>



      {/* Mobile Navigation */}


      <div
        className={`navbar-mobile ${
          isMenuOpen
            ? "navbar-mobile-open"
            : ""
        }`}
      >


        <nav>


          <a
            href="#home"
            onClick={(event) =>
              handleScroll(event, "home")
            }
          >
            {t.navbar.home}
          </a>



          <a
            href="#about"
            onClick={closeMenu}
          >
            {t.navbar.about}
          </a>



          <a
            href="#history"
            onClick={closeMenu}
          >
            {t.navbar.history}
          </a>



          {/* Dasara / Live */}


          <a
            href="#dasara-section"
            onClick={(event) =>
              handleScroll(
                event,
                "dasara-section"
              )
            }
            className="mobile-dasara-link"
          >
            {t.navbar.dasara}


            <span className="navbar-new-badge">
              Live
            </span>
          </a>



          <a
            href="#gallery"
            onClick={closeMenu}
          >
            {t.navbar.gallery}
          </a>



          {/* Pillars */}


          <a
            href="#pillars"
            onClick={(event) =>
              handleScroll(event, "pillars")
            }
          >
            {t.navbar.pillarsMobile}
          </a>



          <a
            href="#village"
            onClick={closeMenu}
          >
            {t.navbar.village}
          </a>



          <a
            href="#contact"
            onClick={closeMenu}
          >
            {t.navbar.contact}
          </a>



          <a
            href="#donate"
            onClick={closeMenu}
            className="btn btn-gold mobile-donate-button"
          >
            <Heart size={16} />
            {t.navbar.donateNow}
          </a>


          <button
            type="button"
            className="navbar-language-switch navbar-language-switch-mobile"
            onClick={() =>
              setLanguage(
                language === "en"
                  ? "te"
                  : "en"
              )
            }
            aria-label={
              language === "en"
                ? "Switch to Telugu"
                : "Switch to English"
            }
          >
            {language === "en"
              ? "తెలుగు"
              : "English"}
          </button>


        </nav>


      </div>


    </header>
  );
}


export default Navbar;