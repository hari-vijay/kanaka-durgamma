import {
  MapPin,
  Phone,
  Heart,
  ArrowUp,
} from "lucide-react";


import { useTemple } from "../context/TempleContext";
import { useLanguage } from "../context/LanguageContext";


function Footer() {

  const {
    templeInfo,
    loading,
  } = useTemple();

  const { t } = useLanguage();


  // =========================================
  // TEMPLE SETTINGS
  // =========================================

  const templeName =
    templeInfo?.templeName ||
    "Kanaka Durgamma Temple";


  const description =
    templeInfo?.description ||
    t.footer.descriptionDefault;


  const village =
    templeInfo?.village ||
    t.footer.villageDefault;


  const district =
    templeInfo?.district ||
    "";


  const state =
    templeInfo?.state ||
    "Andhra Pradesh";


  const phone =
    templeInfo?.phone ||
    t.footer.phoneDefault;


  // =========================================
  // LOCATION
  // =========================================

  const locationText = [
    village,
    district,
    state,
  ]
    .filter(Boolean)
    .join(", ");


  // =========================================
  // TEMPLE NAME
  // =========================================

  const displayTempleName =
    templeName
      .replace(/temple/i, "")
      .trim() ||
    "Kanaka Durgamma";


  // =========================================
  // BACK TO TOP
  // =========================================

  const handleScrollTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  return (

    <footer className="site-footer">


      {/* =========================================
          MAIN
      ========================================= */}

      <div className="footer-main">

        <div className="footer-container">


          {/* =====================================
              TEMPLE IDENTITY
          ===================================== */}

          <div className="footer-brand">

            <div className="footer-logo">

              <span className="footer-logo-symbol">
                ॐ
              </span>


              <div>

                <strong>
                  {loading
                    ? "Kanaka Durgamma"
                    : displayTempleName}
                </strong>


                <span>
                  {t.footer.temple}
                </span>

              </div>

            </div>


            <p>
              {loading
                ? t.footer.loading
                : description}
            </p>


            <div className="footer-location">

              <MapPin size={14} />

              <span>
                {loading
                  ? t.footer.loadingLocation
                  : locationText}
              </span>

            </div>

          </div>


          {/* =====================================
              NAVIGATION
          ===================================== */}

          <div className="footer-column">

            <h3>
              {t.footer.explore}
            </h3>


            <a href="#about">
              {t.footer.about}
            </a>


            <a href="#history">
              {t.footer.history}
            </a>


            <a href="#pillars">
              {t.footer.pillars}
            </a>


            <a href="#village">
              {t.footer.village}
            </a>

          </div>


          {/* =====================================
              TEMPLE
          ===================================== */}

          <div className="footer-column">

            <h3>
              {t.footer.templeColumn}
            </h3>


            <a href="#dasara-section">
              {t.footer.dasara}
            </a>


            <a href="#gallery">
              {t.footer.gallery}
            </a>


            <a href="#donate">
              {t.footer.donate}
            </a>


            <a href="#deeksha">
              {t.footer.deeksha}
            </a>

          </div>


          {/* =====================================
              CONTACT
          ===================================== */}

          <div className="footer-column footer-contact">

            <h3>
              {t.footer.contact}
            </h3>


            <div>

              <Phone size={14} />

              <span>
                {loading
                  ? t.footer.loadingShort
                  : phone}
              </span>

            </div>


            <a href="#contact">
              {t.footer.visitTemple}
            </a>

          </div>


        </div>

      </div>


      {/* =========================================
          BOTTOM
      ========================================= */}

      <div className="footer-bottom">

        <div className="footer-bottom-container">


          <span>

            © 2026 {displayTempleName}.
            {` ${t.footer.allRightsReserved}`}

          </span>


          <span className="footer-made-with">

            {t.footer.madeWith}

            <Heart
              size={12}
              fill="currentColor"
            />

            {t.footer.forOurTemple}

          </span>


          <button
            type="button"
            className="footer-top-button"
            onClick={handleScrollTop}
            aria-label={t.footer.backToTop}
          >

            <ArrowUp size={15} />

          </button>


        </div>

      </div>


    </footer>
  );
}


export default Footer;