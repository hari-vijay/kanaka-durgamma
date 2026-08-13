import {
  UsersRound,
  Heart,
  Quote,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useLanguage } from "../context/LanguageContext";


function TemplePillars() {

  const [pillars, setPillars] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { t } = useLanguage();


  useEffect(() => {

    fetch(
      "http://localhost:8080/api/temple/pillars"
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to fetch temple pillars"
          );
        }

        return response.json();

      })
      .then((data) => {

        console.log(
          "Temple pillars from MySQL:",
          data
        );

        setPillars(
          Array.isArray(data)
            ? data
            : []
        );

      })
      .catch((error) => {

        console.error(
          "Temple pillars fetch failed:",
          error
        );

        setPillars([]);

      })
      .finally(() => {

        setLoading(false);

      });

  }, []);


  return (
    <section
      id="pillars"
      className="temple-pillars"
    >

      {/* =========================================
          HEADING
      ========================================= */}

      <div className="section-heading pillars-heading">

        <div className="section-eyebrow">

          <UsersRound size={15} />

          {t.pillars.eyebrow}

        </div>


        <h2>

          {t.pillars.headingBefore}

          <span>
            {" "}{t.pillars.headingHighlight}
          </span>

        </h2>


        <p>

          {t.pillars.description}

        </p>

      </div>


      {/* =========================================
          QUOTE
      ========================================= */}

      <div className="pillars-quote">

        <Quote size={22} />

        <p>

          {t.pillars.quote}

        </p>

      </div>


      {/* =========================================
          PILLARS
      ========================================= */}

      <div className="pillars-grid">

        {loading ? (

          <p>
            {t.pillars.loading}
          </p>

        ) : pillars.length === 0 ? (

          <p>
            {t.pillars.noMembers}
          </p>

        ) : (

          pillars.map((pillar) => (

            <article
              className="pillar-card"
              key={pillar.id}
            >

              {/* =========================================
                  PHOTO
              ========================================= */}

              <div className="pillar-photo">

                {pillar.photoPath ? (

                  <img
                    src={`http://localhost:8080/api/temple/pillars/${pillar.id}/photo`}
                    alt={
                      pillar.name ||
                      t.pillars.templeMember
                    }
                  />

                ) : (

                  <div className="pillar-photo-placeholder">

                    <UsersRound size={32} />

                    <span>
                      {t.pillars.photo}
                    </span>

                  </div>

                )}

              </div>


              {/* =========================================
                  CONTENT
              ========================================= */}

              <div className="pillar-content">

                <span className="pillar-role">
                  {pillar.role}
                </span>


                <h3>
                  {pillar.name}
                </h3>


                <p>
                  {pillar.description}
                </p>


                <div className="pillar-divider" />


                <div className="pillar-service">

                  <Heart size={14} />

                  <span>
                    {t.pillars.dedicatedService}
                  </span>

                </div>

              </div>

            </article>

          ))

        )}

      </div>

    </section>
  );
}


export default TemplePillars;