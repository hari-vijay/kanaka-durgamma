import {
  ArrowLeft,
  Images,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { getGalleryItems } from "../services/templeApi";
import "../styles/gallery-page.css";


function GalleryPage() {
  const [galleryItems, setGalleryItems] =
    useState([]);

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedItem, setSelectedItem] =
    useState(null);


  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getGalleryItems();

        setGalleryItems(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (requestError) {

        console.error(
          "Full gallery fetch failed:",
          requestError
        );

        setError(
          "Unable to load the temple gallery."
        );

      } finally {

        setLoading(false);

      }
    };


    loadGallery();

  }, []);


  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const itemId =
      params.get("item");

    if (!itemId) {
      return;
    }

    const numericId =
      Number(itemId);

    if (!Number.isFinite(numericId)) {
      return;
    }

    const matchingItem =
      galleryItems.find(
        (item) =>
          Number(item.id) === numericId
      );

    if (matchingItem) {
      setSelectedItem(matchingItem);
    }

  }, [galleryItems]);


  const filters = [
    "All",
    "Temple",
    "Dasara",
    "Deeksha",
    "Festival",
    "Videos",
  ];


  const filteredItems =
    useMemo(() => {

      if (activeFilter === "All") {
        return galleryItems;
      }

      if (activeFilter === "Videos") {
        return galleryItems.filter(
          (item) =>
            item.mediaType?.toLowerCase() ===
            "video"
        );
      }

      return galleryItems.filter(
        (item) =>
          item.category?.toLowerCase() ===
          activeFilter.toLowerCase()
      );

    }, [
      activeFilter,
      galleryItems,
    ]);


  const getMediaUrl = (filePath) => {

    if (!filePath) {
      return "";
    }

    if (
      filePath.startsWith("http://") ||
      filePath.startsWith("https://")
    ) {
      return filePath;
    }

    return `http://localhost:8080${filePath}`;
  };


  return (
    <main className="full-gallery-page">

      <section className="full-gallery-container">

        <div className="full-gallery-topbar">

          <Link
            to="/"
            className="full-gallery-back"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

        </div>


        <header className="full-gallery-header">

          <div className="section-eyebrow">
            <Images size={15} />
            Temple Gallery
          </div>

          <h1>
            Moments of
            <span> Devotion</span>
          </h1>

          <p>
            Browse all temple photos, Dasara
            celebrations, Deeksha moments,
            festivals and videos.
          </p>

        </header>


        <div
          className="full-gallery-filters"
          role="tablist"
          aria-label="Gallery filters"
        >

          {filters.map((filter) => (

            <button
              type="button"
              key={filter}
              className={`full-gallery-filter ${
                activeFilter === filter
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveFilter(filter)
              }
              aria-pressed={
                activeFilter === filter
              }
            >
              {filter}
            </button>

          ))}

        </div>


        {loading && (
          <div className="full-gallery-state">
            Loading gallery...
          </div>
        )}


        {!loading && error && (
          <div className="full-gallery-state error">
            {error}
          </div>
        )}


        {!loading &&
          !error &&
          filteredItems.length === 0 && (
            <div className="full-gallery-state">
              No gallery items found.
            </div>
          )}


        {!loading &&
          !error &&
          filteredItems.length > 0 && (

            <div className="full-gallery-grid">

              {filteredItems.map((item) => {

                const mediaType =
                  item.mediaType?.toLowerCase();

                const mediaUrl =
                  getMediaUrl(
                    item.filePath
                  );

                const isVideo =
                  mediaType === "video";


                return (
                  <article
                    className="full-gallery-card"
                    key={item.id}
                    onClick={() =>
                      setSelectedItem(item)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();
                        setSelectedItem(item);
                      }
                    }}
                    aria-label={
                      item.title
                        ? `Open ${item.title}`
                        : "Open gallery item"
                    }
                  >

                    <div className="full-gallery-media">

                      {isVideo ? (

                        mediaUrl ? (
                          <video
                            src={mediaUrl}
                            controls
                            preload="metadata"
                            className="full-gallery-real-media"
                          />
                        ) : (
                          <div className="full-gallery-placeholder">
                            <div className="full-gallery-play">
                              <Play
                                size={20}
                                fill="currentColor"
                              />
                            </div>
                            <span>
                              Video
                            </span>
                          </div>
                        )

                      ) : (

                        mediaUrl ? (
                          <img
                            src={mediaUrl}
                            alt={
                              item.title ||
                              "Temple gallery"
                            }
                            className="full-gallery-real-media"
                            loading="lazy"
                          />
                        ) : (
                          <div className="full-gallery-placeholder">
                            <Images size={30} />
                            <span>
                              Photo
                            </span>
                          </div>
                        )

                      )}


                      <div className="full-gallery-overlay">

                        <span>
                          {item.category ||
                            "Temple"}
                        </span>

                        <strong>
                          {item.title ||
                            "Temple Moment"}
                        </strong>

                        {item.description && (
                          <p>
                            {item.description}
                          </p>
                        )}

                      </div>

                    </div>

                  </article>
                );

              })}

            </div>

          )}


        {selectedItem && (
          <div
            className="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery preview"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setSelectedItem(null);
              }
            }}
          >

            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={() =>
                setSelectedItem(null)
              }
              aria-label="Close gallery preview"
            >
              ×
            </button>


            <div className="gallery-lightbox-content">

              {selectedItem.mediaType?.toLowerCase() ===
              "video" ? (

                <video
                  src={getMediaUrl(
                    selectedItem.filePath
                  )}
                  controls
                  autoPlay
                  className="gallery-lightbox-media"
                />

              ) : (

                <img
                  src={getMediaUrl(
                    selectedItem.filePath
                  )}
                  alt={
                    selectedItem.title ||
                    "Temple gallery"
                  }
                  className="gallery-lightbox-media"
                />

              )}


              <div className="gallery-lightbox-info">

                <span>
                  {selectedItem.category ||
                    "Temple"}
                </span>

                <h2>
                  {selectedItem.title ||
                    "Temple Moment"}
                </h2>

                {selectedItem.description && (
                  <p>
                    {selectedItem.description}
                  </p>
                )}

              </div>

            </div>

          </div>
        )}

      </section>

    </main>
  );
}


export default GalleryPage;