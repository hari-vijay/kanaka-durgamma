import { useEffect, useState } from "react";

import {
  CalendarDays,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";

function DasaraSection() {

  const { t } = useLanguage();


  const [selectedDay, setSelectedDay] =
    useState(null);

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


        /* =========================================
           SORT BY DATE
        ========================================= */

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
          t.dasara.errors.load
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
      t.dasara.days.dayOne,
      t.dasara.days.dayTwo,
      t.dasara.days.dayThree,
      t.dasara.days.dayFour,
      t.dasara.days.dayFive,
      t.dasara.days.daySix,
      t.dasara.days.daySeven,
      t.dasara.days.dayEight,
      t.dasara.days.dayNine,
    ];


    return (
      titles[dayNumber - 1] ||
      t.dasara.dayFallback.replace("{day}", dayNumber)
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


  /* =========================================
     CREATE 9 DASARA DAYS
  ========================================= */

  const days = Array.from(
    {
      length: 9,
    },
    (_, index) => {

      const dayNumber =
        index + 1;

      const item =
        scheduleItems[index];


      return {

        day:
          dayNumber,

        title:
          getDayTitle(
            dayNumber
          ),

        subtitle:
          item?.title ||
          t.dasara.comingSoon,

        status:
          item
            ? getDayStatus(item)
            : "upcoming",

        description:
          item?.description ||
          "",

        date:
          item?.date ||
          "",

        startTime:
          item?.startTime ||
          "",

        endTime:
          item?.endTime ||
          "",

        category:
          item?.category ||
          "",

      };

    }
  );


  /* =========================================
     SELECT DAY
  ========================================= */

  const handleDayClick = (day) => {

    /*
      If the same card is clicked again,
      close the details.
    */

    if (
      selectedDay?.day === day.day
    ) {

      setSelectedDay(null);

      return;

    }


    setSelectedDay(day);

  };


  return (

    <section
      className="section dasara-section"
      id="dasara-section"
    >

      <div className="container">


        {/* =========================================
            HEADING
        ========================================= */}

        <div className="section-heading dasara-heading">

          <div className="section-eyebrow">

            <Sparkles size={15} />

            {t.dasara.eyebrow}

          </div>


          <h2>

            {t.dasara.headingBefore}

            <span>
              {" "}{t.dasara.headingHighlight}
            </span>

          </h2>


          <p>

            {t.dasara.description}

          </p>

        </div>


        {/* =========================================
            FESTIVAL INFO
        ========================================= */}

        <div className="dasara-info">


          <div className="dasara-info-item">

            <CalendarDays size={19} />

            <div>

              <span>
                {t.dasara.info.festivalLabel}
              </span>

              <strong>
                {t.dasara.info.festivalValue}
              </strong>

            </div>

          </div>


          <div className="dasara-info-item">

            <Sparkles size={19} />

            <div>

              <span>
                {t.dasara.info.durationLabel}
              </span>

              <strong>
                {t.dasara.info.durationValue}
              </strong>

            </div>

          </div>


          <Link
  to="/dasara-schedule"
  className="dasara-details-link"
>
  {t.dasara.viewFullSchedule}
  <ArrowRight size={16} />
</Link>

        </div>


        {/* =========================================
            LOADING
        ========================================= */}

        {loading && (

          <div
            className="dasara-loading"
            aria-live="polite"
          >

            {t.dasara.loading}

          </div>

        )}


        {/* =========================================
            ERROR
        ========================================= */}

        {!loading && error && (

          <div
            className="dasara-loading"
          >

            {error}

          </div>

        )}


        {/* =========================================
            DAYS
        ========================================= */}

        {!loading && (

          <div className="dasara-days">

            {days.map(
              (day) => (

                <button
                  type="button"

                  className={`dasara-day-card ${
                    day.status
                  } ${
                    selectedDay?.day === day.day
                      ? "selected"
                      : ""
                  }`}

                  key={day.day}

                  onClick={() =>
                    handleDayClick(day)
                  }
                >


                  {/* DAY NUMBER */}

                  <div className="dasara-day-number">

                    {String(
                      day.day
                    ).padStart(
                      2,
                      "0"
                    )}

                  </div>


                  {/* DAY CONTENT */}

                  <div className="dasara-day-content">

                    <span>
                      {day.title}
                    </span>

                    <strong>
                      {day.subtitle}
                    </strong>

                  </div>


                  {/* TODAY */}

                  {day.status ===
                    "today" && (

                    <div className="dasara-today-badge">

                      {t.dasara.todayBadge}

                    </div>

                  )}

                </button>

              )
            )}

          </div>

        )}


        {/* =========================================
            SELECTED DAY DETAILS
        ========================================= */}

        {selectedDay && (

          <div
            id="dasara-details"
            className="dasara-selected-detail"
          >


            {/* DETAIL HEADER */}

            <div className="dasara-selected-detail-header">

              <div>

                <span className="dasara-selected-eyebrow">

                  {selectedDay.category ||
                    "DASARA EVENT"}

                </span>


                <h3>
                  {selectedDay.subtitle}
                </h3>

              </div>


              <button
                type="button"
                className="dasara-detail-close"

                onClick={() =>
                  setSelectedDay(null)
                }

                aria-label={t.dasara.closeDetails}
              >

                ×

              </button>

            </div>


            {/* DETAIL META */}

            <div className="dasara-selected-meta">


              {selectedDay.date && (

                <div>

                  <CalendarDays size={16} />

                  <span>

                    {new Date(
                      `${selectedDay.date}T00:00:00`
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}

                  </span>

                </div>

              )}


              {(selectedDay.startTime ||
                selectedDay.endTime) && (

                <div>

                  <Sparkles size={16} />

                  <span>

                    {selectedDay.startTime ||
                      "—"}

                    {selectedDay.endTime
                      ? ` – ${selectedDay.endTime}`
                      : ""}

                  </span>

                </div>

              )}

            </div>


            {/* DESCRIPTION */}

            {selectedDay.description && (

              <p className="dasara-selected-description">

                {selectedDay.description}

              </p>

            )}

          </div>

        )}

      </div>

    </section>

  );

}


export default DasaraSection;
