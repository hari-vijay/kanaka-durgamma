import {
  Images,
  ArrowRight,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getGalleryItems } from "../services/templeApi";
import { useLanguage } from "../context/LanguageContext";

function GallerySection() {
  const { t } = useLanguage();

  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {

    const loadGallery = async () => {

      try {

        const data =
          await getGalleryItems();

        const imageItems = (
          Array.isArray(data)
            ? data
            : []
        ).filter(
          (item) =>
            item.mediaType?.toLowerCase() !== "video"
        );

        setGalleryItems(imageItems);

        console.log(
          "Public gallery image items:",
          imageItems
        );

      } catch (error) {

        console.error(
          "Gallery fetch failed:",
          error
        );

        setGalleryItems([]);

      } finally {

        setLoading(false);

      }

    };


    loadGallery();

  }, []);


  /* =========================================
     FILTERS
  ========================================= */

  const filters = [
    "All",
    "Temple",
    "Dasara",
    "Deeksha",
    "Festival",
  ];


  const filteredGalleryItems =
    useMemo(() => {

      if (activeFilter === "All") {
        return galleryItems;
      }


      return galleryItems.filter(
        (item) =>
          item.category?.trim().toLowerCase() ===
          activeFilter.toLowerCase()
      );

    }, [
      activeFilter,
      galleryItems,
    ]);


  /* =========================================
     ONLY FOUR IMAGES ON HOME SECTION
  ========================================= */

  const visibleGalleryItems =
    filteredGalleryItems.slice(0, 4);


  /* =========================================
     MEDIA URL
  ========================================= */

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

    <section
      className="gallery-section"
      id="gallery"
    >

      <div className="gallery-container">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="gallery-header">

          <div className="gallery-heading">

            <div className="section-eyebrow">

              <Images size={15} />

              {t.gallery.eyebrow}

            </div>


            <h2>

              {t.gallery.headingBefore}

              <span>
                {" "}{t.gallery.headingHighlight}
              </span>

            </h2>


            <p>
              {t.gallery.description}
            </p>

          </div>


          {/* =======================================
              FULL GALLERY LINK
          ======================================= */}

          <Link
            to="/gallery"
            className="gallery-view-all"
          >

            {t.gallery.viewFullGallery}

            <ArrowRight size={16} />

          </Link>

        </div>


        {/* =========================================
            FILTERS
        ========================================= */}

        <div
          className="gallery-filters"
          role="tablist"
          aria-label={t.gallery.categoriesLabel}
        >

          {filters.map((filter) => (

            <button
              key={filter}
              type="button"
              className={`gallery-filter ${
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

              {filter === "All"
                ? t.gallery.filters.all
                : filter === "Temple"
                  ? t.gallery.filters.temple
                  : filter === "Dasara"
                    ? t.gallery.filters.dasara
                    : filter === "Deeksha"
                      ? t.gallery.filters.deeksha
                      : t.gallery.filters.festival}

            </button>

          ))}

        </div>


        {/* =========================================
            GALLERY GRID
            HOME PAGE = MAXIMUM 4 IMAGES
        ========================================= */}

        <div
          className={`gallery-grid gallery-grid-count-${visibleGalleryItems.length}`}
        >

          {loading ? (

            <div className="gallery-state">
              {t.gallery.loading}
            </div>

          ) : visibleGalleryItems.length === 0 ? (

            <div className="gallery-state">
              {t.gallery.noImages}
            </div>

          ) : (

            visibleGalleryItems.map(
              (item) => {

                const mediaUrl =
                  getMediaUrl(
                    item.filePath
                  );


                return (
                  <article
                    className="gallery-card"
                    key={item.id}
                    onClick={() =>
                      window.location.href = `/gallery?item=${item.id}`
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();
                        window.location.href =
                          `/gallery?item=${item.id}`;
                      }
                    }}
                    aria-label={
                      item.title
                        ? `Open ${item.title}`
                        : t.gallery.openImage
                    }
                  >

                    <div className="gallery-media">

                      {mediaUrl ? (

                        <img
                          src={mediaUrl}
                          alt={
                            item.title ||
                            t.gallery.templeGalleryImage
                          }
                          className="gallery-real-media"
                          loading="lazy"
                        />

                      ) : (

                        <div className="gallery-placeholder">

                          <Images size={30} />

                          <span>
                            {t.gallery.photo}
                          </span>

                        </div>

                      )}


                      <div className="gallery-overlay">

                        <span>
                          {item.category ||
                            t.gallery.defaultCategory}
                        </span>

                        <strong>
                          {item.title ||
                            t.gallery.defaultTitle}
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

              }
            )

          )}

        </div>

      </div>

    </section>
  );

}

export default GallerySection;