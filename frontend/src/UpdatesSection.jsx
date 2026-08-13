import { useEffect, useState } from "react";
import {
  CalendarDays,
  Newspaper,
} from "lucide-react";

import "./styles/updates.css";

function UpdatesSection() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:8080/api/updates"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch updates"
          );
        }

        const data = await response.json();

        setUpdates(data);
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
    <section
      id="updates"
      className="updates-section"
    >
      <div className="updates-container">

        {/* Heading */}

        <div className="section-heading updates-heading">

          {/* <div className="section-eyebrow">
            <Newspaper size={15} />
            Temple Updates
          </div>

          <h2>
            Latest
            <span> Updates</span>
          </h2>

          <p>
            Stay informed about temple activities,
            Dasara celebrations, poojas and important
            announcements.
          </p> */}

        </div>


        {/* Loading */}

        {loading && (
          <div className="updates-state">
            Loading temple updates...
          </div>
        )}


        {/* Error */}

        {!loading && error && (
          <div className="updates-state updates-error">
            {error}
          </div>
        )}


        {/* No Updates */}

        {!loading &&
          !error &&
          updates.length === 0 && (
            <div className="updates-state">
              No temple updates available.
            </div>
          )}


        {/* Updates */}

        {!loading &&
          !error &&
          updates.length > 0 && (
            <div className="updates-list">

              {updates.map((update) => (
                <article
                  className="update-card"
                  key={update.id}
                >

                  <div className="update-card-date">

                    <CalendarDays size={16} />

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


                  <div className="update-card-content">

                    {update.category && (
                      <span className="update-category">
                        {update.category}
                      </span>
                    )}

                    <h3>
                      {update.title}
                    </h3>

                    <p>
                      {update.description}
                    </p>

                  </div>

                </article>
              ))}

            </div>
          )}

      </div>
    </section>
  );
}

export default UpdatesSection;