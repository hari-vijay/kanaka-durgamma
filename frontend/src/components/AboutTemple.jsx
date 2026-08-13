import {
  MapPin,
  Heart,
  UsersRound,
  ArrowRight,
} from "lucide-react";



import { useTemple } from "../context/TempleContext";
import { useLanguage } from "../context/LanguageContext";



function AboutTemple() {
  const {
    templeInfo,
    loading,
    error,
  } = useTemple();


  const { t } = useLanguage();



  console.log(
    "Temple data from MySQL:",
    templeInfo
  );



  /* =========================================
     TEMPLE INFORMATION
  ========================================= */



  const templeName =
    templeInfo?.templeName?.trim() ||
    "Kanaka Durgamma Temple";



  const description =
    templeInfo?.description?.trim() ||
    t.about.descriptionDefault;



  /* =========================================
     LOCATION
  ========================================= */



  const villageName =
    templeInfo?.village?.trim() ||
    templeInfo?.villageName?.trim() ||
    t.about.villageDefault;



  const locationParts = [
    templeInfo?.district?.trim(),
    templeInfo?.state?.trim(),
  ].filter(Boolean);



  const villageDescription =
    locationParts.length > 0
      ? locationParts.join(", ")
      : t.about.villageDescriptionDefault;



  /* =========================================
     HISTORY

     TempleSettings currently does not contain
     a dedicated history field.
  ========================================= */



  const history =
    templeInfo?.history?.trim() ||
    t.about.historyDefault;



  /* =========================================
     DISPLAY TEMPLE NAME
  ========================================= */



  const displayTempleName =
    templeName
      .replace(/temple/gi, "")
      .trim() || "Kanaka Durgamma";


  const aboutImageUrl =
    "http://localhost:8080/api/temple/settings/image/about";



  return (
    <section
      className="section about-section"
      id="about"
    >
      <div className="container">



        {/* =========================================
            IMAGE
        ========================================= */}



        <div className="about-temple-container">



          <div className="about-temple-image">



            <div className="about-image-placeholder">

              {templeInfo?.aboutImagePath ? (

                <img
                  src={aboutImageUrl}
                  alt="About Temple"
                  className="about-real-image"
                />

              ) : (

                <span>
                  {t.about.templePhoto}
                </span>

              )}

            </div>



            <div className="about-image-badge">



              <strong>
                {displayTempleName}
              </strong>



              <span>
                {t.about.temple}
              </span>



            </div>



          </div>



          {/* =========================================
              CONTENT
          ========================================= */}



          <div className="about-temple-content">



            {/* EYEBROW */}



            <div className="section-eyebrow">



              <Heart size={15} />



              {t.about.eyebrow}
            </div>



            {/* HEADING */}



            <h2>
              {t.about.headingBefore}
              <span>
                {" "}{t.about.headingHighlight}
              </span>
            </h2>



            {/* DESCRIPTION */}



            <p className="about-lead">



              {loading
                ? t.about.loading
                : description}



            </p>



            {/* ERROR */}



            {!loading && error && (



              <p className="about-description">
                {error}
              </p>



            )}



            {/* HISTORY */}



            {!loading && !error && (



              <p className="about-description">
                {history}
              </p>



            )}



            {/* =========================================
                HIGHLIGHTS
            ========================================= */}



            <div className="about-highlights">



              {/* VILLAGE */}



              <div className="about-highlight">



                <div className="about-highlight-icon">



                  <MapPin size={18} />



                </div>



                <div>



                  <strong>
                    {loading
                      ? t.about.loadingShort
                      : villageName}
                  </strong>



                  <span>
                    {loading
                      ? t.about.loadingLocation
                      : villageDescription}
                  </span>



                </div>



              </div>



              {/* TRADITION */}



              <div className="about-highlight">



                <div className="about-highlight-icon">



                  <Heart size={18} />



                </div>



                <div>



                  <strong>
                    {t.about.traditionTitle}
                  </strong>



                  <span>
                    {t.about.traditionDescription}
                  </span>



                </div>



              </div>



              {/* COMMUNITY */}



              <div className="about-highlight">



                <div className="about-highlight-icon">



                  <UsersRound size={18} />



                </div>



                <div>



                  <strong>
                    {t.about.communityTitle}
                  </strong>



                  <span>
                    {t.about.communityDescription}
                  </span>



                </div>



              </div>



            </div>



            {/* HISTORY LINK */}



            <a
              href="#history"
              className="about-history-link"
            >



              {t.about.historyLink}



              <ArrowRight size={16} />



            </a>



          </div>



        </div>



      </div>
    </section>
  );
}



export default AboutTemple;