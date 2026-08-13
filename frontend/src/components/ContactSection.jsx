import {
  MapPin,
  Phone,
  Clock3,
  Navigation,
  ArrowRight,
} from "lucide-react";

import { useTemple } from "../context/TempleContext";
import { useLanguage } from "../context/LanguageContext";
import mapImage from "../assets/maps.png";


function ContactSection() {
  const {
    templeInfo,
    loading,
    error,
  } = useTemple();

  const { t } = useLanguage();


  console.log(
    "Contact temple data from MySQL:",
    templeInfo
  );


  const templeName =
    templeInfo?.templeName ||
    "Kanaka Durgamma Temple";


  const village =
    templeInfo?.village ||
    t.contact.villageDefault;


  const district =
    templeInfo?.district ||
    t.contact.districtDefault;


  const state =
    templeInfo?.state ||
    "Andhra Pradesh";


  const phone =
    templeInfo?.phone ||
    t.contact.phoneUnavailable;


  const openingTime =
    templeInfo?.openingTime ||
    "";


  const closingTime =
    templeInfo?.closingTime ||
    "";


  const specialTimings =
    templeInfo?.specialTimings ||
    "";


  const address = [
    village,
    district,
    state,
    "India",
  ]
    .filter(Boolean)
    .join(", ");


  const mapQuery = encodeURIComponent(
    `${templeName}, ${address}`
  );


  const mapsUrl =
  templeInfo?.locationUrl ||
  "https://maps.app.goo.gl/Bb97KHDbTkndVCMUA";


  return (
    <section
      className="section contact-section"
      id="contact"
    >
      <div className="container">

        {/* =========================================
            HEADING
        ========================================= */}

        <div className="section-heading contact-heading">

          <div className="section-eyebrow">

            <MapPin size={15} />

            {t.contact.eyebrow}

          </div>

          <h2>

            {t.contact.headingBefore}

            <span>
              {" "}{t.contact.headingHighlight}
            </span>

          </h2>

          <p>

            {t.contact.welcomeBefore}{" "}

            {templeName}

            {" "}{t.contact.welcomeAfter}

          </p>

        </div>


        {/* =========================================
            LOADING
        ========================================= */}

        {loading && (
          <div className="contact-loading">
            {t.contact.loading}
          </div>
        )}


        {/* =========================================
            ERROR
        ========================================= */}

        {!loading && error && (
          <div className="contact-loading">
            {error}
          </div>
        )}


        {/* =========================================
            MAIN LAYOUT
        ========================================= */}

        {!loading && (

          <div className="contact-layout">

            {/* =====================================
                MAP
            ===================================== */}

            <div className="contact-map">

              <div className="contact-map-placeholder">

               <img
  src={mapImage}
  alt="Temple location map"
  className="contact-map-image"
/>

                <div className="contact-map-info">

                  <MapPin size={42} />

                  <strong>
                    {templeName}
                  </strong>

                  <span>
                    {address}
                  </span>

                </div>

              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-map-button"
              >

                <Navigation size={15} />

                {t.contact.getDirections}

              </a>

            </div>


            {/* =====================================
                DETAILS
            ===================================== */}

            <div className="contact-details">


              {/* =================================
                  ADDRESS
              ================================= */}

              <div className="contact-detail-card">

                <div className="contact-detail-icon">

                  <MapPin size={19} />

                </div>

                <div>

                  <span>
                    {t.contact.addressTitle}
                  </span>

                  <strong>
                    {templeName}
                  </strong>

                  <p>
                    {address}
                  </p>

                </div>

              </div>


              {/* =================================
                  PHONE
              ================================= */}

              <div className="contact-detail-card">

                <div className="contact-detail-icon">

                  <Phone size={19} />

                </div>

                <div>

                  <span>
                    {t.contact.contactTitle}
                  </span>

                  <strong>
                    {phone}
                  </strong>

                  <p>
                    {t.contact.contactDescription}
                  </p>

                </div>

              </div>


              {/* =================================
                  TIMINGS
              ================================= */}

              <div className="contact-detail-card">

                <div className="contact-detail-icon">

                  <Clock3 size={19} />

                </div>

                <div>

                  <span>
                    {t.contact.timingsTitle}
                  </span>

                  <strong>

                    {openingTime && closingTime
                      ? `${openingTime} – ${closingTime}`
                      : t.contact.timingsUnavailable}

                  </strong>

                  <p>

                    {specialTimings ||
                      t.contact.regularTimings}

                  </p>

                </div>

              </div>


              {/* =================================
                  CTA
              ================================= */}

              <a
                href="#about"
                className="contact-back-link"
              >

                {t.contact.learnMore}

                <ArrowRight size={16} />

              </a>

            </div>

          </div>

        )}

      </div>
    </section>
  );
}


export default ContactSection;