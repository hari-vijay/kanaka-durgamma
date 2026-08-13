import { useEffect, useState } from "react";
import "./../styles/updates-page.css";
import {
  ArrowLeft,
  CalendarDays,
  Newspaper,
} from "lucide-react";

import { Link } from "react-router-dom";

import "../styles/updates.css";


function UpdatesPage() {

  const [updates, setUpdates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =========================================
     FETCH ACTIVE UPDATES
  ========================================= */

  useEffect(() => {

    const fetchUpdates = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await fetch(
            "http://localhost:8080/api/updates"
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


      } catch (err) {

        console.error(
          "Updates fetch error:",
          err
        );

        setError(
          "Unable to load temple updates."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchUpdates();

  }, []);


  return (

    <main className="updates-page">


      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <section className="updates-page-header">

        <div className="updates-page-header-inner">


          <Link
            to="/"
            className="updates-back-link"
          >

            <ArrowLeft size={16} />

            Back to Home

          </Link>


          <div className="section-eyebrow">

            <Newspaper size={15} />

            Temple Updates

          </div>


          <h1>
            Today's
            <span> Updates</span>
          </h1>


          <p>

            Stay informed about temple
            activities, Dasara celebrations,
            poojas and important announcements.

          </p>

        </div>

      </section>


      {/* =====================================
          CONTENT
      ===================================== */}

      <section className="updates-page-content">

        <div className="updates-page-container">


          {/* Loading */}

          {loading && (

            <div className="updates-state">

              Loading temple updates...

            </div>

          )}


          {/* Error */}

          {!loading &&
            error && (

              <div className="updates-state updates-error">

                {error}

              </div>

            )}


          {/* Empty */}

          {!loading &&
            !error &&
            updates.length === 0 && (

              <div className="updates-state">

                <Newspaper size={28} />

                <strong>
                  No temple updates available.
                </strong>

                <span>
                  Please check again later.
                </span>

              </div>

            )}


          {/* Updates */}

          {!loading &&
            !error &&
            updates.length > 0 && (

              <div className="updates-page-list">

                {updates.map(
                  (update) => (

                    <article
                      className="update-page-card"
                      key={update.id}
                    >


                      {/* DATE */}

                      <div className="update-card-date">

                        <CalendarDays
                          size={16}
                        />

                        <span>

                          {update.createdAt
                            ? new Date(
                                update.createdAt
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "—"}

                        </span>

                      </div>


                      {/* CONTENT */}

                      <div className="update-card-content">


                        {update.category && (

                          <span className="update-category">

                            {update.category}

                          </span>

                        )}


                        <h2>

                          {update.title}

                        </h2>


                        <p>

                          {update.description ||
                            "No description available."}

                        </p>


                      </div>

                    </article>

                  )
                )}

              </div>

            )}

        </div>

      </section>

    </main>

  );

}


export default UpdatesPage;