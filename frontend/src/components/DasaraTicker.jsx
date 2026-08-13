import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CircleDot,
  ArrowRight,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";


function DasaraTicker({
  variant = "hero",
}) {

  const isTopTicker =
    variant === "top";


  const [updates, setUpdates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  /* =========================================
     FETCH ACTIVE TEMPLE UPDATES
  ========================================= */

  useEffect(() => {

    const fetchUpdates = async () => {

      try {

        const response = await fetch(
          `${API_BASE_URL}/updates`
        );


        if (!response.ok) {

          throw new Error(
            "Failed to fetch updates"
          );

        }


        const data =
          await response.json();


        setUpdates(
          Array.isArray(data)
            ? data
            : []
        );


      } catch (error) {

        console.error(
          "Failed to load temple updates:",
          error
        );

        setUpdates([]);

      } finally {

        setLoading(false);

      }

    };


    fetchUpdates();

  }, []);


  /* =========================================
     NO DATA
  ========================================= */

  if (
    loading ||
    updates.length === 0
  ) {

    return null;

  }


  /* =========================================
     FORMAT UPDATE MESSAGE
  ========================================= */

  const getUpdateMessage =
    (update) => {

      if (
        update.description &&
        update.description.trim()
      ) {

        return `${update.title} — ${update.description}`;

      }

      return update.title;

    };


  /* =========================================
     TOP LIVE TICKER
  ========================================= */

  if (isTopTicker) {

    return (

      <section className="dasara-top-ticker">


        {/* LIVE */}

        <div className="dasara-top-label">

          <CircleDot size={12} />

          <span>
            LIVE
          </span>

        </div>


        {/* SCROLLING AREA */}

        <div className="dasara-top-window">

          <div className="dasara-top-track">


            {/* FIRST SET */}

            {updates.map(
              (update) => (

                <span
                  key={`top-${update.id}`}
                  className="dasara-top-item"
                >

                  {getUpdateMessage(update)}

                  <span className="top-ticker-separator">
                    ✦
                  </span>

                </span>

              )
            )}


            {/* DUPLICATE SET
                FOR SEAMLESS LOOP */}

            {updates.map(
              (update) => (

                <span
                  key={`top-copy-${update.id}`}
                  className="dasara-top-item"
                  aria-hidden="true"
                >

                  {getUpdateMessage(update)}

                  <span className="top-ticker-separator">
                    ✦
                  </span>

                </span>

              )
            )}

          </div>

        </div>


        {/* FESTIVAL */}

        <div className="dasara-top-festival">

          Dasara 2026

        </div>


      </section>

    );

  }


  /* =========================================
     HERO TICKER
  ========================================= */

  const latestUpdate =
    updates[0];


  const latestMessage =
    getUpdateMessage(
      latestUpdate
    );


  return (

    <section className="dasara-hero-ticker">


      {/* IMPORTANT:
          THIS WRAPPER MAKES THE HERO
          ELEMENTS STAY IN ONE ROW */}

      <div className="dasara-hero-container">


        {/* DASARA LABEL */}

        <div className="dasara-hero-label">

          Dasara 2026

        </div>


        {/* LIVE */}

        <div className="dasara-hero-live">

          <CircleDot size={12} />

          <span>
            LIVE
          </span>

        </div>


        {/* LATEST UPDATE */}

        <div className="dasara-hero-message">

          <span>
            {latestMessage}
          </span>

        </div>





    {/* VIEW ALL */}

    <Link
      to="/updates"
      className="dasara-hero-link"
    >

      <span>
        View All Updates
      </span>

      <ArrowRight size={15} />

    </Link>


  </div>

</section>

);

}

export default DasaraTicker;