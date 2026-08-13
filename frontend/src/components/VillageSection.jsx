import {
  MapPin,
  Landmark,
  UsersRound,
  ArrowRight,
} from "lucide-react";



import { useTemple } from "../context/TempleContext";
import { useLanguage } from "../context/LanguageContext";



function VillageSection() {
  const {
    templeInfo,
    loading,
    error,
  } = useTemple();


  const { t } = useLanguage();



  console.log(
    "Village temple data from MySQL:",
    templeInfo
  );



  const villageName =
    templeInfo?.village ||
    t.village.villageDefault;



  const district =
    templeInfo?.district ||
    t.village.districtDefault;



  const state =
    templeInfo?.state ||
    "Andhra Pradesh";



  const templeName =
    templeInfo?.templeName ||
    "Kanaka Durgamma Temple";



  const location =
    [
      villageName,
      district,
      state,
    ]
      .filter(Boolean)
      .join(", ");


  const villageImageUrl =
    "http://localhost:8080/api/temple/settings/image/village";



  return (
    <section
      className="section village-section"
      id="village"
    >



      <div className="container">



        {/* =========================================
            MAIN CONTAINER
        ========================================= */}



        <div className="village-container">




          {/* =====================================
              CONTENT
          ===================================== */}



          <div className="village-content">



            {/* Eyebrow */}



            <div className="section-eyebrow">



              <MapPin size={15} />



              {t.village.eyebrow}


            </div>




            {/* Heading */}



            <h2>



              {t.village.headingBefore}


              <span>
                {" "}{t.village.headingHighlight}
              </span>



            </h2>




            {/* Lead */}



            <p className="village-lead">



              {loading
                ? t.village.loadingInformation
                : `${t.village.leadBefore} ${templeName} ${t.village.leadMiddle} ${villageName}.`}



            </p>




            {/* Description */}



            <p className="village-description">



              {loading
                ? t.village.loadingDetails
                : `${villageName} ${t.village.descriptionBody} ${templeName} ${t.village.descriptionEnding}`}



            </p>




            {/* =================================
                ERROR
            ================================= */}



            {error && !loading && (



              <p className="village-description">
                {error}
              </p>



            )}




            {/* =================================
                HIGHLIGHTS
            ================================= */}



            <div className="village-highlights">




              {/* Location */}



              <div className="village-highlight">



                <div className="village-highlight-icon">



                  <MapPin size={18} />



                </div>



                <div>



                  <strong>
                    {t.village.locationTitle}
                  </strong>



                  <span>



                    {loading
                      ? t.village.loadingLocation
                      : location}



                  </span>



                </div>



              </div>




              {/* Heritage */}



              <div className="village-highlight">



                <div className="village-highlight-icon">



                  <Landmark size={18} />



                </div>



                <div>



                  <strong>
                    {t.village.heritageTitle}
                  </strong>



                  <span>
                    {t.village.heritagePrefix}{" "}
                    {villageName}
                    {t.village.heritageSuffix}
                  </span>



                </div>



              </div>




              {/* Community */}



              <div className="village-highlight">



                <div className="village-highlight-icon">



                  <UsersRound size={18} />



                </div>



                <div>



                  <strong>
                    {t.village.communityTitle}
                  </strong>



                  <span>
                    {t.village.communityDescription}
                  </span>



                </div>



              </div>



            </div>




            {/* =================================
                CTA
            ================================= */}



            <a
              href="#contact"
              className="village-link"
            >



              {t.village.visitLink}



              <ArrowRight size={16} />



            </a>



          </div>




          {/* =====================================
              VILLAGE IMAGE
          ===================================== */}



          <div className="village-image">



            <div className="village-image-placeholder">

              {templeInfo?.villageImagePath ? (

                <img
                  src={villageImageUrl}
                  alt="Village"
                  className="village-real-image"
                />

              ) : (

                <>

                  <MapPin size={42} />

                  <span>
                    {t.village.villagePhoto}
                  </span>

                </>

              )}



            </div>




            <div className="village-image-caption">



              <span>
                {t.village.homeLabel}
              </span>



              <strong>
                {templeName}
              </strong>



            </div>



          </div>




        </div>



      </div>



    </section>
  );
}



export default VillageSection;