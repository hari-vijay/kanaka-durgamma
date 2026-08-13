import {
  Clock3,
  MapPin,
  ArrowRight,
} from "lucide-react";


import { useTemple } from "../context/TempleContext";
import { useLanguage } from "../context/LanguageContext";


function Hero() {
  const {
    templeInfo,
    loading,
  } = useTemple();


  const { t } = useLanguage();


  const templeName =
    templeInfo?.templeName ||
    "Kanaka Durgamma Temple";


  // const displayTempleName =
  //   templeName
  //     .replace(/temple/gi, "")
  //     .trim() || "Kanaka Durgamma";


  const displayTempleName = t.common.templeName;

  const description =
    templeInfo?.description ||
    t.hero.descriptionDefault;


  const morningPooja =
    templeInfo?.morningPooja ||
    "06:00 AM - 07:00 AM";


  const afternoonPooja =
    templeInfo?.afternoonPooja ||
    "12:00 PM - 01:00 PM";


  const eveningAarti =
    templeInfo?.eveningAarti ||
    "06:30 PM - 07:30 PM";


  const specialTimings =
    templeInfo?.specialTimings ||
    "";


  const heroImageUrl =
    "http://localhost:8080/api/temple/settings/image/hero";


  return (
    <section className="hero">


      {/* =========================================
          BACKGROUND IMAGE
      ========================================= */}


      <div className="hero-background">


        <div className="hero-image-placeholder">


          {templeInfo?.heroImagePath ? (

            <img
              src={heroImageUrl}
              alt="Temple"
              className="hero-real-image"
            />

          ) : (

            <span>
              Temple Image
            </span>

          )}


        </div>


        <div className="hero-overlay" />


      </div>



      {/* =========================================
          HERO CONTAINER
      ========================================= */}


      <div className="hero-container">



        {/* =====================================
            HERO CONTENT
        ===================================== */}


        <div className="hero-content">


          <p className="hero-eyebrow">

            {t.hero.welcome}

          </p>



          <h1>


            {loading
              ? "Kanaka Durgamma"
              : displayTempleName}


            <span>

              {t.about.temple}

            </span>


          </h1>



          <p className="hero-tagline">

            {t.hero.tagline}

          </p>



          <p className="hero-description">


            {loading
              ? t.hero.loading
              : description}


          </p>



          {/* =================================
              ACTIONS
          ================================= */}


          <div className="hero-actions">


            <a
              href="#about"
              className="btn btn-primary hero-primary-button"
            >


              {t.hero.darshan}


              <ArrowRight size={17} />


            </a>



            <a
              href="#contact"
              className="btn btn-outline-gold hero-secondary-button"
            >


              <MapPin size={17} />


              {t.hero.planVisit}


            </a>


          </div>


        </div>



        {/* =====================================
            TEMPLE TIMINGS CARD
        ===================================== */}


        <div className="hero-timings">



          <div className="hero-timings-heading">


            <Clock3 size={20} />


            <h2>

              {t.hero.todayTimings}

            </h2>


          </div>



          {/* =================================
              MORNING POOJA
          ================================= */}


          <div className="timing-row">


            <span>

              {t.hero.morningPooja}

            </span>


            <strong>

              {morningPooja}

            </strong>


          </div>



          {/* =================================
              AFTERNOON POOJA
          ================================= */}


          <div className="timing-row">


            <span>

              {t.hero.afternoonPooja}

            </span>


            <strong>

              {afternoonPooja}

            </strong>


          </div>



          {/* =================================
              EVENING AARTI
          ================================= */}


          <div className="timing-row">


            <span>

              {t.hero.eveningAarti}

            </span>


            <strong>

              {eveningAarti}

            </strong>


          </div>



          {/* =================================
              SPECIAL TIMINGS
          ================================= */}


          {specialTimings && (


            <div className="timing-row">


              <span>

                {t.hero.specialTimings}

              </span>


              <strong>

                {specialTimings}

              </strong>


            </div>


          )}



          {/* =================================
              FULL TIMINGS
          ================================= */}


          <a
            href="#contact"
            className="hero-timings-button"
          >


            {t.hero.fullTimings}


          </a>


        </div>


      </div>


    </section>
  );
}


export default Hero;