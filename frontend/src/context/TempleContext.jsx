import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const TempleContext = createContext(null);

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

export function TempleProvider({ children }) {
  const [templeInfo, setTempleInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTempleSettings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/temple/settings`
      );

      if (response.status === 204) {
        setTempleInfo(null);
        return;
      }

      if (!response.ok) {
        throw new Error(
          "Failed to fetch temple settings"
        );
      }

      const data = await response.json();

      console.log(
        "Temple settings from MySQL:",
        data
      );

      setTempleInfo(data);
    } catch (err) {
      console.error(
        "Temple settings fetch failed:",
        err
      );

      setError(
        "Unable to load temple information."
      );

      setTempleInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTempleSettings();
  }, []);

  return (
    <TempleContext.Provider
      value={{
        templeInfo,
        loading,
        error,
        refreshTempleInfo: fetchTempleSettings,
      }}
    >
      {children}
    </TempleContext.Provider>
  );
}

export function useTemple() {
  const context = useContext(TempleContext);

  if (!context) {
    throw new Error(
      "useTemple must be used inside TempleProvider"
    );
  }

  return context;
}

export default TempleContext;