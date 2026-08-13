import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";

import {
  ShieldCheck,
  LockKeyhole,
  UserRound,
  ArrowRight,
} from "lucide-react";

function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {

        throw new Error(
          data.message ||
          "Invalid username or password."
        );
      }

      navigate("/admin");

    } catch (error) {

      console.error(
        "Admin login failed:",
        error
      );

      setError(
        error.message ||
        "Unable to login. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <main className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-brand">

          <div className="admin-login-logo">
            ॐ
          </div>

          <div>
            <strong>
              Kanaka Durgamma
            </strong>

            <span>
              Temple Administration
            </span>
          </div>

        </div>


        <div className="admin-login-heading">

          <div className="admin-login-icon">
            <ShieldCheck size={22} />
          </div>

          <span>
            Administrator Access
          </span>

          <h1>
            Welcome Back
          </h1>

          <p>
            Sign in to manage temple information,
            Dasara updates, registrations and more.
          </p>

        </div>


        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >

          <label>

            <span>
              Username
            </span>

            <div className="admin-input">

              <UserRound size={16} />

              <input
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError("");
                }}
                autoComplete="username"
                required
                disabled={loading}
              />

            </div>

          </label>


          <label>

            <span>
              Password
            </span>

            <div className="admin-input">

              <LockKeyhole size={16} />

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                autoComplete="current-password"
                required
                disabled={loading}
              />

            </div>

          </label>


          {error && (
            <div
              className="admin-login-error"
              role="alert"
            >
              {error}
            </div>
          )}


          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >

            {loading
              ? "Signing In..."
              : "Sign In"}

            {!loading && (
              <ArrowRight size={16} />
            )}

          </button>

        </form>


        <div className="admin-login-security">

          <ShieldCheck size={13} />

          <span>
            Authorized temple administrators only
          </span>

        </div>

      </div>


      <div className="admin-login-footer">
        © 2026 Kanaka Durgamma Temple
      </div>

    </main>
  );
}

export default AdminLogin;