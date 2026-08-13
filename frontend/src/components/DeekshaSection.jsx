import { useEffect, useState } from "react";

import { useLanguage } from "../context/LanguageContext";

import {
  UserRound,
  Camera,
  Phone,
  CalendarDays,
  ShieldCheck,
  UsersRound,
  ArrowRight,
} from "lucide-react";

function DeekshaSection() {

  const { t } = useLanguage();


  const [village, setVillage] = useState("");

  const [photoName, setPhotoName] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");

  const [registeredCount, setRegisteredCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [countLoading, setCountLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================
  // Fetch registered devotees count
  // =========================================

  const fetchDeekshaCount = async () => {
    try {
      setCountLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/deeksha/count"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Deeksha count");
      }

      const data = await response.json();

      setRegisteredCount(data.count || 0);

    } catch (err) {
      console.error("Deeksha count error:", err);

    } finally {
      setCountLoading(false);
    }
  };


  // =========================================
  // Load count when component loads
  // =========================================

  useEffect(() => {
    fetchDeekshaCount();
  }, []);


  // =========================================
  // Select profile photo
  // =========================================

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setPhotoName(file.name);
    setPhotoFile(file);

    setError("");
    setMessage("");
  };


  // =========================================
  // Register devotee
  // =========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("startDate", startDate);
      formData.append("village", village);

      if (photoFile) {
        formData.append("file", photoFile);
      }

      const response = await fetch(
        "http://localhost:8080/api/deeksha/register",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => null);

        throw new Error(
          errorData?.error || t.deeksha.messages.registrationFailed
        );
      }

      const data = await response.json();

      console.log(
        "Deeksha registration saved:",
        data
      );

      setMessage(
        t.deeksha.messages.success
      );

      // Clear form
      setFullName("");
      setPhone("");
      setStartDate("");
      setPhotoName("");
      setPhotoFile(null);
      setVillage("");

      // Refresh registered count
      await fetchDeekshaCount();

    } catch (err) {
      console.error(
        "Deeksha registration error:",
        err
      );

      setError(
        err.message ||
        t.deeksha.messages.registrationError
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <section id="deeksha">

      <div className="deeksha-container">

        {/* Heading */}

        <div className="section-heading deeksha-heading">

          <div className="section-eyebrow">
            <UsersRound size={15} />
            {t.deeksha.eyebrow}
          </div>

          <h2>
            {t.deeksha.headingBefore}
            <span> {t.deeksha.headingHighlight}</span>
          </h2>

          <p>
            {t.deeksha.description}
          </p>

        </div>


        {/* Main layout */}

        <div className="deeksha-layout">

          {/* Registration Form */}

          <form
            className="deeksha-form-card"
            onSubmit={handleSubmit}
          >

            <div className="deeksha-card-heading">

              <div>
                <span>{t.deeksha.formTitle}</span>

                <h3>
                  {t.deeksha.formSubtitle}
                </h3>
              </div>

              <div className="deeksha-card-icon">
                <UserRound size={20} />
              </div>

            </div>


            {/* Photo */}

            <div className="deeksha-photo-field">

              <div className="deeksha-photo-preview">

                {photoName ? (
                  <Camera size={25} />
                ) : (
                  <UserRound size={30} />
                )}

              </div>

              <div className="deeksha-photo-info">

                <strong>
                  {t.deeksha.profilePhoto}
                </strong>

                <span>
                  {t.deeksha.photoHint}
                </span>

                <label className="deeksha-upload-button">

                  <Camera size={14} />

                  {photoName
                    ? t.deeksha.changePhoto
                    : t.deeksha.uploadPhoto}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    disabled={loading}
                  />

                </label>

                {photoName && (
                  <small>
                    {photoName}
                  </small>
                )}

              </div>

            </div>


            {/* Name */}

            <label className="deeksha-field">

              <span>
                {t.deeksha.devoteeName}
              </span>

              <div className="deeksha-input">

                <UserRound size={16} />

                <input
                  type="text"
                  name="name"
                  placeholder={t.deeksha.namePlaceholder}
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  required
                />

              </div>

            </label>


            {/* Phone */}

            <label className="deeksha-field">

              <span>
                {t.deeksha.phoneNumber}
              </span>

              <div className="deeksha-input">

                <Phone size={16} />

                <input
                  type="tel"
                  name="phone"
                  placeholder={t.deeksha.phonePlaceholder}
                  inputMode="numeric"
                  maxLength="10"
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  required
                />

              </div>

            </label>

            <label className="deeksha-field">

  <span>
    {t.deeksha.village}
  </span>

  <div className="deeksha-input">

    <UsersRound size={16} />

    <input
      type="text"
      name="village"
      placeholder={t.deeksha.villagePlaceholder}
      value={village}
      onChange={(event) =>
        setVillage(event.target.value)
      }
      required
    />

  </div>

</label>


            {/* Date */}

            <label className="deeksha-field">

              <span>
                {t.deeksha.dateLabel}
              </span>

              <div className="deeksha-input">

                <CalendarDays size={16} />

                <input
                  type="date"
                  name="deekshaDate"
                  value={startDate}
                  onChange={(event) =>
                    setStartDate(event.target.value)
                  }
                  required
                />

              </div>

            </label>


            {/* Consent */}

            <label className="deeksha-consent">

              <input
                type="checkbox"
                required
              />

              <span>
                {t.deeksha.consent}
              </span>

            </label>


            {/* Submit */}

            <button
              type="submit"
              className="btn btn-primary deeksha-submit"
              disabled={loading}
            >

              {loading
                ? t.deeksha.registering
                : t.deeksha.registerButton}

              {!loading && (
                <ArrowRight size={16} />
              )}

            </button>


            {/* Success */}

            {message && (
              <div className="deeksha-success-message">
                {message}
              </div>
            )}


            {/* Error */}

            {error && (
              <div className="deeksha-error-message">
                {error}
              </div>
            )}


            <div className="deeksha-security">

              <ShieldCheck size={14} />

              <span>
                {t.deeksha.security}
              </span>

            </div>

          </form>


          {/* Information Card */}

          <div className="deeksha-info-card">

            <div className="deeksha-info-top">

              <span>
                {t.deeksha.infoFestival}
              </span>

              <h3>
                {t.deeksha.infoHeadingBefore}
                <br />
                {t.deeksha.infoHeadingAfter}
              </h3>

            </div>


            {/* Registered Count */}

            <div className="deeksha-counter">

              <UsersRound size={20} />

              <div>

                <span>
                  {t.deeksha.registeredDevotees}
                </span>

                <strong>
                  {countLoading
                    ? "..."
                    : registeredCount}
                </strong>

                <small>
                  {t.deeksha.countNote}
                </small>

              </div>

            </div>


            <div className="deeksha-points">

              <div>

                <span>
                  01
                </span>

                <p>
                  {t.deeksha.points.one}
                </p>

              </div>


              <div>

                <span>
                  02
                </span>

                <p>
                  {t.deeksha.points.two}
                </p>

              </div>


              <div>

                <span>
                  03
                </span>

                <p>
                  {t.deeksha.points.three}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DeekshaSection;