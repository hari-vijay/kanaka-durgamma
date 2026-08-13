import { useEffect, useState } from "react";

import {
  ArrowLeft,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import "../styles/dasaraSchedule.css";


function DasaraSchedule() {

  const [scheduleItems, setScheduleItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =========================================
     FETCH DASARA SCHEDULE
  ========================================= */

  useEffect(() => {

    const fetchSchedule = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:8080/api/dasara-schedule"
        );


        if (!response.ok) {

          throw new Error(
            "Failed to fetch Dasara schedule"
          );

        }


        const data =
          await response.json();


        const activeItems =
          Array.isArray(data)
            ? data.filter(
                (item) =>
                  item.active !== false
              )
            : [];


        activeItems.sort(
          (a, b) => {

            const dateA =
              a.date || "";

            const dateB =
              b.date || "";

            return dateA.localeCompare(
              dateB
            );

          }
        );


        setScheduleItems(
          activeItems.slice(0, 9)
        );

      } catch (err) {

        console.error(
          "Dasara schedule fetch error:",
          err
        );

        setError(
          "Unable to load Dasara schedule."
        );

        setScheduleItems([]);

      } finally {

        setLoading(false);

      }

    };


    fetchSchedule();

  }, []);


  /* =========================================
     DAY NAME
  ========================================= */

  const getDayTitle = (dayNumber) => {

    const titles = [
      "Day One",
      "Day Two",
      "Day Three",
      "Day Four",
      "Day Five",
      "Day Six",
      "Day Seven",
      "Day Eight",
      "Day Nine",
    ];


    return (
      titles[dayNumber - 1] ||
      `Day ${dayNumber}`
    );

  };


  /* =========================================
     STATUS
  ========================================= */

  const getDayStatus = (item) => {

    if (!item?.date) {
      return "upcoming";
    }


    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );


    const itemDate =
      new Date(
        `${item.date}T00:00:00`
      );

    itemDate.setHours(
      0,
      0,
      0,
      0
    );


    if (
      itemDate.getTime() <
      today.getTime()
    ) {

      return "completed";

    }


    if (
      itemDate.getTime() ===
      today.getTime()
    ) {

      return "today";

    }


    return "upcoming";

  };


  return (

    <section className="dasara-schedule-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="dasara-schedule-header">

        <div className="container">

          <Link
            to="/"
            className="dasara-back-home"
          >

            <ArrowLeft size={17} />

            Back to Home

          </Link>


          <div className="dasara-page-eyebrow">

            <Sparkles size={15} />

            DASARA FESTIVAL

          </div>


          <h1>
            Nine Days of{" "}
            <span>Divine Celebration</span>
          </h1>


          <p>
            Explore the complete Dasara schedule,
            including poojas, alankarams and
            special temple celebrations.
          </p>

        </div>

      </div>


      {/* =========================================
          CONTENT
      ========================================= */}

      <main className="dasara-schedule-content">

        <div className="container">


          {/* LOADING */}

          {loading && (

            <div className="dasara-schedule-state">

              Loading Dasara schedule...

            </div>

          )}


          {/* ERROR */}

          {!loading && error && (

            <div className="dasara-schedule-state">

              {error}

            </div>

          )}


          {/* NO DATA */}

          {!loading &&
            !error &&
            scheduleItems.length === 0 && (

              <div className="dasara-schedule-state">

                No Dasara schedule available.

              </div>

            )}


          {/* =========================================
              SCHEDULE CARDS
          ========================================= */}

          {!loading &&
            !error &&
            scheduleItems.length > 0 && (

              <div className="dasara-schedule-list">

                {scheduleItems.map(
                  (item, index) => {

                    const status =
                      getDayStatus(item);


                    return (

                      <article
                        className={`dasara-schedule-card ${status}`}
                        key={item.id}
                      >


                        {/* DAY NUMBER */}

                        <div className="dasara-schedule-day">

                          <span className="dasara-schedule-number">

                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}

                          </span>


                          <span className="dasara-schedule-day-name">

                            {getDayTitle(
                              index + 1
                            )}

                          </span>

                        </div>


                        {/* CONTENT */}

                        <div className="dasara-schedule-main">

                          {item.category && (

                            <span className="dasara-schedule-category">

                              {item.category}

                            </span>

                          )}


                          <h2>
                            {item.title}
                          </h2>


                          {item.description && (

                            <p>
                              {item.description}
                            </p>

                          )}


                          <div className="dasara-schedule-meta">


                            {item.date && (

                              <span>

                                <CalendarDays
                                  size={15}
                                />

                                {new Date(
                                  `${item.date}T00:00:00`
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}

                              </span>

                            )}


                            {(item.startTime ||
                              item.endTime) && (

                              <span>

                                <Sparkles
                                  size={15}
                                />

                                {item.startTime ||
                                  "—"}

                                {item.endTime
                                  ? ` – ${item.endTime}`
                                  : ""}

                              </span>

                            )}

                          </div>

                        </div>


                        {/* STATUS */}

                        <div
                          className={`dasara-schedule-status ${status}`}
                        >

                          {status === "today"
                            ? "TODAY"
                            : status ===
                              "completed"
                            ? "COMPLETED"
                            : "UPCOMING"}

                        </div>

                      </article>

                    );

                  }
                )}

              </div>

            )}

        </div>

      </main>

    </section>

  );

}


export default DasaraSchedule;