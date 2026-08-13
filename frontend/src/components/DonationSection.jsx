import {
  Heart,
  ShieldCheck,
  Landmark,
  Sparkles,
  UsersRound,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

import { useLanguage } from "../context/LanguageContext";

function DonationSection() {
  const { t } = useLanguage();

  const [donorName, setDonorName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [amount, setAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const presetAmounts = [500, 1000, 2500, 5000];

  const handlePresetAmount = (value) => {
    setAmount(value);
    setCustomAmount("");
    setMessage("");
  };

  const handleCustomAmount = (event) => {
    const value = event.target.value;
    setCustomAmount(value);
    setMessage("");
    setAmount(value ? Number(value) : 0);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDonate = async (event) => {
    event.preventDefault();

    if (!donorName.trim()) {
      setMessage(t.donation.messages.nameRequired);
      return;
    }

    if (!phone.trim()) {
      setMessage(t.donation.messages.phoneRequired);
      return;
    }

    if (!amount || amount <= 0) {
      setMessage(t.donation.messages.amountInvalid);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const razorpayLoaded = await loadRazorpayScript();

      if (!razorpayLoaded) {
        throw new Error(t.donation.messages.razorpayLoadFailed);
      }

      const response = await fetch(
        `${API_BASE_URL}/donations/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            donorName: donorName.trim(),
            phone: phone.trim(),
            email: email.trim(),
            amount: amount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(t.donation.messages.orderFailed);
      }

      const data = await response.json();

      const razorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount * 100,
        currency: data.currency || "INR",
        name: "Kanaka Durga Amma Temple",
        description: "Temple Donation",
        order_id: data.orderId,

        prefill: {
          name: donorName.trim(),
          contact: phone.trim(),
          email: email.trim(),
        },

        theme: {
          color: "#8B1E1E",
        },

        handler: async function (paymentResponse) {
  try {
    const verifyResponse = await fetch(
      `${API_BASE_URL}/donations/verify-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donationId: data.donationId,

          razorpayPaymentId:
            paymentResponse.razorpay_payment_id,

          razorpayOrderId:
            paymentResponse.razorpay_order_id,

          razorpaySignature:
            paymentResponse.razorpay_signature,
        }),
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyResponse.ok || !verifyData.success) {
      throw new Error(
        verifyData.error || t.donation.messages.verificationFailed
      );
    }

    console.log(
      "Payment verified successfully:",
      verifyData
    );

    setMessage(
      t.donation.messages.paymentVerified
    );

  } catch (error) {
    console.error(
      "Payment verification failed:",
      error
    );

    setMessage(
      t.donation.messages.verificationFailed
    );

  } finally {
    setLoading(false);
  }
},

        modal: {
          ondismiss: function () {
            setMessage(t.donation.messages.paymentClosed);
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);

      razorpay.on("payment.failed", function (response) {
        console.error("Razorpay payment failed:", response.error);
        setMessage(t.donation.messages.paymentFailed);
        setLoading(false);
      });

      razorpay.open();
      setLoading(false);

    } catch (error) {
      console.error("Donation request failed:", error);
      setMessage(t.donation.messages.donationFailed);
      setLoading(false);
    }
  };

  return (
    <section className="donation-section" id="donate">
      <div className="donation-container">

        <div className="section-heading donation-heading">
          <div className="section-eyebrow">
            <Heart size={15} />
            {t.donation.eyebrow}
          </div>

          <h2>
            {t.donation.headingBefore}
            <span> {t.donation.headingHighlight}</span>
          </h2>

          <p>
            {t.donation.description}
          </p>
        </div>

        <div className="donation-layout">

          <form className="donation-card" onSubmit={handleDonate}>

            <div className="donation-card-heading">
              <div>
                <span>{t.donation.formTitle}</span>
                <h3>{t.donation.formSubtitle}</h3>
              </div>

              <div className="donation-heart-icon">
                <Heart size={20} />
              </div>
            </div>

            <div className="donation-donor-details">

              <label>
                {t.donation.name}
                <input
                  type="text"
                  placeholder={t.donation.namePlaceholder}
                  value={donorName}
                  onChange={(event) => {
                    setDonorName(event.target.value);
                    setMessage("");
                  }}
                  required
                />
              </label>

              <label>
                {t.donation.phone}
                <input
                  type="tel"
                  placeholder={t.donation.phonePlaceholder}
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setMessage("");
                  }}
                  required
                />
              </label>

              <label>
                {t.donation.email} <span>({t.donation.optional})</span>
                <input
                  type="email"
                  placeholder={t.donation.emailPlaceholder}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setMessage("");
                  }}
                />
              </label>

            </div>

            <div className="donation-amounts">
              {presetAmounts.map((value) => (
                <button
                  type="button"
                  key={value}
                  className={`donation-amount ${
                    amount === value && !customAmount ? "active" : ""
                  }`}
                  onClick={() => handlePresetAmount(value)}
                >
                  ₹{value.toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            <label className="donation-custom-label">
              {t.donation.customAmount}

              <div className="donation-input-wrapper">
                <span>₹</span>

                <input
                  type="number"
                  min="1"
                  placeholder={t.donation.amountPlaceholder}
                  value={customAmount}
                  onChange={handleCustomAmount}
                />
              </div>
            </label>

            <div className="donation-selected">
              <span>{t.donation.donationAmount}</span>
              <strong>
                ₹{(amount || 0).toLocaleString("en-IN")}
              </strong>
            </div>

            <button
              type="submit"
              className="btn btn-primary donation-button"
              disabled={loading}
            >
              {loading ? t.donation.processing : t.donation.continueDonate}
              <ArrowRight size={16} />
            </button>

            <div className="donation-security">
              <ShieldCheck size={14} />
              <span>Secure payment process</span>
            </div>

            {message && (
              <p className="donation-message">
                {message}
              </p>
            )}

          </form>

          <div className="donation-info">

            <div className="donation-info-heading">
              <span>{t.donation.supportHeading}</span>

              <h3>
                {t.donation.differenceBefore}
                <br />
                {t.donation.differenceAfter}
              </h3>
            </div>

            <div className="donation-benefits">

              <div className="donation-benefit">
                <div className="donation-benefit-icon">
                  <Landmark size={18} />
                </div>

                <div>
                  <strong>{t.donation.benefits.maintenance.title}</strong>
                  <span>
                    {t.donation.benefits.maintenance.description}
                  </span>
                </div>
              </div>

              <div className="donation-benefit">
                <div className="donation-benefit-icon">
                  <Sparkles size={18} />
                </div>

                <div>
                  <strong>{t.donation.benefits.dasara.title}</strong>
                  <span>
                    {t.donation.benefits.dasara.description}
                  </span>
                </div>
              </div>

              <div className="donation-benefit">
                <div className="donation-benefit-icon">
                  <UsersRound size={18} />
                </div>

                <div>
                  <strong>{t.donation.benefits.community.title}</strong>
                  <span>
                    {t.donation.benefits.community.description}
                  </span>
                </div>
              </div>

            </div>

            <div className="donation-note">
              <Heart size={15} />

              <p>
                {t.donation.note}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default DonationSection;